"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Trash2, ArrowRight, Tag, Truck, ShieldCheck } from "lucide-react";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { useCartStore } from "@/store/use-cart-store";
import { products } from "@/lib/data/catalog";
import { formatCurrency } from "@/lib/utils";

export default function CartPage() {
  const { items, removeItem } = useCartStore();
  const [coupon, setCoupon] = useState("");

  const cartItems = items.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    return { ...item, product };
  }).filter((item) => item.product);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.product?.price ?? 0) * item.quantity, 0);
  const shipping = subtotal >= 15000 ? 0 : 500;
  const total = subtotal + shipping;

  return (
    <>
      <SiteHeader />
      <main className="pt-[72px] bg-cream dark:bg-black min-h-screen transition-colors">
        <section className="container py-12 md:py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold">Shopping Experience</span>
              <h1 className="font-serif text-4xl md:text-6xl text-ink dark:text-cream mt-1">Your Shopping Bag</h1>
            </div>
          </div>

          {cartItems.length === 0 ? (
            <div className="glass-card rounded-[2.5rem] p-16 text-center max-w-xl mx-auto my-12 border border-black/5 dark:border-white/10">
              <p className="font-serif text-3xl text-ink dark:text-cream">Your bag is currently empty</p>
              <p className="mt-3 text-sm text-ink/60 dark:text-cream/60 font-light">Explore our silk sarees, lehengas, and temple jewelry.</p>
              <Link href="/shop" className="mt-8 inline-flex rounded-full bg-gold px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-xl hover:bg-gold-dark transition-all">
                Explore Collections
              </Link>
            </div>
          ) : (
            <div className="grid gap-10 lg:grid-cols-[1fr_400px]">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <motion.div
                    key={item.productId}
                    layout
                    className="glass-card rounded-[2rem] p-6 flex gap-6 items-center border border-black/5 dark:border-white/10"
                  >
                    <div className="relative h-32 w-28 flex-shrink-0 overflow-hidden rounded-2xl">
                      <Image src={item.product!.images[0].url} alt={item.product!.title} fill className="object-cover" />
                    </div>
                    <div className="flex flex-1 flex-col justify-between py-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold">{item.product!.category}</p>
                          <p className="mt-1 font-serif text-2xl text-ink dark:text-cream">{item.product!.title}</p>
                        </div>
                        <button 
                          onClick={() => removeItem(item.productId)} 
                          className="text-ink/30 dark:text-cream/30 hover:text-rose-500 transition-colors p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-ink/60 dark:text-cream/60 font-medium">
                        <span>Size: {item.size}</span>
                        <span>·</span>
                        <span>Quantity: {item.quantity}</span>
                      </div>
                      <p className="mt-2 font-bold text-lg text-ink dark:text-cream">{formatCurrency(item.product!.price * item.quantity)}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="lg:sticky lg:top-[100px] lg:self-start">
                <div className="glass-card rounded-[2.5rem] p-8 border border-black/5 dark:border-white/10 space-y-6">
                  <h2 className="font-serif text-3xl text-ink dark:text-cream">Order Summary</h2>

                  <div className="space-y-3.5 text-sm">
                    <div className="flex justify-between">
                      <span className="text-ink/70 dark:text-cream/70">Subtotal</span>
                      <span className="font-semibold text-ink dark:text-cream">{formatCurrency(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-ink/70 dark:text-cream/70">Insured Shipping</span>
                      <span className="font-semibold text-ink dark:text-cream">{shipping === 0 ? "Complimentary" : formatCurrency(shipping)}</span>
                    </div>
                    {shipping > 0 && (
                      <p className="text-xs text-gold font-medium">Add {formatCurrency(15000 - subtotal)} more for free delivery</p>
                    )}
                  </div>

                  <div className="border-t border-black/5 dark:border-white/10 pt-4" />

                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-ink dark:text-cream">Total</span>
                    <span className="font-serif text-3xl font-bold text-gold">{formatCurrency(total)}</span>
                  </div>

                  <div className="flex gap-2">
                    <input
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      placeholder="Promotional code"
                      className="flex-1 glass-input rounded-full px-4 py-3 text-xs"
                    />
                    <button className="glass-pill px-4 rounded-full text-ink dark:text-cream hover:border-gold hover:text-gold transition-all">
                      <Tag className="h-4 w-4" />
                    </button>
                  </div>

                  <Link
                    href="/checkout"
                    className="flex w-full items-center justify-center gap-3 rounded-full bg-gold py-4 text-xs font-bold uppercase tracking-[0.25em] text-white shadow-xl hover:bg-gold-dark transition-all duration-300"
                  >
                    Checkout Securely
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <div className="flex items-center justify-center gap-2 text-xs text-ink/40 dark:text-cream/40 pt-2 font-medium">
                    <ShieldCheck className="h-4 w-4 text-gold" />
                    <span>Silk Mark Certified & Insured Delivery</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
