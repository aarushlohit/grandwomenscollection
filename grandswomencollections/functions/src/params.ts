import { defineSecret, defineString } from "firebase-functions/params";

export const razorpayKeyId = defineSecret("RAZORPAY_KEY_ID");
export const razorpaySecret = defineSecret("RAZORPAY_SECRET");
export const razorpayWebhookSecret = defineSecret("RAZORPAY_WEBHOOK_SECRET");
export const openCodeApiKey = defineSecret("OPENCODE_API_KEY");
export const nvidiaNimApiKey = defineSecret("NVIDIA_NIM_API_KEY");
export const telegramBotToken = defineSecret("TELEGRAM_BOT_TOKEN");
export const telegramChatId = defineSecret("TELEGRAM_CHAT_ID");
export const smtpPassword = defineSecret("SMTP_PASSWORD");
export const cloudflareApiToken = defineSecret("CLOUDFLARE_API_TOKEN");
export const cloudflareZoneId = defineSecret("CLOUDFLARE_ZONE_ID");
export const deploymentWebhookSecret = defineSecret("DEPLOYMENT_WEBHOOK_SECRET");
export const socIngestSecret = defineSecret("SOC_INGEST_SECRET");

export const openCodeBaseUrl = defineString("OPENCODE_BASE_URL", {
  default: "",
});
export const openCodeModel = defineString("OPENCODE_MODEL", { default: "" });
export const nvidiaNimBaseUrl = defineString("NVIDIA_NIM_BASE_URL", {
  default: "https://integrate.api.nvidia.com/v1/chat/completions",
});
export const nvidiaNimModel = defineString("NVIDIA_NIM_MODEL", {
  default: "meta/llama-3.2-90b-vision-instruct",
});
export const smtpHost = defineString("SMTP_HOST", { default: "" });
export const smtpPort = defineString("SMTP_PORT", { default: "587" });
export const smtpUser = defineString("SMTP_USER", { default: "" });
export const alertEmail = defineString("ALERT_EMAIL", { default: "" });
export const publicSiteUrl = defineString("PUBLIC_SITE_URL", {
  default: "https://grandwomenscollections.com",
});
export const backupBucket = defineString("BACKUP_BUCKET", { default: "" });
