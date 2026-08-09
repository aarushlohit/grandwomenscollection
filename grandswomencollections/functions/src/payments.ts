import { randomUUID } from "node:crypto";
import type { Request } from "express";
import { onCall, onRequest, HttpsError } from "firebase-functions/v2/https";
import { requireAuthenticated } from "./auth";
import { writeAuditEvent, writeSecurityEvent, incrementMetric } from "./audit";
import { db, errorMessage, EXTERNAL_REQUEST_TIMEOUT_MS, FieldValue, logger, REGION, Timestamp } from "./core";
import { emitAlert } from "./notifications";
import { razorpayKeyId, razorpaySecret, razorpayWebhookSecret, smtpPassword, telegramBotToken, telegramChatId } from "./params";
import { checkoutSchema, verifyPaymentSchema } from "./schemas";
import { enforceRateLimit, verifyHmacHex } from "./security";

interface ProductRecord {
  title: string;
  pricePaise: number;
  stock: number;
  reservedStock?: number;
  active: boolean;
  sizes: string[];
  colors: string[];
}

interface PricedItem {
  productId: string;
  title: string;
  pricePaise: number;
  quantity: number;
  size: string;
  color: string;
  lineTotalPaise: number;
}

interface RazorpayOrderResponse {
  id: string;
  amount: number;
  currency: string;
  status: string;
}

function basicAuthorization(keyId: string, secret: string): string {
  return `Basic ${Buffer.from(`${keyId}:${secret}`).toString("base64")}`;
}

async function createRazorpayOrder(amountPaise: number, receipt: string, internalOrderId: string): Promise<RazorpayOrderResponse> {
  const response = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      Authorization: basicAuthorization(razorpayKeyId.value(), razorpaySecret.value()),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: amountPaise,
      currency: "INR",
      receipt: receipt.slice(0, 40),
      notes: { internalOrderId },
    }),
    signal: AbortSignal.timeout(EXTERNAL_REQUEST_TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error(`Razorpay order creation failed with status ${response.status}`);
  }

  const payload = (await response.json()) as Partial<RazorpayOrderResponse>;
  if (!payload.id || payload.amount !== amountPaise || payload.currency !== "INR") {
    throw new Error("Razorpay returned an invalid order response");
  }
  return payload as RazorpayOrderResponse;
}

export async function createRazorpayRefund(paymentId: string, amountPaise: number, receipt: string): Promise<string> {
  const response = await fetch(`https://api.razorpay.com/v1/payments/${encodeURIComponent(paymentId)}/refund`, {
    method: "POST",
    headers: {
      Authorization: basicAuthorization(razorpayKeyId.value(), razorpaySecret.value()),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount: amountPaise, speed: "normal", receipt: receipt.slice(0, 40) }),
    signal: AbortSignal.timeout(EXTERNAL_REQUEST_TIMEOUT_MS),
  });
  if (!response.ok) throw new Error(`Razorpay refund failed with status ${response.status}`);
  const payload = (await response.json()) as { id?: string; payment_id?: string };
  if (!payload.id || payload.payment_id !== paymentId) throw new Error("Razorpay returned an invalid refund response");
  return payload.id;
}

async function priceCart(items: Array<{ productId: string; quantity: number; size: string; color: string }>): Promise<PricedItem[]> {
  const snapshots = await db.getAll(...items.map((item) => db.collection("products").doc(item.productId)));
  return items.map((item, index) => {
    const product = snapshots[index]?.data() as ProductRecord | undefined;
    if (!product || !product.active) throw new HttpsError("failed-precondition", "One or more products are unavailable.");
    if (!Number.isInteger(product.pricePaise) || product.pricePaise < 100) throw new HttpsError("internal", "A product price is invalid.");
    if (product.stock - (product.reservedStock ?? 0) < item.quantity) throw new HttpsError("failed-precondition", `${product.title} does not have enough stock.`);
    if (!product.sizes.includes(item.size) || !product.colors.includes(item.color)) {
      throw new HttpsError("invalid-argument", `The selected option for ${product.title} is unavailable.`);
    }
    return {
      ...item,
      title: product.title,
      pricePaise: product.pricePaise,
      lineTotalPaise: product.pricePaise * item.quantity,
    };
  });
}

