import crypto from "node:crypto";
import Razorpay from "razorpay";
import { env } from "@/lib/env";

export function getRazorpayClient() {
  if (!env.RAZORPAY_KEY_ID || !env.RAZORPAY_SECRET) {
    return null;
  }

  return new Razorpay({
    key_id: env.RAZORPAY_KEY_ID,
    key_secret: env.RAZORPAY_SECRET
  });
}

export function verifyRazorpaySignature(orderId: string, paymentId: string, signature: string) {
  if (!env.RAZORPAY_SECRET) {
    return false;
  }

  const expected = crypto
    .createHmac("sha256", env.RAZORPAY_SECRET)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  return expected === signature;
}
