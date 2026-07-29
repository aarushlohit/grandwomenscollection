"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Check, CreditCard, Truck, MapPin, PartyPopper, ArrowRight, ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { useCartStore } from "@/store/use-cart-store";
import { products } from "@/lib/data/catalog";
import { formatCurrency } from "@/lib/utils";

const steps = [
  { id: "shipping", label: "Shipping", icon: Truck },
  { id: "address", label: "Address", icon: MapPin },
  { id: "payment", label: "Payment", icon: CreditCard },
  { id: "success", label: "Confirmation", icon: PartyPopper }
];

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const { items } = useCartStore();
  const cartItems = items.map((item) => ({
    ...item,
    product: products.find((p) => p.id === item.productId)
  })).filter((item) => item.product);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.product?.price ?? 0) * item.quantity, 0);

  const nextStep = () => setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 0));

  return (
    <>
      <SiteHeader />
      <main className="pt-[72px] bg-cream dark:bg-black min-h-screen transition-colors">
        <section className="container py-12 md:py-16">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold">Exclusive Checkout</span>
            <h1 className="font-serif text-4xl md:text-6xl text-ink dark:text-cream mt-1">Place Your Order</h1>
          </div>

          <div className="mt-10 flex items-center justify-center gap-2">
            {steps.map((step, i) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                  i <= currentStep ? "bg-gold text-white shadow-lg shadow-gold/20" : "glass-pill text-ink/40 dark:text-cream/40"
                }`}>
                  {i < currentStep ? <Check className="h-3.5 w-3.5" /> : <step.icon className="h-3.5 w-3.5" />}
                  <span className="hidden sm:block">{step.label}</span>
                </div>
                {i < steps.length - 1 && <div className={`mx-2 h-0.5 w-8 rounded-full ${i < currentStep ? "bg-gold" : "bg-black/10 dark:bg-white/10"}`} />}
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_380px]">
            <div className="glass-card rounded-[2.5rem] p-8 md:p-10 border border-black/5 dark:border-white/10">
              <AnimatePresence mode="wait">
                {currentStep === 0 && (
                  <motion.div key="shipping" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <h2 className="font-serif text-3xl text-ink dark:text-cream">Shipping Method</h2>
                    <div className="mt-6 space-y-3">
                      {[
                        { label: "Insured Standard Delivery", time: "5-7 business days", price: "Free above ₹15,000" },
                        { label: "Priority Express Dispatch", time: "2-3 business days", price: "₹500" },
                        { label: "VIP Atelier Same Day Delivery", time: "Next business day", price: "₹1,000" }
                      ].map((option, i) => (
                        <label key={option.label} className={`flex cursor-pointer items-center justify-between rounded-2xl border p-5 transition-all ${i === 0 ? "border-gold bg-gold/10" : "border-black/5 dark:border-white/10 glass-card"}`}>
                          <div className="flex items-center gap-3.5">
                            <div className={`h-4 w-4 rounded-full border-2 ${i === 0 ? "border-gold" : "border-ink/20 dark:border-cream/20"}`}>
                              {i === 0 && <div className="mx-auto mt-0.5 h-2 w-2 rounded-full bg-gold" />}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-ink dark:text-cream">{option.label}</p>
                              <p className="text-xs text-ink/50 dark:text-cream/50">{option.time}</p>
                            </div>
                          </div>
                          <span className="text-xs font-bold text-gold">{option.price}</span>
                        </label>
                      ))}
                    </div>
                  </motion.div>
                )}

                {currentStep === 1 && (
                  <motion.div key="address" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <h2 className="font-serif text-3xl text-ink dark:text-cream">Delivery Address</h2>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      {["Full Name", "Phone Number", "Address Line 1", "Address Line 2", "City", "State", "Pincode", "Country"].map((field) => (
                        <div key={field} className={field === "Address Line 1" || field === "Address Line 2" ? "sm:col-span-2" : ""}>
                          <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-gold">{field}</label>
                          <input className="w-full rounded-2xl glass-input px-4 py-3.5 text-sm" placeholder={field} />
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div key="payment" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <h2 className="font-serif text-3xl text-ink dark:text-cream">Payment Details</h2>
                    <p className="mt-2 text-xs text-ink/60 dark:text-cream/60">Secure 256-bit encrypted checkout via Razorpay & NetBanking.</p>
                    <div className="mt-6 grid gap-4">
                      {["Card Number", "Expiry Date", "CVV", "Name on Card"].map((field) => (
                        <div key={field}>
                          <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-gold">{field}</label>
                          <input className="w-full rounded-2xl glass-input px-4 py-3.5 text-sm" placeholder={field} />
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {currentStep === 3 && (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-10 text-center">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                      <PartyPopper className="h-10 w-10" />
                    </div>
                    <h2 className="mt-6 font-serif text-4xl text-ink dark:text-cream">Order Confirmed!</h2>
                    <p className="mt-3 text-sm text-ink/60 dark:text-cream/60">Thank you for choosing GRAND. Your order #GWC-{Math.floor(Math.random() * 90000 + 10000)} is being handcrafted.</p>
                    <Link href="/shop" className="mt-8 inline-flex rounded-full bg-gold px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-xl hover:bg-gold-dark transition-all">
                      Continue Shopping
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>

              {currentStep < 3 && (
                <div className="mt-10 flex justify-between items-center pt-6 border-t border-black/5 dark:border-white/10">
                  {currentStep > 0 ? (
                    <button onClick={prevStep} className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink/60 hover:text-ink dark:text-cream/60 dark:hover:text-cream">
                      <ArrowLeft className="h-4 w-4" /> Previous
                    </button>
                  ) : <div />}
                  <button onClick={nextStep} className="flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-xl hover:bg-gold-dark transition-all">
                    {currentStep === 2 ? "Place Order" : "Continue"} <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            <div className="lg:sticky lg:top-[100px] lg:self-start">
              <div className="glass-card rounded-[2.5rem] p-8 border border-black/5 dark:border-white/10">
                <h3 className="font-serif text-2xl text-ink dark:text-cream">Bag Summary</h3>
                <div className="mt-6 space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.productId} className="flex items-center gap-4">
                      <div className="relative h-16 w-14 overflow-hidden rounded-xl">
                        <Image src={item.product!.images[0].url} alt={item.product!.title} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-ink dark:text-cream">{item.product!.title}</p>
                        <p className="text-xs text-ink/50 dark:text-cream/50">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-bold text-gold">{formatCurrency(item.product!.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>
                <div className="my-6 border-t border-black/5 dark:border-white/10" />
                <div className="flex justify-between text-sm">
                  <span className="text-ink/60 dark:text-cream/60">Subtotal</span>
                  <span className="font-bold text-ink dark:text-cream">{formatCurrency(subtotal)}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