async function calculateDiscount(couponCode: string | undefined, subtotalPaise: number): Promise<{ couponId: string | null; discountPaise: number }> {
  if (!couponCode) return { couponId: null, discountPaise: 0 };
  const snapshot = await db.collection("coupons").where("code", "==", couponCode).where("active", "==", true).limit(1).get();
  const couponDocument = snapshot.docs[0];
  if (!couponDocument) throw new HttpsError("failed-precondition", "This coupon is invalid or inactive.");
  const coupon = couponDocument.data() as {
    type: "percent" | "fixed";
    value: number;
    minOrderPaise: number;
    maxDiscountPaise?: number | null;
    usageCount?: number;
    usageLimit: number;
    expiresAt: Timestamp;
  };
  if (coupon.expiresAt.toMillis() <= Date.now() || (coupon.usageCount ?? 0) >= coupon.usageLimit || subtotalPaise < coupon.minOrderPaise) {
    throw new HttpsError("failed-precondition", "This coupon cannot be applied to the order.");
  }
  const rawDiscount = coupon.type === "percent" ? Math.floor((subtotalPaise * coupon.value) / 100) : coupon.value;
  const cappedDiscount = coupon.maxDiscountPaise ? Math.min(rawDiscount, coupon.maxDiscountPaise) : rawDiscount;
  return { couponId: couponDocument.id, discountPaise: Math.min(cappedDiscount, subtotalPaise - 100) };
}

export const createCheckoutOrder = onCall(
  {
    region: REGION,
    enforceAppCheck: true,
    consumeAppCheckToken: true,
    secrets: [razorpayKeyId, razorpaySecret],
    timeoutSeconds: 30,
    memory: "256MiB",
  },
  async (request) => {
    const userId = requireAuthenticated(request);
    await enforceRateLimit({ scope: "checkout", subject: userId, limit: 8, windowMs: 15 * 60_000 });
    const input = checkoutSchema.parse(request.data);
    const idempotencyReference = db.collection("checkoutRequests").doc(`${userId}_${input.requestId}`);
    const existing = await idempotencyReference.get();
    if (existing.exists) {
      const value = existing.data();
      if (value?.status === "ready") return value.response;
      throw new HttpsError("aborted", "This checkout request is already being processed.");
    }

    const pricedItems = await priceCart(input.items);
    const subtotalPaise = pricedItems.reduce((total, item) => total + item.lineTotalPaise, 0);
    const coupon = await calculateDiscount(input.couponCode, subtotalPaise);
    const amountPaise = subtotalPaise - coupon.discountPaise;
    const orderReference = db.collection("orders").doc();
    const receipt = `gwc_${orderReference.id.slice(0, 24)}`;

    await db.runTransaction(async (transaction) => {
      const duplicate = await transaction.get(idempotencyReference);
      if (duplicate.exists) throw new HttpsError("aborted", "This checkout request is already being processed.");
      const productReferences = pricedItems.map((item) => db.collection("products").doc(item.productId));
      const productSnapshots = await transaction.getAll(...productReferences);
      const couponReference = coupon.couponId ? db.collection("coupons").doc(coupon.couponId) : null;
      const couponSnapshot = couponReference ? await transaction.get(couponReference) : null;
      if (couponSnapshot) {
        const usageCount = Number(couponSnapshot.get("usageCount") ?? 0);
        const reservedUses = Number(couponSnapshot.get("reservedUses") ?? 0);
        const usageLimit = Number(couponSnapshot.get("usageLimit") ?? 0);
        if (usageCount + reservedUses >= usageLimit) throw new HttpsError("failed-precondition", "This coupon has reached its usage limit.");
      }
      pricedItems.forEach((item, index) => {
        const product = productSnapshots[index]?.data() as ProductRecord | undefined;
        if (!product || product.stock - (product.reservedStock ?? 0) < item.quantity) {
          throw new HttpsError("failed-precondition", `${item.title} does not have enough stock.`);
        }
        transaction.update(productReferences[index]!, { reservedStock: FieldValue.increment(item.quantity) });
      });
      if (couponReference) transaction.update(couponReference, { reservedUses: FieldValue.increment(1) });
      transaction.create(idempotencyReference, { userId, status: "creating", orderId: orderReference.id, expiresAt: Timestamp.fromMillis(Date.now() + 24 * 60 * 60_000) });
      transaction.create(orderReference, {
        userId,
        status: "payment_pending",
        paymentStatus: "pending",
        inventoryReserved: true,
        items: pricedItems,
        shippingAddress: input.shippingAddress,
        subtotalPaise,
        discountPaise: coupon.discountPaise,
        amountPaise,
        couponId: coupon.couponId,
        couponReserved: coupon.couponId !== null,
        currency: "INR",
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
        expiresAt: Timestamp.fromMillis(Date.now() + 30 * 60_000),
      });
    });

    try {
      const razorpayOrder = await createRazorpayOrder(amountPaise, receipt, orderReference.id);
      const response = {
        internalOrderId: orderReference.id,
        razorpayOrderId: razorpayOrder.id,
        razorpayKeyId: razorpayKeyId.value(),
        amountPaise,
        currency: "INR",
      };
      const batch = db.batch();
      batch.update(orderReference, { razorpayOrderId: razorpayOrder.id, updatedAt: FieldValue.serverTimestamp() });
      batch.set(idempotencyReference, { status: "ready", response, updatedAt: FieldValue.serverTimestamp() }, { merge: true });
      await batch.commit();
      await incrementMetric("checkoutCreated");
      return response;
    } catch (error) {
      await releaseInventoryReservation(orderReference.id, "payment_initialization_failed");
      await idempotencyReference.set({ status: "failed", updatedAt: FieldValue.serverTimestamp() }, { merge: true });
      logger.error("Checkout initialization failed", { orderId: orderReference.id, userId, error: errorMessage(error) });
      throw new HttpsError("unavailable", "Payment initialization is temporarily unavailable.");
    }
  },
);

