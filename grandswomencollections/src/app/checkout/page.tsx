"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, CreditCard, MapPin, PartyPopper, Truck } from "lucide-react";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { useCartStore } from "@/store/use-cart-store";
import { products } from "@/lib/data/catalog";
import { formatCurrency } from "@/lib/utils";
import { backend } from "@/lib/firebase/backend";

interface RazorpaySuccess {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface RazorpayCheckout {
  open: () => void;
  on: (event: "payment.failed", callback: (response: { error?: { description?: string } }) => void) => void;
}

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => RazorpayCheckout;
  }
}

const steps = [
  { id: "shipping", label: "Shipping", icon: Truck },
  { id: "address", label: "Address", icon: MapPin },
  { id: "payment", label: "Payment", icon: CreditCard },
  { id: "success", label: "Confirmation", icon: PartyPopper },
];

const initialAddress = { name: "", phone: "", line1: "", line2: "", city: "", state: "", postalCode: "", country: "IN" as const };

function loadRazorpay(): Promise<void> {
  if (window.Razorpay) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("Razorpay checkout failed to load.")), { once: true });
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Razorpay checkout failed to load."));
    document.head.appendChild(script);
  });
}

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [address, setAddress] = useState(initialAddress);
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");
  const [confirmedOrderId, setConfirmedOrderId] = useState("");
  const [checkoutRequestId] = useState(() => crypto.randomUUID());
  const { items, clearCart } = useCartStore();
  const cartItems = items.map((item) => ({ ...item, product: products.find((product) => product.id === item.productId) })).filter((item) => item.product);
  const subtotal = cartItems.reduce((sum, item) => sum + (item.product?.price ?? 0) * item.quantity, 0);
  const addressIsValid = address.name.trim().length >= 1 && /^\+?[0-9]{10,15}$/.test(address.phone.trim()) && address.line1.trim().length >= 3 && address.city.trim().length >= 2 && address.state.trim().length >= 2 && /^[1-9][0-9]{5}$/.test(address.postalCode.trim());

  async function beginSecurePayment() {
    if (!cartItems.length) return setCheckoutError("Your bag is empty.");
    if (!addressIsValid) {
      setCurrentStep(1);
      return setCheckoutError("Complete the delivery address before payment.");
    }
    setIsProcessing(true);
    setCheckoutError("");
    try {
      await loadRazorpay();
      const result = await backend.createCheckoutOrder({
        requestId: checkoutRequestId,
        items: items.map((item) => ({ productId: item.productId, quantity: item.quantity, size: item.size, color: item.color })),
        shippingAddress: Object.fromEntries(Object.entries(address).map(([key, value]) => [key, value.trim()])),
      });
      const order = result.data as { internalOrderId: string; razorpayOrderId: string; razorpayKeyId: string; amountPaise: number; currency: string };
      if (!window.Razorpay) throw new Error("Razorpay checkout is unavailable.");
      const checkout = new window.Razorpay({
        key: order.razorpayKeyId,
        amount: order.amountPaise,
        currency: order.currency,
        name: "Grand Women's Collections",
        description: "Secure boutique checkout",
        order_id: order.razorpayOrderId,
        prefill: { name: address.name, contact: address.phone },
        theme: { color: "#241B16" },
        modal: { ondismiss: () => setIsProcessing(false) },
        handler: async (payment: RazorpaySuccess) => {
          try {
            await backend.verifyPayment({ internalOrderId: order.internalOrderId, razorpayOrderId: payment.razorpay_order_id, razorpayPaymentId: payment.razorpay_payment_id, signature: payment.razorpay_signature });
            setConfirmedOrderId(order.internalOrderId);
            clearCart();
            setCurrentStep(3);
          } catch {
            setCheckoutError("Payment was received but verification is pending. Do not retry; contact support with your payment ID.");
          } finally {
            setIsProcessing(false);
          }
        },
      });
      checkout.on("payment.failed", async (failure) => {
        setIsProcessing(false);
        setCheckoutError(failure.error?.description ?? "Payment was not completed. No verified order was created.");
        try {
          await backend.recordClientSecurityEvent({ type: "payment-client-error", route: "/checkout", details: "Razorpay reported a client payment failure." });
        } catch {
          // The visible payment failure remains authoritative when telemetry is unavailable.
        }
      });
      checkout.open();
    } catch (error) {
      const code = typeof error === "object" && error && "code" in error ? String(error.code) : "";
      setCheckoutError(code.includes("unauthenticated") ? "Sign in before continuing to secure payment." : "Secure checkout is temporarily unavailable. Please try again.");
      setIsProcessing(false);
    }
  }

  return <><SiteHeader /><main className="min-h-screen bg-[#f7f4ed] pt-28 text-[#171310] dark:bg-[#171310] dark:text-[#f7f4ed]"><section className="mx-auto max-w-[1320px] px-5 pb-[clamp(6rem,10vw,10rem)] pt-8 md:px-8">
    <div className="max-w-3xl"><span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#b98a3d]">Private checkout</span><h1 className="mt-4 font-serif text-[clamp(4rem,8vw,8rem)] font-light leading-[0.84] tracking-[-0.045em]">Make it yours.</h1></div>
    <div className="mt-10 flex items-center gap-1 overflow-x-auto border-y border-[#281e16]/12 py-4 dark:border-white/12">{steps.map((step, index) => <div key={step.id} className="flex items-center"><div className={`flex min-h-10 items-center gap-2 rounded-full px-4 text-[9px] font-semibold uppercase tracking-[0.12em] ${index <= currentStep ? "bg-[#241b16] text-[#f7f4ed] dark:bg-[#f7f4ed] dark:text-[#171310]" : "text-[#716b63]"}`}>{index < currentStep ? <Check className="h-3.5 w-3.5" /> : <step.icon className="h-3.5 w-3.5" />}<span className="hidden sm:block">{step.label}</span></div>{index < steps.length - 1 && <div className={`mx-2 h-px w-8 ${index < currentStep ? "bg-[#b98a3d]" : "bg-black/10 dark:bg-white/10"}`} />}</div>)}</div>
    <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_380px]"><div className="border-t border-[#281e16]/12 pt-8 dark:border-white/12 md:pt-10"><AnimatePresence mode="wait">
      {currentStep === 0 && <Step key="shipping"><h2 className="font-serif text-4xl font-light">Shipping method</h2><div className="mt-6 flex items-center justify-between rounded-xl border border-[#b98a3d] bg-[#b98a3d]/5 p-5"><div className="flex items-center gap-3.5"><div className="h-4 w-4 rounded-full border-[5px] border-[#b98a3d]" /><div><p className="text-sm font-semibold">Insured Standard Delivery</p><p className="text-xs text-[#716b63]">5–7 business days</p></div></div><span className="text-xs font-semibold text-[#b98a3d]">Complimentary</span></div></Step>}
      {currentStep === 1 && <Step key="address"><h2 className="font-serif text-4xl font-light">Delivery address</h2><div className="mt-6 grid gap-4 sm:grid-cols-2">{([ ["name", "Full Name"], ["phone", "Phone Number"], ["line1", "Address Line 1"], ["line2", "Address Line 2"], ["city", "City"], ["state", "State"], ["postalCode", "Pincode"] ] as const).map(([key, label]) => <div key={key} className={key === "line1" || key === "line2" ? "sm:col-span-2" : ""}><label htmlFor={`checkout-${key}`} className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.18em] text-[#716b63]">{label}</label><input id={`checkout-${key}`} required value={address[key]} onChange={(event) => setAddress((current) => ({ ...current, [key]: event.target.value }))} autoComplete={key === "name" ? "name" : key === "phone" ? "tel" : key === "postalCode" ? "postal-code" : key === "line1" ? "address-line1" : key === "line2" ? "address-line2" : key === "city" ? "address-level2" : "address-level1"} inputMode={key === "phone" || key === "postalCode" ? "numeric" : undefined} className="w-full rounded-lg border border-[#281e16]/14 bg-transparent px-4 py-3.5 text-base outline-none focus:border-[#b98a3d] dark:border-white/15" /></div>)}</div></Step>}
      {currentStep === 2 && <Step key="payment"><h2 className="font-serif text-4xl font-light">Secure payment</h2><p className="mt-3 max-w-xl text-sm leading-6 text-[#716b63]">Your total is calculated again by our Firebase backend. Card, UPI, NetBanking and wallet details are entered only inside Razorpay&apos;s secure checkout—we never collect or store them.</p><div className="mt-7 border-y border-[#281e16]/12 py-5 text-[10px] uppercase tracking-[0.16em] text-[#716b63] dark:border-white/12">Server-priced · Inventory reserved · Signature verified</div></Step>}
      {currentStep === 3 && <motion.div key="success" initial={{ opacity: 0, transform: "scale(.97)" }} animate={{ opacity: 1, transform: "scale(1)" }} className="py-10 text-center"><div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-700/10 text-emerald-700"><PartyPopper className="h-10 w-10" /></div><h2 className="mt-6 font-serif text-4xl">Order confirmed.</h2><p className="mt-3 text-sm text-[#716b63]">Payment was verified for order <span className="font-semibold text-[#171310] dark:text-[#f7f4ed]">{confirmedOrderId}</span>.</p><Link href="/orders" className="mt-8 inline-flex min-h-12 items-center rounded-full bg-[#241b16] px-8 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#f7f4ed]">View order</Link></motion.div>}
    </AnimatePresence>
    {checkoutError && <div role="alert" className="mt-7 border-y border-red-900/15 bg-red-900/5 px-4 py-4 text-sm text-red-900 dark:text-red-200">{checkoutError}{checkoutError.startsWith("Sign in") && <Link href="/login" className="ml-2 font-semibold underline underline-offset-4">Login</Link>}</div>}
    {currentStep < 3 && <div className="mt-10 flex items-center justify-between border-t border-black/5 pt-6 dark:border-white/10">{currentStep > 0 ? <button onClick={() => { setCheckoutError(""); setCurrentStep((step) => step - 1); }} className="flex min-h-11 items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#716b63]"><ArrowLeft className="h-4 w-4" /> Previous</button> : <div />}<button disabled={isProcessing || (currentStep === 1 && !addressIsValid)} onClick={currentStep === 2 ? beginSecurePayment : () => { setCheckoutError(""); setCurrentStep((step) => Math.min(step + 1, 2)); }} className="flex min-h-14 items-center gap-3 rounded-full bg-[#241b16] px-8 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#f7f4ed] hover:bg-[#b98a3d] disabled:cursor-not-allowed disabled:opacity-45 dark:bg-[#f7f4ed] dark:text-[#171310]">{isProcessing ? "Opening secure payment…" : currentStep === 2 ? "Pay securely" : "Continue"}<ArrowRight className="h-4 w-4" /></button></div>}
    </div><OrderSummary cartItems={cartItems} subtotal={subtotal} /></div>
  </section></main><SiteFooter /></>;
}

function Step({ children }: { children: React.ReactNode }) {
  return <motion.div initial={{ opacity: 0, transform: "translateX(16px)" }} animate={{ opacity: 1, transform: "translateX(0)" }} exit={{ opacity: 0, transform: "translateX(-12px)" }}>{children}</motion.div>;
}

function OrderSummary({ cartItems, subtotal }: { cartItems: Array<{ productId: string; quantity: number; product: (typeof products)[number] | undefined }>; subtotal: number }) {
  return <aside className="lg:sticky lg:top-[100px] lg:self-start"><div className="border-y border-[#281e16]/12 py-7 dark:border-white/12"><h3 className="font-serif text-3xl font-light">Your selection</h3><div className="mt-6 space-y-4">{cartItems.length ? cartItems.map((item) => <div key={item.productId} className="flex items-center gap-4"><div className="relative h-16 w-14 overflow-hidden rounded-xl"><Image src={item.product!.images[0].url} alt={item.product!.title} fill className="object-cover" /></div><div className="flex-1"><p className="text-sm font-semibold">{item.product!.title}</p><p className="text-xs text-[#716b63]">Qty: {item.quantity}</p></div><p className="text-sm font-semibold text-[#b98a3d]">{formatCurrency(item.product!.price * item.quantity)}</p></div>) : <p className="text-sm text-[#716b63]">Your bag is empty.</p>}</div><div className="my-6 border-t border-black/5 dark:border-white/10" /><div className="flex justify-between text-sm"><span className="text-[#716b63]">Subtotal</span><span className="font-semibold">{formatCurrency(subtotal)}</span></div></div></aside>;
}
