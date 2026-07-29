import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { logAuditEvent } from "@/lib/audit";
import { sendMail } from "@/lib/mail";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10)
});

export async function POST(request: NextRequest) {
  const payload = schema.parse(await request.json());
  await logAuditEvent({ type: "contact-form", payload });
  await sendMail({
    to: payload.email,
    subject: "We received your message",
    html: `<p>Hi ${payload.name}, our client services team has received your note.</p>`
  });

  return NextResponse.json({ success: true });
}