export async function releaseInventoryReservation(orderId: string, nextStatus: string): Promise<void> {
  const orderReference = db.collection("orders").doc(orderId);
  await db.runTransaction(async (transaction) => {
    const orderSnapshot = await transaction.get(orderReference);
    if (!orderSnapshot.exists) return;
    const order = orderSnapshot.data() as { inventoryReserved?: boolean; items?: PricedItem[]; couponId?: string | null; couponReserved?: boolean };
    if (order.inventoryReserved !== true || !order.items) return;
    order.items.forEach((item) => {
      transaction.update(db.collection("products").doc(item.productId), { reservedStock: FieldValue.increment(-item.quantity) });
    });
    if (order.couponId && order.couponReserved) {
      transaction.update(db.collection("coupons").doc(order.couponId), { reservedUses: FieldValue.increment(-1) });
    }
    transaction.update(orderReference, { inventoryReserved: false, couponReserved: false, status: nextStatus, updatedAt: FieldValue.serverTimestamp() });
  });
}

async function markOrderPaid(input: { internalOrderId: string; razorpayOrderId: string; razorpayPaymentId: string }, source: "client" | "webhook"): Promise<void> {
  const orderReference = db.collection("orders").doc(input.internalOrderId);
  await db.runTransaction(async (transaction) => {
    const orderSnapshot = await transaction.get(orderReference);
    if (!orderSnapshot.exists) throw new HttpsError("not-found", "Order not found.");
    const order = orderSnapshot.data() as { status: string; razorpayOrderId: string; items: PricedItem[]; couponId?: string | null; couponReserved?: boolean; inventoryReserved?: boolean };
    if (order.razorpayOrderId !== input.razorpayOrderId) throw new HttpsError("failed-precondition", "Payment order mismatch.");
    if (["paid", "processing", "shipped", "delivered"].includes(order.status)) return;
    if (order.status !== "payment_pending") throw new HttpsError("failed-precondition", "Order is not payable.");

    const productReferences = order.items.map((item) => db.collection("products").doc(item.productId));
    const productSnapshots = await transaction.getAll(...productReferences);
    order.items.forEach((item, index) => {
      const product = productSnapshots[index]?.data() as ProductRecord | undefined;
      if (!product || order.inventoryReserved !== true || (product.reservedStock ?? 0) < item.quantity || product.stock < item.quantity) {
        throw new HttpsError("failed-precondition", "The reserved inventory is unavailable.");
      }
      transaction.update(productReferences[index]!, {
        stock: FieldValue.increment(-item.quantity),
        reservedStock: FieldValue.increment(-item.quantity),
        updatedAt: FieldValue.serverTimestamp(),
      });
    });
    if (order.couponId && order.couponReserved) {
      transaction.update(db.collection("coupons").doc(order.couponId), {
        usageCount: FieldValue.increment(1),
        reservedUses: FieldValue.increment(-1),
      });
    }
    transaction.update(orderReference, {
      status: "paid",
      paymentStatus: "captured",
      razorpayPaymentId: input.razorpayPaymentId,
      paymentConfirmedBy: source,
      inventoryReserved: false,
      couponReserved: false,
      paidAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });
    transaction.create(db.collection("paymentLogs").doc(), {
      orderId: input.internalOrderId,
      razorpayOrderId: input.razorpayOrderId,
      razorpayPaymentId: input.razorpayPaymentId,
      result: "verified",
      source,
      createdAt: FieldValue.serverTimestamp(),
    });
  });
}

async function markRefundProcessed(paymentId: string, refundId: string, amountPaise: number): Promise<void> {
  const query = await db.collection("orders").where("razorpayPaymentId", "==", paymentId).limit(1).get();
  const orderDocument = query.docs[0];
  if (!orderDocument) return;
  await db.runTransaction(async (transaction) => {
    const orderSnapshot = await transaction.get(orderDocument.ref);
    const order = orderSnapshot.data() as { status?: string; amountPaise?: number; items?: PricedItem[]; refundStatus?: string };
    if (order.refundStatus === "processed") return;
    if (amountPaise !== order.amountPaise || !order.items) throw new Error("Refund amount does not match the order total");
    order.items.forEach((item) => {
      transaction.update(db.collection("products").doc(item.productId), { stock: FieldValue.increment(item.quantity), updatedAt: FieldValue.serverTimestamp() });
    });
    transaction.update(orderDocument.ref, {
      status: "refunded",
      paymentStatus: "refunded",
      refundStatus: "processed",
      refundId,
      refundedAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });
  });
}

