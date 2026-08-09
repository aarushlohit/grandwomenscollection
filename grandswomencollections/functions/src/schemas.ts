import { z } from "zod";

const id = z.string().trim().min(2).max(128).regex(/^[a-zA-Z0-9_-]+$/);
const shortText = z.string().trim().min(1).max(200);
const url = z.string().url().max(2048).refine((value) => value.startsWith("https://"), "HTTPS is required");

export const cartItemSchema = z.object({
  productId: id,
  quantity: z.number().int().min(1).max(10),
  size: z.string().trim().min(1).max(32),
  color: z.string().trim().min(1).max(40),
});

export const addressSchema = z.object({
  name: shortText,
  phone: z.string().trim().regex(/^\+?[0-9]{10,15}$/),
  line1: z.string().trim().min(3).max(200),
  line2: z.string().trim().max(200).optional().default(""),
  city: z.string().trim().min(2).max(100),
  state: z.string().trim().min(2).max(100),
  postalCode: z.string().trim().regex(/^[1-9][0-9]{5}$/),
  country: z.literal("IN"),
});

export const checkoutSchema = z.object({
  requestId: z.string().uuid(),
  items: z.array(cartItemSchema).min(1).max(30),
  shippingAddress: addressSchema,
  couponCode: z.string().trim().toUpperCase().max(40).optional(),
});

export const verifyPaymentSchema = z.object({
  internalOrderId: id,
  razorpayOrderId: z.string().trim().min(5).max(128),
  razorpayPaymentId: z.string().trim().min(5).max(128),
  signature: z.string().trim().regex(/^[a-f0-9]{64}$/i),
});

export const reviewSchema = z.object({
  productId: id,
  rating: z.number().int().min(1).max(5),
  title: z.string().trim().max(100).optional().default(""),
  comment: z.string().trim().min(10).max(1200),
});

export const productSchema = z.object({
  id,
  slug: z.string().trim().min(2).max(160).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: shortText,
  subtitle: z.string().trim().max(240).default(""),
  description: z.string().trim().min(10).max(10_000),
  pricePaise: z.number().int().min(100).max(100_000_000),
  compareAtPricePaise: z.number().int().min(100).max(100_000_000).nullable().optional(),
  category: id,
  collection: z.string().trim().max(128).default(""),
  tags: z.array(z.string().trim().min(1).max(60)).max(40).default([]),
  colors: z.array(z.string().trim().min(1).max(40)).min(1).max(30),
  sizes: z.array(z.string().trim().min(1).max(32)).min(1).max(30),
  stock: z.number().int().min(0).max(1_000_000),
  lowStockThreshold: z.number().int().min(0).max(10_000).default(5),
  featured: z.boolean().default(false),
  active: z.boolean().default(true),
  images: z.array(z.object({ url, alt: z.string().trim().min(1).max(240) })).max(20),
  specifications: z.array(z.string().trim().min(1).max(300)).max(50).default([]),
});

export const catalogMutationSchema = z.union([
  z.object({ entity: z.literal("product"), action: z.literal("upsert"), value: productSchema }),
  z.object({ entity: z.literal("product"), action: z.literal("delete"), id }),
  z.object({
    entity: z.literal("category"),
    action: z.literal("upsert"),
    value: z.object({ id, slug: id, title: shortText, description: z.string().trim().max(1000), image: url, active: z.boolean() }),
  }),
  z.object({ entity: z.literal("category"), action: z.literal("delete"), id }),
  z.object({
    entity: z.literal("banner"),
    action: z.literal("upsert"),
    value: z.object({ id, title: shortText, image: url, href: z.string().trim().startsWith("/").max(300), active: z.boolean(), position: z.number().int().min(0).max(1000) }),
  }),
  z.object({ entity: z.literal("banner"), action: z.literal("delete"), id }),
  z.object({
    entity: z.literal("coupon"),
    action: z.literal("upsert"),
    value: z.object({
      id,
      code: z.string().trim().toUpperCase().min(3).max(40).regex(/^[A-Z0-9_-]+$/),
      type: z.enum(["percent", "fixed"]),
      value: z.number().int().positive(),
      minOrderPaise: z.number().int().min(0),
      maxDiscountPaise: z.number().int().min(0).nullable(),
      usageLimit: z.number().int().min(1),
      active: z.boolean(),
      expiresAtIso: z.string().datetime(),
    }),
  }),
  z.object({ entity: z.literal("coupon"), action: z.literal("delete"), id }),
]);

export const orderStatusSchema = z.object({
  orderId: id,
  status: z.enum(["processing", "shipped", "delivered", "cancelled", "refunded"]),
  trackingNumber: z.string().trim().max(100).optional(),
  carrier: z.string().trim().max(100).optional(),
});

export const roleSchema = z.object({
  uid: z.string().trim().min(20).max(128),
  role: z.enum(["customer", "staff", "admin", "soc_admin", "super_admin"]),
});

export const assistantSchema = z.object({ prompt: z.string().trim().min(3).max(600) });
export const visualSearchSchema = z.object({
  storagePath: z.string().trim().min(10).max(500).regex(/^visual-search\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_.-]+$/),
});
export const descriptionSchema = z.object({
  title: shortText,
  category: shortText,
  materials: z.array(shortText).max(20),
  details: z.array(shortText).max(30),
});

export const clientSecurityEventSchema = z.object({
  type: z.enum(["failed-login", "access-denied", "suspicious-input", "payment-client-error"]),
  route: z.string().trim().startsWith("/").max(300),
  accountHash: z.string().trim().max(128).optional(),
  details: z.string().trim().max(500).optional(),
});

export const contactRequestSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  subject: z.string().trim().min(3).max(160),
  message: z.string().trim().min(10).max(3000),
});
