import { GoogleAuth } from "google-auth-library";
import { onCall } from "firebase-functions/v2/https";
import { onRequest } from "firebase-functions/v2/https";
import { onSchedule } from "firebase-functions/v2/scheduler";
import { requireOperationsAccess } from "./auth";
import { incrementMetric, writeSecurityEvent } from "./audit";
import { db, DEFAULT_TIME_ZONE, errorMessage, EXTERNAL_REQUEST_TIMEOUT_MS, FieldValue, logger, REGION, Timestamp } from "./core";
import { emitAlert } from "./notifications";
import {
  alertEmail,
  backupBucket,
  cloudflareApiToken,
  cloudflareZoneId,
  deploymentWebhookSecret,
  publicSiteUrl,
  socIngestSecret,
  smtpPassword,
  telegramBotToken,
  telegramChatId,
} from "./params";
import { clientSecurityEventSchema } from "./schemas";
import { clientIp, enforceRateLimit, sanitizeUserAgent, stableHash, verifyHmacHex } from "./security";
import { releaseInventoryReservation } from "./payments";

const ONE_DAY_MS = 24 * 60 * 60_000;

export const health = onRequest({ region: REGION, cors: false, timeoutSeconds: 10 }, async (request, response) => {
  if (request.method !== "GET") {
    response.status(405).json({ status: "error" });
    return;
  }
  try {
    await db.collection("systemHealth").doc("current").get();
    response.set("Cache-Control", "no-store").status(200).json({ status: "ok", service: "grand-womens-backend", timestamp: new Date().toISOString() });
  } catch (error) {
    logger.error("Health check failed", { error: errorMessage(error) });
    response.status(503).json({ status: "unavailable" });
  }
});

export const recordClientSecurityEvent = onCall(
  { region: REGION, enforceAppCheck: true, consumeAppCheckToken: true },
  async (request) => {
    const sourceIp = clientIp(request.rawRequest);
    const userId = request.auth?.uid;
    await enforceRateLimit({ scope: "client-security-event", subject: userId ?? stableHash(sourceIp), limit: 15, windowMs: 15 * 60_000 });
    const input = clientSecurityEventSchema.parse(request.data);
    await writeSecurityEvent({
      type: input.type,
      severity: input.type === "failed-login" ? "medium" : "low",
      source: "web",
      sourceIp,
      userId,
      route: input.route,
      details: { accountHash: input.accountHash, details: input.details, userAgent: sanitizeUserAgent(request.rawRequest.get("user-agent")) },
    });
    await incrementMetric(input.type === "failed-login" ? "failedLogins" : "clientSecurityEvents");

    if (input.type === "failed-login") {
      const since = Timestamp.fromMillis(Date.now() - 15 * 60_000);
      const burst = await db.collection("securityEvents").where("type", "==", "failed-login").where("sourceIp", "==", sourceIp).where("createdAt", ">=", since).limit(6).get();
      if (burst.size >= 5) {
        await emitAlert({ type: "failed-login-burst", severity: "critical", title: "Failed login burst", message: `At least ${burst.size} failed login events were observed from ${sourceIp}.`, telegram: true, email: true });
      }
    }
    return { recorded: true };
  },
);

export const socIngest = onRequest(
  { region: REGION, cors: false, secrets: [socIngestSecret, telegramBotToken, telegramChatId, smtpPassword] },
  async (request, response) => {
    if (request.method !== "POST") {
      response.status(405).send("Method not allowed");
      return;
    }
    const rawBody = (request as typeof request & { rawBody?: Buffer }).rawBody;
    const signature = request.get("x-grand-signature") ?? "";
    if (!rawBody || !verifyHmacHex(rawBody, signature, socIngestSecret.value())) {
      response.status(401).send("Invalid signature");
      return;
    }
    const payload = request.body as { sourceIp?: unknown; route?: unknown; method?: unknown; userAgent?: unknown; eventId?: unknown };
    const sourceIp = typeof payload.sourceIp === "string" ? payload.sourceIp.slice(0, 64) : "unknown";
    await enforceRateLimit({ scope: "soc-ingest", subject: stableHash(sourceIp), limit: 50, windowMs: 60 * 60_000 });
    const route = typeof payload.route === "string" ? payload.route.slice(0, 300) : "/";
    const method = typeof payload.method === "string" ? payload.method.slice(0, 12) : "UNKNOWN";
    const userAgent = sanitizeUserAgent(typeof payload.userAgent === "string" ? payload.userAgent : undefined);
    const eventId = await writeSecurityEvent({ type: "honeypot-activity", severity: "high", source: "honeypot", sourceIp, route, details: { method, userAgent, isolatedEventId: payload.eventId } });
    await Promise.all([
      incrementMetric("honeypotEvents"),
      emitAlert({ type: "honeypot", severity: "critical", title: "Honeypot activity", message: `Trap ${eventId} was triggered from ${sourceIp} using ${method} ${route}.`, telegram: true, email: true }),
    ]);
    response.status(202).send("Accepted");
  },
);