export const verifyPayment = onCall(
  {
    region: REGION,
    enforceAppCheck: true,
    consumeAppCheckToken: true,
    secrets: [razorpaySecret, telegramBotToken, telegramChatId, smtpPassword],
    timeoutSeconds: 30,
  },
  async (request) => {
    const userId = requireAuthenticated(request);
    await enforceRateLimit({ scope: "payment-verify", subject: userId, limit: 10, windowMs: 15 * 60_000 });
    const input = verifyPaymentSchema.parse(request.data);
    const orderSnapshot = await db.collection("orders").doc(input.internalOrderId).get();
    if (!orderSnapshot.exists || orderSnapshot.get("userId") !== userId) throw new HttpsError("not-found", "Order not found.");

    const isValid = verifyHmacHex(`${input.razorpayOrderId}|${input.razorpayPaymentId}`, input.signature, razorpaySecret.value());
    if (!isValid) {
      await Promise.all([
        writeSecurityEvent({ type: "payment-verification-failed", severity: "critical", source: "payment", userId, details: { orderId: input.internalOrderId } }),
        db.collection("paymentLogs").add({ orderId: input.internalOrderId, result: "invalid-signature", createdAt: FieldValue.serverTimestamp() }),
        emitAlert({ type: "payment-verification-failed", severity: "critical", title: "Payment verification failed", message: `Order ${input.internalOrderId} returned an invalid signature.`, telegram: true, email: true }),
      ]);
      throw new HttpsError("permission-denied", "Payment could not be verified.");
    }

    await markOrderPaid(input, "client");
    await incrementMetric("paymentsVerified");
    return { verified: true, orderId: input.internalOrderId };
  },
);

function rawRequestBody(request: Request): Buffer {
  const rawBody = (request as Request & { rawBody?: Buffer }).rawBody;
  if (!rawBody) throw new Error("Raw request body is unavailable");
  return rawBody;
}

export const razorpayWebhook = onRequest(
  { region: REGION, secrets: [razorpayWebhookSecret, telegramBotToken, telegramChatId, smtpPassword], timeoutSeconds: 30 },
  async (request, response) => {
    if (request.method !== "POST") {
      response.status(405).send("Method not allowed");
      return;
    }
    const signature = request.header("x-razorpay-signature") ?? "";
    if (!verifyHmacHex(rawRequestBody(request), signature, razorpayWebhookSecret.value())) {
      await writeSecurityEvent({ type: "razorpay-webhook-invalid-signature", severity: "critical", source: "payment" });
      response.status(401).send("Invalid signature");
      return;
    }

    const eventId = request.header("x-razorpay-event-id")?.slice(0, 128) || randomUUID();
    const eventReference = db.collection("paymentWebhookEvents").doc(eventId);
    if ((await eventReference.get()).exists) {
      response.status(200).send("Already processed");
      return;
    }

    const payload = request.body as { event?: string; payload?: { payment?: { entity?: Record<string, unknown> }; refund?: { entity?: Record<string, unknown> } } };
    const payment = payload.payload?.payment?.entity;
    const razorpayOrderId = typeof payment?.order_id === "string" ? payment.order_id : "";
    const paymentId = typeof payment?.id === "string" ? payment.id : "";
    await eventReference.create({ event: payload.event ?? "unknown", razorpayOrderId, createdAt: FieldValue.serverTimestamp() });

    if (payload.event === "payment.captured" && razorpayOrderId && paymentId) {
      const orderSnapshot = await db.collection("orders").where("razorpayOrderId", "==", razorpayOrderId).limit(1).get();
      const order = orderSnapshot.docs[0];
      if (order) await markOrderPaid({ internalOrderId: order.id, razorpayOrderId, razorpayPaymentId: paymentId }, "webhook");
    }
    if (payload.event === "refund.processed") {
      const refund = payload.payload?.refund?.entity;
      const refundPaymentId = typeof refund?.payment_id === "string" ? refund.payment_id : "";
      const refundId = typeof refund?.id === "string" ? refund.id : "";
      const refundAmount = typeof refund?.amount === "number" ? refund.amount : 0;
      if (refundPaymentId && refundId && refundAmount > 0) await markRefundProcessed(refundPaymentId, refundId, refundAmount);
    }
    response.status(200).send("OK");
  },
);
