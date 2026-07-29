import { NextRequest, NextResponse } from "next/server";
import { logAuditEvent } from "@/lib/audit";
import { sendTelegramAlert } from "@/lib/telegram";

export async function POST(request: NextRequest) {
  const event = {
    type: "honeypot-triggered",
    ip: request.headers.get("x-forwarded-for") ?? "unknown",
    userAgent: request.headers.get("user-agent") ?? "unknown",
    createdAt: new Date().toISOString()
  };

  await logAuditEvent(event);
  await sendTelegramAlert(`HONEYPOT TRIGGERED\nIP: ${event.ip}\nAgent: ${event.userAgent}`);

  return NextResponse.json({ trapped: true }, { status: 403 });
}
