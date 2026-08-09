import { db, FieldValue, Timestamp } from "./core";

export type SecuritySeverity = "info" | "low" | "medium" | "high" | "critical";

interface AuditEvent {
  actorId: string;
  actorRole?: string;
  action: string;
  resourceType: string;
  resourceId?: string;
  result: "success" | "denied" | "failure";
  details?: Record<string, unknown>;
}

interface SecurityEvent {
  type: string;
  severity: SecuritySeverity;
  source: "web" | "function" | "cloudflare" | "payment" | "honeypot" | "scheduler";
  sourceIp?: string;
  userId?: string;
  route?: string;
  details?: Record<string, unknown>;
}

export async function writeAuditEvent(event: AuditEvent): Promise<string> {
  const reference = db.collection("auditLogs").doc();
  await reference.set({ ...event, createdAt: FieldValue.serverTimestamp() });
  return reference.id;
}

export async function writeSecurityEvent(event: SecurityEvent): Promise<string> {
  const reference = db.collection("securityEvents").doc();
  const expiresAtMs = Date.now() + 30 * 24 * 60 * 60 * 1000;
  await reference.set({
    ...event,
    createdAt: FieldValue.serverTimestamp(),
    expiresAt: Timestamp.fromMillis(expiresAtMs),
  });
  return reference.id;
}

export async function incrementMetric(metric: string, amount = 1): Promise<void> {
  const day = new Date().toISOString().slice(0, 10);
  await db.collection("usageMetrics").doc(day).set(
    {
      day,
      [metric]: FieldValue.increment(amount),
      updatedAt: FieldValue.serverTimestamp(),
    },
    { merge: true },
  );
}
