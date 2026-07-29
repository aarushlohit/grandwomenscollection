import { onSchedule } from "firebase-functions/v2/scheduler";
import { onRequest } from "firebase-functions/v2/https";
import { initializeApp } from "firebase-admin/app";

initializeApp();

export const hourlyBudgetCheck = onSchedule("every 60 minutes", async () => {
  console.info("Budget check executed");
});

export const nightlyBackupReminder = onSchedule("every day 02:00", async () => {
  console.info("Backup reminder executed");
});

export const health = onRequest((_request, response) => {
  response.json({
    status: "ok",
    service: "grand-womens-functions"
  });
});
