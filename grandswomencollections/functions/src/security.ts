import crypto from "node:crypto";
import type { Request } from "firebase-functions/v2/https";
import { HttpsError } from "firebase-functions/v2/https";
import { db, Timestamp } from "./core";

export interface RateLimitOptions {
  scope: string;
  subject: string;
  limit: number;
  windowMs: number;
}

export function stableHash(value: string): string {
  return crypto.createHash("sha256").update(value).digest("hex");
}

export function clientIp(request: Request): string {
  const cloudflareIp = request.headers["cf-connecting-ip"];
  if (typeof cloudflareIp === "string" && cloudflareIp.length <= 64) return cloudflareIp;

  const forwarded = request.headers["x-forwarded-for"];
  if (typeof forwarded === "string") return forwarded.split(",")[0]?.trim().slice(0, 64) || "unknown";
  return request.ip?.slice(0, 64) || "unknown";
}

export async function enforceRateLimit(options: RateLimitOptions): Promise<void> {
  const nowMs = Date.now();
  const key = stableHash(`${options.scope}:${options.subject}`);
  const reference = db.collection("rateLimits").doc(key);

  const isAllowed = await db.runTransaction(async (transaction) => {
    const snapshot = await transaction.get(reference);
    const current = snapshot.data() as { count?: number; resetAt?: Timestamp } | undefined;
    const resetAtMs = current?.resetAt?.toMillis() ?? 0;

    if (!snapshot.exists || resetAtMs <= nowMs) {
      transaction.set(reference, {
        scope: options.scope,
        count: 1,
        resetAt: Timestamp.fromMillis(nowMs + options.windowMs),
        expiresAt: Timestamp.fromMillis(nowMs + options.windowMs * 2),
      });
      return true;
    }

    if ((current?.count ?? 0) >= options.limit) return false;
    transaction.update(reference, { count: (current?.count ?? 0) + 1 });
    return true;
  });

  if (!isAllowed) {
    throw new HttpsError("resource-exhausted", "Too many requests. Please try again later.");
  }
}

export function verifyHmacHex(payload: string | Buffer, suppliedSignature: string, secret: string): boolean {
  const expected = crypto.createHmac("sha256", secret).update(payload).digest("hex");
  if (!/^[a-f0-9]{64}$/i.test(suppliedSignature)) return false;
  return crypto.timingSafeEqual(Buffer.from(expected, "hex"), Buffer.from(suppliedSignature, "hex"));
}

export function sanitizeUserAgent(value: string | undefined): string {
  return (value ?? "unknown").replace(/[\r\n]/g, " ").slice(0, 300);
}
