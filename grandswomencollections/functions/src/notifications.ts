import nodemailer from "nodemailer";
import { db, errorMessage, EXTERNAL_REQUEST_TIMEOUT_MS, FieldValue, logger } from "./core";
import { alertEmail, smtpHost, smtpPassword, smtpPort, smtpUser, telegramBotToken, telegramChatId } from "./params";

interface AlertInput {
  type: string;
  severity: "info" | "warning" | "critical";
  title: string;
  message: string;
  telegram?: boolean;
  email?: boolean;
}

async function sendTelegram(message: string): Promise<boolean> {
  if (process.env.FUNCTIONS_EMULATOR === "true") return false;
  const token = telegramBotToken.value();
  const chatId = telegramChatId.value();
  if (!token || !chatId) return false;

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text: message.slice(0, 4000), disable_web_page_preview: true }),
    signal: AbortSignal.timeout(EXTERNAL_REQUEST_TIMEOUT_MS),
  });
  return response.ok;
}

async function sendEmail(subject: string, message: string): Promise<boolean> {
  if (process.env.FUNCTIONS_EMULATOR === "true") return false;
  const host = smtpHost.value();
  const user = smtpUser.value();
  const password = smtpPassword.value();
  const recipient = alertEmail.value();
  if (!host || !user || !password || !recipient) return false;

  const port = Number.parseInt(smtpPort.value(), 10);
  if (!Number.isInteger(port) || port < 1 || port > 65_535) throw new Error("SMTP_PORT is invalid");

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass: password },
    connectionTimeout: EXTERNAL_REQUEST_TIMEOUT_MS,
    greetingTimeout: EXTERNAL_REQUEST_TIMEOUT_MS,
    socketTimeout: EXTERNAL_REQUEST_TIMEOUT_MS,
  });
  await transporter.sendMail({ from: user, to: recipient, subject, text: message });
  return true;
}

export async function emitAlert(input: AlertInput): Promise<void> {
  const reference = db.collection("alerts").doc();
  const delivery = { telegram: false, email: false };

  try {
    if (input.telegram) delivery.telegram = await sendTelegram(`[${input.severity.toUpperCase()}] ${input.title}\n${input.message}`);
  } catch (error) {
    logger.error("Telegram alert failed", { alertType: input.type, error: errorMessage(error) });
  }

  try {
    if (input.email) delivery.email = await sendEmail(`[Grand SOC] ${input.title}`, input.message);
  } catch (error) {
    logger.error("Email alert failed", { alertType: input.type, error: errorMessage(error) });
  }

  await reference.set({
    ...input,
    delivery,
    createdAt: FieldValue.serverTimestamp(),
  });
}