export const deploymentWebhook = onRequest(
  { region: REGION, cors: false, secrets: [deploymentWebhookSecret, smtpPassword, telegramBotToken, telegramChatId] },
  async (request, response) => {
    if (request.method !== "POST") {
      response.status(405).send("Method not allowed");
      return;
    }
    const rawBody = (request as typeof request & { rawBody?: Buffer }).rawBody;
    const signature = request.get("x-grand-signature") ?? "";
    if (!rawBody || !verifyHmacHex(rawBody, signature, deploymentWebhookSecret.value())) {
      response.status(401).send("Invalid signature");
      return;
    }
    const body = request.body as { status?: unknown; commit?: unknown; environment?: unknown };
    const status = body.status === "success" ? "success" : "failure";
    const commit = typeof body.commit === "string" ? body.commit.slice(0, 40) : "unknown";
    const environment = typeof body.environment === "string" ? body.environment.slice(0, 40) : "unknown";
    await emitAlert({
      type: "deployment-status",
      severity: status === "success" ? "info" : "critical",
      title: `Deployment ${status}`,
      message: `Environment: ${environment}\nCommit: ${commit}`,
      email: true,
      telegram: status !== "success",
    });
    response.status(202).send("Accepted");
  },
);

export const getSocDashboard = onCall(
  { region: REGION, enforceAppCheck: true },
  async (request) => {
    requireOperationsAccess(request);
    await enforceRateLimit({ scope: "soc-dashboard", subject: request.auth!.uid, limit: 120, windowMs: 60 * 60_000 });
    const since = Timestamp.fromMillis(Date.now() - ONE_DAY_MS);
    const [events, alerts, payments, healthDocument, backupDocument, usageDocument] = await Promise.all([
      db.collection("securityEvents").where("createdAt", ">=", since).orderBy("createdAt", "desc").limit(100).get(),
      db.collection("alerts").orderBy("createdAt", "desc").limit(50).get(),
      db.collection("paymentLogs").orderBy("createdAt", "desc").limit(50).get(),
      db.collection("systemHealth").doc("current").get(),
      db.collection("backupJobs").doc("latest").get(),
      db.collection("usageMetrics").doc(new Date().toISOString().slice(0, 10)).get(),
    ]);
    const eventRows = events.docs.map((document) => ({
      id: document.id,
      ...(document.data() as {
        type?: string;
        source?: string;
        details?: Record<string, unknown>;
        [key: string]: unknown;
      }),
    }));
    const count = (type: string) => eventRows.filter((event) => event.type === type).length;
    return {
      generatedAt: new Date().toISOString(),
      summary: {
        securityEvents24h: eventRows.length,
        failedLogins24h: count("failed-login"),
        honeypotEvents24h: count("honeypot-activity"),
        cloudflareBlocks24h: eventRows.filter((event) => event.source === "cloudflare" && event.details?.action !== "log").length,
      },
      events: eventRows,
      alerts: alerts.docs.map((document) => ({ id: document.id, ...document.data() })),
      paymentLogs: payments.docs.map((document) => ({ id: document.id, ...document.data() })),
      health: healthDocument.data() ?? { status: "unknown" },
      backup: backupDocument.data() ?? { status: "not-configured" },
      usage: usageDocument.data() ?? {},
    };
  },
);

