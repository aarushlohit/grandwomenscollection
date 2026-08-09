import { onCall, HttpsError } from "firebase-functions/v2/https";
import { requireAdmin, requireOperationsAccess, requireSuperAdmin } from "./auth";
import { writeAuditEvent } from "./audit";
import { auth, db, FieldValue, REGION, Timestamp } from "./core";
import { razorpayKeyId, razorpaySecret } from "./params";
import { createRazorpayRefund } from "./payments";
import { catalogMutationSchema, orderStatusSchema, roleSchema } from "./schemas";
import { enforceRateLimit } from "./security";

const COLLECTION_BY_ENTITY = {
  product: "products",
  category: "categories",
  banner: "banners",
  coupon: "coupons",
} as const;

export const adminMutateCatalog = onCall(
  { region: REGION, enforceAppCheck: true, consumeAppCheckToken: true, timeoutSeconds: 30 },
  async (request) => {
    const actorRole = requireAdmin(request);
    const actorId = request.auth!.uid;
    await enforceRateLimit({ scope: "admin-catalog", subject: actorId, limit: 60, windowMs: 15 * 60_000 });
    const input = catalogMutationSchema.parse(request.data);
    const collection = COLLECTION_BY_ENTITY[input.entity];
    const documentId = input.action === "upsert" ? input.value.id : input.id;
    const reference = db.collection(collection).doc(documentId);
    const existing = await reference.get();

    if (input.action === "delete") {
      if (!existing.exists) throw new HttpsError("not-found", `${input.entity} not found.`);
      await reference.update({ active: false, deletedAt: FieldValue.serverTimestamp(), updatedAt: FieldValue.serverTimestamp() });
    } else {
      const value: Record<string, unknown> = { ...input.value, updatedAt: FieldValue.serverTimestamp(), updatedBy: actorId };
      if (input.entity === "coupon") {
        value.expiresAt = Timestamp.fromDate(new Date(input.value.expiresAtIso));
        delete value.expiresAtIso;
        value.usageCount = existing.get("usageCount") ?? 0;
        value.reservedUses = existing.get("reservedUses") ?? 0;
      }
      if (!existing.exists) value.createdAt = FieldValue.serverTimestamp();
      await reference.set(value, { merge: true });
    }

    await writeAuditEvent({
      actorId,
      actorRole,
      action: `${input.entity}.${input.action}`,
      resourceType: input.entity,
      resourceId: documentId,
      result: "success",
    });
    return { id: documentId, action: input.action };
  },
);

export const adminUpdateOrderStatus = onCall(
  { region: REGION, enforceAppCheck: true, consumeAppCheckToken: true },
  async (request) => {
    const actorRole = requireOperationsAccess(request);
    const actorId = request.auth!.uid;
    await enforceRateLimit({ scope: "admin-order-status", subject: actorId, limit: 60, windowMs: 15 * 60_000 });
    const input = orderStatusSchema.parse(request.data);
    const reference = db.collection("orders").doc(input.orderId);
    const snapshot = await reference.get();
    if (!snapshot.exists) throw new HttpsError("not-found", "Order not found.");
    const currentStatus = snapshot.get("status") as string;
    const transitions: Record<string, string[]> = {
      paid: ["processing"],
      processing: ["shipped"],
      shipped: ["delivered"],
      delivered: [],
    };
    if (!transitions[currentStatus]?.includes(input.status)) throw new HttpsError("failed-precondition", "This order status transition is not allowed.");
    if (input.status === "shipped" && (!input.trackingNumber || !input.carrier)) {
      throw new HttpsError("invalid-argument", "Carrier and tracking number are required when shipping.");
    }
    await reference.update({ ...input, status: input.status, updatedAt: FieldValue.serverTimestamp(), updatedBy: actorId });
    await writeAuditEvent({ actorId, actorRole, action: "order.status.update", resourceType: "order", resourceId: input.orderId, result: "success", details: { from: currentStatus, to: input.status } });
    return { updated: true };
  },
);

export const adminRefundOrder = onCall(
  { region: REGION, enforceAppCheck: true, consumeAppCheckToken: true, secrets: [razorpayKeyId, razorpaySecret], timeoutSeconds: 30 },
  async (request) => {
    const actorRole = requireAdmin(request);
    const actorId = request.auth!.uid;
    await enforceRateLimit({ scope: "admin-refund", subject: actorId, limit: 10, windowMs: 60 * 60_000 });
    const orderId = typeof request.data?.orderId === "string" ? request.data.orderId : "";
    if (!/^[a-zA-Z0-9_-]{2,128}$/.test(orderId)) throw new HttpsError("invalid-argument", "Invalid order ID.");
    const reference = db.collection("orders").doc(orderId);
    const snapshot = await reference.get();
    if (!snapshot.exists) throw new HttpsError("not-found", "Order not found.");
    const status = snapshot.get("status") as string;
    const paymentId = snapshot.get("razorpayPaymentId") as string | undefined;
    const amountPaise = snapshot.get("amountPaise") as number | undefined;
    if (!paymentId || !Number.isInteger(amountPaise) || !["paid", "processing", "shipped", "delivered"].includes(status)) {
      throw new HttpsError("failed-precondition", "This order cannot be refunded.");
    }
    if (["initiating", "pending", "processed"].includes(snapshot.get("refundStatus"))) {
      return { refundRequested: true, refundStatus: snapshot.get("refundStatus"), refundId: snapshot.get("refundId") ?? null };
    }

    await reference.update({ refundStatus: "initiating", refundRequestedAt: FieldValue.serverTimestamp(), updatedBy: actorId });
    try {
      const refundId = await createRazorpayRefund(paymentId, amountPaise!, `refund_${orderId}`);
      await reference.update({ refundStatus: "pending", refundId, updatedAt: FieldValue.serverTimestamp() });
      await writeAuditEvent({ actorId, actorRole, action: "order.refund.request", resourceType: "order", resourceId: orderId, result: "success", details: { refundId } });
      return { refundRequested: true, refundStatus: "pending", refundId };
    } catch (error) {
      await reference.update({ refundStatus: "failed", updatedAt: FieldValue.serverTimestamp() });
      throw error;
    }
  },
);

export const adminSetUserRole = onCall(
  { region: REGION, enforceAppCheck: true, consumeAppCheckToken: true },
  async (request) => {
    const actorRole = requireSuperAdmin(request);
    const actorId = request.auth!.uid;
    await enforceRateLimit({ scope: "admin-role", subject: actorId, limit: 10, windowMs: 60 * 60_000 });
    const input = roleSchema.parse(request.data);
    if (input.uid === actorId && input.role !== "super_admin") throw new HttpsError("failed-precondition", "You cannot remove your own super-admin role.");

    const target = await auth.getUser(input.uid);
    await auth.setCustomUserClaims(input.uid, { ...target.customClaims, role: input.role });
    await db.collection("users").doc(input.uid).set({ role: input.role, roleUpdatedAt: FieldValue.serverTimestamp(), roleUpdatedBy: actorId }, { merge: true });
    await auth.revokeRefreshTokens(input.uid);
    await writeAuditEvent({ actorId, actorRole, action: "user.role.update", resourceType: "user", resourceId: input.uid, result: "success", details: { role: input.role } });
    return { updated: true, role: input.role, sessionsRevoked: true };
  },
);
