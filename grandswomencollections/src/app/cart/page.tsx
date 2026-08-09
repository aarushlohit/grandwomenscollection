"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Trash2 } from "lucide-react";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { useCartStore } from "@/store/use-cart-store";
import { products } from "@/lib/data/catalog";
import { formatCurrency } from "@/lib/utils";

export default function CartPage() {
  const { items, removeItem } = useCartStore();
  const [coupon, setCoupon] = useState("");
  const cartItems = items.map((item) => ({ ...item, product: products.find((product) => product.id === item.productId) })).filter((item) => item.product);
  const subtotal = cartItems.reduce((sum, item) => sum + (item.product?.price ?? 0) * item.quantity, 0);
  const shipping = subtotal >= 15000 ? 0 : 500;
  const total = subtotal + shipping;

  return <><SiteHeader /><main className="min-h-[80svh] bg-[#f7f4ed] pt-28 text-[#171310] dark:bg-[#171310] dark:text-[#f7f4ed]"><section className="mx-auto max-w-[1480px] px-5 pb-[clamp(6rem,10vw,10rem)] pt-8 md:px-8 xl:px-10">
    <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#b98a3d]">The final edit</p><div className="mt-4 flex items-end justify-between border-b border-[#281e16]/12 pb-9 dark:border-white/12"><h1 className="font-serif text-[clamp(4rem,8vw,8rem)] font-light leading-none tracking-[-0.045em]">Your bag.</h1><p className="hidden pb-2 text-[10px] uppercase tracking-[0.16em] text-[#716b63] sm:block">{cartItems.length} {cartItems.length === 1 ? "piece" : "pieces"}</p></div>
    {cartItems.length === 0 ? <div className="py-[clamp(6rem,12vw,11rem)] text-center"><p className="font-serif text-[clamp(3rem,6vw,6rem)] font-light">Nothing chosen yet.</p><p className="mx-auto mt-5 max-w-sm text-sm leading-7 text-[#716b63] dark:text-[#eee9de]/55">Your considered pieces will wait here.</p><Link href="/shop" className="mt-9 inline-flex min-h-12 items-center gap-3 rounded-full bg-[#241b16] px-7 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#f7f4ed]">Discover the collection <ArrowRight className="h-4 w-4" /></Link></div> : <div className="mt-10 grid gap-16 lg:grid-cols-[minmax(0,1fr)_390px]">
      <div className="divide-y divide-[#281e16]/12 dark:divide-white/12">{cartItems.map((item) => <article key={`${item.productId}-${item.size}-${item.color}`} className="grid grid-cols-[110px_1fr] gap-5 py-6 first:pt-0 sm:grid-cols-[170px_1fr] sm:gap-8"><Link href={`/shop/${item.product!.slug}`} className="relative aspect-[3/4] overflow-hidden rounded-[16px]"><Image src={item.product!.images[0].url} alt={item.product!.title} fill className="object-cover" sizes="170px" /></Link><div className="flex min-w-0 flex-col py-1"><div className="flex items-start justify-between gap-3"><div><p className="text-[8px] font-semibold uppercase tracking-[0.24em] text-[#b98a3d]">{item.product!.category}</p><Link href={`/shop/${item.product!.slug}`} className="mt-2 block font-serif text-[clamp(1.6rem,3vw,2.5rem)] font-light leading-none">{item.product!.title}</Link></div><button onClick={() => removeItem(item.productId)} aria-label={`Remove ${item.product!.title}`} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#281e16]/10 text-[#716b63] hover:border-[#b98a3d] hover:text-[#b98a3d] dark:border-white/10"><Trash2 className="h-4 w-4" /></button></div><p className="mt-4 text-[10px] text-[#716b63] dark:text-[#eee9de]/48">{item.color} · {item.size} · Qty {item.quantity}</p><p className="mt-auto pt-5 text-sm font-semibold">{formatCurrency(item.product!.price * item.quantity)}</p></div></article>)}</div>
      <aside className="lg:sticky lg:top-28 lg:self-start"><h2 className="font-serif text-4xl font-light">Order summary</h2><dl className="mt-7 space-y-4 border-y border-[#281e16]/12 py-6 text-sm dark:border-white/12"><div className="flex justify-between"><dt className="text-[#716b63] dark:text-[#eee9de]/48">Subtotal</dt><dd>{formatCurrency(subtotal)}</dd></div><div className="flex justify-between"><dt className="text-[#716b63] dark:text-[#eee9de]/48">Insured shipping</dt><dd>{shipping === 0 ? "Complimentary" : formatCurrency(shipping)}</dd></div></dl>{shipping > 0 && <p className="mt-4 text-[10px] leading-5 text-[#b98a3d]">Add {formatCurrency(15000 - subtotal)} more for complimentary delivery.</p>}<div className="mt-6 flex items-baseline justify-between"><span className="text-[10px] font-semibold uppercase tracking-[0.16em]">Total</span><span className="font-serif text-3xl">{formatCurrency(total)}</span></div><div className="mt-7 flex border-b border-[#281e16]/20 dark:border-white/20"><input value={coupon} onChange={(event) => setCoupon(event.target.value)} placeholder="Promotional code" className="min-h-12 min-w-0 flex-1 bg-transparent text-sm outline-none" /><button className="min-h-12 text-[9px] font-semibold uppercase tracking-[0.16em]">Apply</button></div><Link href="/checkout" className="mt-7 flex min-h-14 w-full items-center justify-center gap-3 rounded-full bg-[#241b16] text-[10px] font-semibold uppercase tracking-[0.2em] text-[#f7f4ed] transition-colors hover:bg-[#b98a3d] dark:bg-[#f7f4ed] dark:text-[#171310]">Continue securely <ArrowRight className="h-4 w-4" /></Link><p className="mt-5 flex items-center justify-center gap-2 text-[9px] text-[#716b63] dark:text-[#eee9de]/38"><ShieldCheck className="h-4 w-4 text-[#b98a3d]" /> Encrypted payment · insured delivery</p></aside>
    </div>}
  </section></main><SiteFooter /></>;
}
