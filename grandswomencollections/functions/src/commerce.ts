import { onCall, HttpsError } from "firebase-functions/v2/https";
import { requireAuthenticated } from "./auth";
import { incrementMetric, writeAuditEvent } from "./audit";
import { db, FieldValue, REGION } from "./core";
import { emitAlert } from "./notifications";
import { smtpPassword } from "./params";
import { contactRequestSchema, reviewSchema } from "./schemas";
import { clientIp, enforceRateLimit, stableHash } from "./security";

export const submitVerifiedReview = onCall(
  { region: REGION, enforceAppCheck: true, consumeAppCheckToken: true, timeoutSeconds: 20 },
  async (request) => {
    const userId = requireAuthenticated(request);
    await enforceRateLimit({ scope: "review", subject: userId, limit: 5, windowMs: 24 * 60 * 60_000 });
    const input = reviewSchema.parse(request.data);

    const deliveredOrder = await db
      .collection("orders")
      .where("userId", "==", userId)
      .where("status", "==", "delivered")
      .limit(50)
      .get();
    const isVerifiedPurchase = deliveredOrder.docs.some((document) => {
      const items = document.get("items") as Array<{ productId?: string }> | undefined;
      return items?.some((item) => item.productId === input.productId) ?? false;
    });
    if (!isVerifiedPurchase) throw new HttpsError("failed-precondition", "Only verified purchases can be reviewed.");

    const reviewReference = db.collection("reviews").doc(`${input.productId}_${userId}`);
    await db.runTransaction(async (transaction) => {
      const [reviewSnapshot, productSnapshot] = await Promise.all([
        transaction.get(reviewReference),
        transaction.get(db.collection("products").doc(input.productId)),
      ]);
      if (reviewSnapshot.exists) throw new HttpsError("already-exists", "You have already reviewed this product.");
      if (!productSnapshot.exists) throw new HttpsError("not-found", "Product not found.");
      const reviewCount = Number(productSnapshot.get("reviewCount") ?? 0);
      const rating = Number(productSnapshot.get("rating") ?? 0);
      const nextCount = reviewCount + 1;
      const nextRating = Math.round(((rating * reviewCount + input.rating) / nextCount) * 10) / 10;
      transaction.create(reviewReference, {
        ...input,
        userId,
        verifiedPurchase: true,
        status: "published",
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      });
      transaction.update(productSnapshot.ref, { rating: nextRating, reviewCount: nextCount, updatedAt: FieldValue.serverTimestamp() });
    });
    await incrementMetric("reviewsSubmitted");
    return { reviewId: reviewReference.id, published: true };
  },
);

export const deleteOwnReview = onCall(
  { region: REGION, enforceAppCheck: true, consumeAppCheckToken: true },
  async (request) => {
    const userId = requireAuthenticated(request);
    const productId = typeof request.data?.productId === "string" ? request.data.productId : "";
    if (!/^[a-zA-Z0-9_-]{2,128}$/.test(productId)) throw new HttpsError("invalid-argument", "Invalid product ID.");
    const reference = db.collection("reviews").doc(`${productId}_${userId}`);
    const snapshot = await reference.get();
    if (!snapshot.exists || snapshot.get("userId") !== userId) throw new HttpsError("not-found", "Review not found.");
    await reference.delete();
    await writeAuditEvent({ actorId: userId, action: "review.delete", resourceType: "review", resourceId: reference.id, result: "success" });
    return { deleted: true };
  },
);

export const submitContactRequest = onCall(
  { region: REGION, enforceAppCheck: true, consumeAppCheckToken: true, secrets: [smtpPassword] },
  async (request) => {
    const sourceIp = clientIp(request.rawRequest);
    await enforceRateLimit({ scope: "contact", subject: request.auth?.uid ?? stableHash(sourceIp), limit: 5, windowMs: 60 * 60_000 });
    const input = contactRequestSchema.parse(request.data);
    const reference = db.collection("supportRequests").doc();
    await reference.create({
      ...input,
      userId: request.auth?.uid ?? null,
      sourceIp,
      status: "new",
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });
    await Promise.all([
      incrementMetric("contactRequests"),
      emitAlert({ type: "contact-request", severity: "info", title: `Customer enquiry: ${input.subject}`, message: `From ${input.name} <${input.email}>\n\n${input.message}`, email: true }),
    ]);
    return { requestId: reference.id, received: true };
  },
);
