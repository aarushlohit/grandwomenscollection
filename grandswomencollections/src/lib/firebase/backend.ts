"use client";

import { getFunctions, httpsCallable, type HttpsCallableResult } from "firebase/functions";
import { getFirebaseApp } from "@/lib/firebase/client";

function callable(functionName: string) {
  return async (data?: unknown): Promise<HttpsCallableResult<unknown>> => {
    const functions = getFunctions(getFirebaseApp(), "asia-south1");
    return httpsCallable(functions, functionName)(data);
  };
}

export const backend = {
  createCheckoutOrder: callable("createCheckoutOrder"),
  verifyPayment: callable("verifyPayment"),
  submitVerifiedReview: callable("submitVerifiedReview"),
  deleteOwnReview: callable("deleteOwnReview"),
  submitContactRequest: callable("submitContactRequest"),
  aiShoppingAssistant: callable("aiShoppingAssistant"),
  aiVisualSearch: callable("aiVisualSearch"),
  adminGenerateProductDescription: callable("adminGenerateProductDescription"),
  adminMutateCatalog: callable("adminMutateCatalog"),
  adminUpdateOrderStatus: callable("adminUpdateOrderStatus"),
  adminRefundOrder: callable("adminRefundOrder"),
  adminSetUserRole: callable("adminSetUserRole"),
  getOperationsDashboard: callable("getOperationsDashboard"),
  getSocDashboard: callable("getSocDashboard"),
  recordClientSecurityEvent: callable("recordClientSecurityEvent"),
};
