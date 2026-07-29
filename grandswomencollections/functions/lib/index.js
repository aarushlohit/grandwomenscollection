"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.health = exports.nightlyBackupReminder = exports.hourlyBudgetCheck = void 0;
const scheduler_1 = require("firebase-functions/v2/scheduler");
const https_1 = require("firebase-functions/v2/https");
const app_1 = require("firebase-admin/app");
(0, app_1.initializeApp)();
exports.hourlyBudgetCheck = (0, scheduler_1.onSchedule)("every 60 minutes", async () => {
    console.info("Budget check executed");
});
exports.nightlyBackupReminder = (0, scheduler_1.onSchedule)("every day 02:00", async () => {
    console.info("Backup reminder executed");
});
exports.health = (0, https_1.onRequest)((_request, response) => {
    response.json({
        status: "ok",
        service: "grand-womens-functions"
    });
});