export const getOperationsDashboard = onCall(
  { region: REGION, enforceAppCheck: true },
  async (request) => {
    requireOperationsAccess(request);
    await enforceRateLimit({ scope: "operations-dashboard", subject: request.auth!.uid, limit: 120, windowMs: 60 * 60_000 });
    const [products, orders, customers, metrics] = await Promise.all([
      db.collection("products").count().get(),
      db.collection("orders").count().get(),
      db.collection("users").count().get(),
      db.collection("usageMetrics").orderBy("day", "desc").limit(30).get(),
    ]);
    const totals = metrics.docs.reduce<Record<string, number>>((result, document) => {
      for (const [key, value] of Object.entries(document.data())) {
        if (typeof value === "number") result[key] = (result[key] ?? 0) + value;
      }
      return result;
    }, {});
    const estimatedCostUsd = Number((((totals.functionInvocations ?? 0) / 2_000_000) * 0.4 + ((totals.firestoreReads ?? 0) / 100_000) * 0.06 + ((totals.firestoreWrites ?? 0) / 100_000) * 0.18).toFixed(2));
    return {
      products: products.data().count,
      orders: orders.data().count,
      customers: customers.data().count,
      usage30d: totals,
      estimatedCostUsd,
      estimateNotice: "Approximation only. Use Google Cloud Billing budgets for authoritative spend.",
    };
  },
);

export const monitorWebsite = onSchedule(
  { schedule: "every 5 minutes", region: REGION, timeZone: DEFAULT_TIME_ZONE, secrets: [telegramBotToken, telegramChatId, smtpPassword] },
  async () => {
    const startedAt = Date.now();
    let status = "up";
    let statusCode = 0;
    try {
      const response = await fetch(new URL("/api/health", publicSiteUrl.value()), { signal: AbortSignal.timeout(10_000), headers: { "User-Agent": "Grand-Womens-Uptime-Monitor/1.0" } });
      statusCode = response.status;
      if (!response.ok) status = "down";
    } catch (error) {
      status = "down";
      logger.error("Website monitor failed", { error: errorMessage(error) });
    }
    await db.collection("systemHealth").doc("current").set({ status, statusCode, responseTimeMs: Date.now() - startedAt, checkedAt: FieldValue.serverTimestamp() }, { merge: true });
    if (status === "down") await emitAlert({ type: "website-down", severity: "critical", title: "Website downtime detected", message: `Health check returned ${statusCode || "a network failure"}.`, telegram: true, email: true });
  },
);

export const monitorResourceUsage = onSchedule(
  { schedule: "every 60 minutes", region: REGION, timeZone: DEFAULT_TIME_ZONE, secrets: [telegramBotToken, telegramChatId, smtpPassword] },
  async () => {
    const day = new Date().toISOString().slice(0, 10);
    const [usageSnapshot, thresholdSnapshot] = await Promise.all([
      db.collection("usageMetrics").doc(day).get(),
      db.collection("settings").doc("resourceThresholds").get(),
    ]);
    const usage = usageSnapshot.data() ?? {};
    const configured = thresholdSnapshot.data() ?? {};
    const thresholds: Record<string, number> = {
      aiAssistantRequests: Number(configured.aiAssistantRequests ?? 5_000),
      visualSearchRequests: Number(configured.visualSearchRequests ?? 1_000),
      checkoutCreated: Number(configured.checkoutCreated ?? 1_000),
      clientSecurityEvents: Number(configured.clientSecurityEvents ?? 5_000),
    };
    const exceeded = Object.entries(thresholds).filter(([metric, threshold]) => Number(usage[metric] ?? 0) >= threshold);
    await db.collection("systemHealth").doc("current").set({ databaseStatus: "ok", databaseCheckedAt: FieldValue.serverTimestamp() }, { merge: true });
    if (!exceeded.length) return;

    const alertKey = `${day}_${new Date().getUTCHours()}`;
    const deduplicationReference = db.collection("resourceAlerts").doc(alertKey);
    if ((await deduplicationReference.get()).exists) return;
    await deduplicationReference.create({ exceeded: Object.fromEntries(exceeded), createdAt: FieldValue.serverTimestamp() });
    await emitAlert({
      type: "high-resource-usage",
      severity: "critical",
      title: "High Firebase resource usage",
      message: exceeded.map(([metric, threshold]) => `${metric}: ${usage[metric]} (threshold ${threshold})`).join("\n"),
      telegram: true,
      email: true,
    });
  },
);

