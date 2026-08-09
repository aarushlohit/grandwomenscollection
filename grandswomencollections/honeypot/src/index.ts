import crypto from "node:crypto";
import { defineSecret, defineString } from "firebase-functions/params";
import { onRequest } from "firebase-functions/v2/https";

const socIngestSecret = defineSecret("SOC_INGEST_SECRET");
const socIngestUrl = defineString("SOC_INGEST_URL", {
  default: "http://127.0.0.1:5001/demo-grand-womens/asia-south1/socIngest",
});
const MAX_FORWARD_TIMEOUT_MS = 8_000;

function sourceIp(headers: Record<string, string | string[] | undefined>, fallback: string): string {
  const cloudflareIp = headers["cf-connecting-ip"];
  if (typeof cloudflareIp === "string") return cloudflareIp.slice(0, 64);
  const forwarded = headers["x-forwarded-for"];
  if (typeof forwarded === "string") return (forwarded.split(",")[0]?.trim() || fallback).slice(0, 64);
  return fallback.slice(0, 64);
}

export const trap = onRequest(
  { region: "asia-south1", cors: false, secrets: [socIngestSecret], timeoutSeconds: 15, memory: "128MiB", invoker: "public" },
  async (request, response) => {
    const event = {
      eventId: crypto.randomUUID(),
      sourceIp: sourceIp(request.headers, request.ip || "unknown"),
      method: request.method.slice(0, 12),
      route: request.path.slice(0, 300),
      userAgent: (request.get("user-agent") ?? "unknown").replace(/[\r\n]/g, " ").slice(0, 300),
      observedAt: new Date().toISOString(),
    };
    const payload = JSON.stringify(event);
    const signature = crypto.createHmac("sha256", socIngestSecret.value()).update(payload).digest("hex");

    try {
      await fetch(socIngestUrl.value(), {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Grand-Signature": signature },
        body: payload,
        signal: AbortSignal.timeout(MAX_FORWARD_TIMEOUT_MS),
      });
    } finally {
      // The trap never reveals whether forwarding succeeded.
      response.set("Cache-Control", "no-store").status(404).send("Not found");
    }
  },
);
