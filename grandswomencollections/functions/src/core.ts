import { getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { FieldValue, Timestamp, getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import { logger } from "firebase-functions";

if (getApps().length === 0) {
  initializeApp();
}

export const auth = getAuth();
export const db = getFirestore();
export const bucket = getStorage().bucket();
export { FieldValue, Timestamp, logger };

export const REGION = "asia-south1";
export const DEFAULT_TIME_ZONE = "Asia/Kolkata";
export const EXTERNAL_REQUEST_TIMEOUT_MS = 12_000;
export const SECURITY_EVENT_RETENTION_DAYS = 30;

export function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Unknown error";
}
