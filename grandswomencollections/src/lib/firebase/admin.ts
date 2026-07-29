import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import { env } from "@/lib/env";

function getServiceAccount() {
  if (!env.FIREBASE_SERVICE_ACCOUNT) {
    return null;
  }

  try {
    return JSON.parse(env.FIREBASE_SERVICE_ACCOUNT);
  } catch {
    return null;
  }
}

const serviceAccount = getServiceAccount();

const adminApp =
  getApps()[0] ??
  initializeApp(
    serviceAccount
      ? {
          credential: cert(serviceAccount),
          storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
        }
      : undefined
  );

export const adminAuth = getAuth(adminApp);
export const adminDb = getFirestore(adminApp);
export const adminStorage = getStorage(adminApp);
