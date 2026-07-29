import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { verifyRazorpaySignature } from "@/lib/payments";

const schema = z.object({
  orderId: z.string(),
  paymentId: z.string(),
  signature: z.string()
});

export async function POST(request: NextRequest) {
  const payload = schema.parse(await request.json());
  const verified = verifyRazorpaySignature(payload.orderId, payload.paymentId, payload.signature);
  return NextResponse.json({ verified });
}
