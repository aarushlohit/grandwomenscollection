import nodemailer from "nodemailer";
import { env } from "@/lib/env";

export async function sendMail(input: {
  to: string;
  subject: string;
  html: string;
}) {
  if (!env.SMTP_HOST || !env.SMTP_USER || !env.SMTP_PASSWORD) {
    return { delivered: false, reason: "smtp-not-configured" };
  }

  const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_PORT === 465,
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASSWORD
    }
  });

  await transporter.sendMail({
    from: env.SMTP_USER,
    to: input.to,
    subject: input.subject,
    html: input.html
  });

  return { delivered: true };
}
