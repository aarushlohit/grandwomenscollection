import { NextRequest, NextResponse } from "next/server";
import { logAuditEvent } from "@/lib/audit";

export async function POST(request: NextRequest) {
  const payload = await request.json();
  await logAuditEvent({ type: "razorpay-webhook", payload });
  return NextResponse.json({ received: true });
}