export const syncCloudflareSecurityEvents = onSchedule(
  { schedule: "every 10 minutes", region: REGION, timeZone: DEFAULT_TIME_ZONE, secrets: [cloudflareApiToken, cloudflareZoneId, telegramBotToken, telegramChatId, smtpPassword] },
  async () => {
    const token = cloudflareApiToken.value();
    const zoneId = cloudflareZoneId.value();
    if (!token || !zoneId) return;
    const since = new Date(Date.now() - 11 * 60_000).toISOString();
    const query = `query SecurityEvents($zoneTag: string, $filter: FirewallEventsAdaptiveFilter_InputObject) { viewer { zones(filter: { zoneTag: $zoneTag }) { firewallEventsAdaptive(filter: $filter, limit: 200, orderBy: [datetime_DESC]) { action clientCountryName clientIP clientRequestHTTPHost clientRequestPath datetime rayName ruleId source } } } }`;
    const response = await fetch("https://api.cloudflare.com/client/v4/graphql", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables: { zoneTag: zoneId, filter: { datetime_geq: since } } }),
      signal: AbortSignal.timeout(EXTERNAL_REQUEST_TIMEOUT_MS),
    });
    if (!response.ok) throw new Error(`Cloudflare GraphQL returned ${response.status}`);
    const payload = (await response.json()) as { data?: { viewer?: { zones?: Array<{ firewallEventsAdaptive?: Array<Record<string, unknown>> }> } }; errors?: unknown[] };
    if (payload.errors?.length) throw new Error("Cloudflare GraphQL returned errors");
    const events = payload.data?.viewer?.zones?.[0]?.firewallEventsAdaptive ?? [];
    const batch = db.batch();
    events.forEach((event) => {
      const id = typeof event.rayName === "string" ? event.rayName : stableHash(JSON.stringify(event));
      batch.set(db.collection("securityEvents").doc(`cf_${id}`), {
        type: "cloudflare-waf-event",
        severity: event.action === "block" ? "high" : "medium",
        source: "cloudflare",
        sourceIp: event.clientIP,
        route: event.clientRequestPath,
        details: event,
        createdAt: event.datetime ? Timestamp.fromDate(new Date(String(event.datetime))) : FieldValue.serverTimestamp(),
        expiresAt: Timestamp.fromMillis(Date.now() + 30 * ONE_DAY_MS),
      }, { merge: true });
    });
    if (events.length) await batch.commit();
    if (events.filter((event) => event.action === "block").length >= 25) {
      await emitAlert({ type: "cloudflare-block-burst", severity: "critical", title: "Cloudflare block burst", message: `${events.length} WAF events were observed in the last ten minutes.`, telegram: true, email: true });
    }
  },
);

export const dailyFirestoreBackup = onSchedule(
  { schedule: "every day 02:00", region: REGION, timeZone: DEFAULT_TIME_ZONE, secrets: [telegramBotToken, telegramChatId, smtpPassword], timeoutSeconds: 540 },
  async () => {
    const targetBucket = backupBucket.value();
    const projectId = process.env.GCLOUD_PROJECT;
    if (!targetBucket || !projectId) {
      await db.collection("backupJobs").doc("latest").set({ status: "not-configured", checkedAt: FieldValue.serverTimestamp() });
      return;
    }
    const outputUriPrefix = `gs://${targetBucket}/firestore/${new Date().toISOString().slice(0, 10)}`;
    const backupReference = db.collection("backupJobs").doc("latest");
    try {
      const googleAuth = new GoogleAuth({ scopes: ["https://www.googleapis.com/auth/datastore"] });
      const client = await googleAuth.getClient();
      const accessToken = await client.getAccessToken();
      const response = await fetch(`https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default):exportDocuments`, {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken.token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ outputUriPrefix }),
        signal: AbortSignal.timeout(60_000),
      });
      if (!response.ok) throw new Error(`Firestore export returned ${response.status}`);
      const operation = (await response.json()) as { name?: string };
      await backupReference.set({ status: "started", outputUriPrefix, operationName: operation.name ?? null, startedAt: FieldValue.serverTimestamp() });
      await emitAlert({ type: "backup-started", severity: "info", title: "Daily backup started", message: `Firestore export started at ${outputUriPrefix}.`, email: true });
    } catch (error) {
      await backupReference.set({ status: "failed", error: errorMessage(error).slice(0, 300), failedAt: FieldValue.serverTimestamp() });
      await emitAlert({ type: "backup-failed", severity: "critical", title: "Backup failed", message: errorMessage(error), telegram: true, email: true });
      throw error;
    }
  },
);

export const verifyLatestBackup = onSchedule(
  { schedule: "every day 04:00", region: REGION, timeZone: DEFAULT_TIME_ZONE, secrets: [telegramBotToken, telegramChatId, smtpPassword], timeoutSeconds: 120 },
  async () => {
    const reference = db.collection("backupJobs").doc("latest");
    const snapshot = await reference.get();
    const operationName = snapshot.get("operationName") as string | undefined;
    if (!operationName || !["started", "running"].includes(snapshot.get("status"))) return;
    try {
      const googleAuth = new GoogleAuth({ scopes: ["https://www.googleapis.com/auth/datastore"] });
      const client = await googleAuth.getClient();
      const accessToken = await client.getAccessToken();
      const response = await fetch(`https://firestore.googleapis.com/v1/${operationName}`, {
        headers: { Authorization: `Bearer ${accessToken.token}` },
        signal: AbortSignal.timeout(60_000),
      });
      if (!response.ok) throw new Error(`Firestore operation check returned ${response.status}`);
      const operation = (await response.json()) as { done?: boolean; error?: { message?: string }; response?: unknown };
      if (!operation.done) {
        await reference.set({ status: "running", checkedAt: FieldValue.serverTimestamp() }, { merge: true });
        return;
      }
      if (operation.error) throw new Error(operation.error.message ?? "Firestore export operation failed");
      await reference.set({ status: "succeeded", completedAt: FieldValue.serverTimestamp() }, { merge: true });
      await emitAlert({ type: "backup-succeeded", severity: "info", title: "Backup confirmed", message: `Firestore export ${operationName} completed successfully.`, email: true });
    } catch (error) {
      await reference.set({ status: "failed", error: errorMessage(error).slice(0, 300), failedAt: FieldValue.serverTimestamp() }, { merge: true });
      await emitAlert({ type: "backup-failed", severity: "critical", title: "Backup verification failed", message: errorMessage(error), telegram: true, email: true });
    }
  },
);

export const dailyHealthReport = onSchedule(
  { schedule: "every day 08:00", region: REGION, timeZone: DEFAULT_TIME_ZONE, secrets: [smtpPassword] },
  async () => {
    if (!alertEmail.value()) return;
    const since = Timestamp.fromMillis(Date.now() - ONE_DAY_MS);
    const [securityEvents, orders, health, backup] = await Promise.all([
      db.collection("securityEvents").where("createdAt", ">=", since).count().get(),
      db.collection("orders").where("createdAt", ">=", since).count().get(),
      db.collection("systemHealth").doc("current").get(),
      db.collection("backupJobs").doc("latest").get(),
    ]);
    await emitAlert({
      type: "daily-health-report",
      severity: "info",
      title: "Daily health report",
      message: `Website: ${health.get("status") ?? "unknown"}\nOrders: ${orders.data().count}\nSecurity events: ${securityEvents.data().count}\nBackup: ${backup.get("status") ?? "unknown"}`,
      email: true,
    });
  },
);

export const expireStaleData = onSchedule(
  { schedule: "every 30 minutes", region: REGION, timeZone: DEFAULT_TIME_ZONE },
  async () => {
    const now = Timestamp.now();
    const staleOrders = await db.collection("orders").where("status", "==", "payment_pending").where("expiresAt", "<=", now).limit(100).get();
    for (const document of staleOrders.docs) {
      await releaseInventoryReservation(document.id, "payment_expired");
    }
  },
);
