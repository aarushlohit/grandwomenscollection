"use client";

import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { ProductCard } from "@/components/site/product-card";
import { useWishlistStore } from "@/store/use-wishlist-store";
import { products } from "@/lib/data/catalog";

export default function WishlistPage() {
  const productIds = useWishlistStore((state) => state.productIds);
  const saved = products.filter((product) => productIds.includes(product.id));
  return <><SiteHeader /><main className="min-h-[80svh] bg-[#f7f4ed] pt-28 text-[#171310] dark:bg-[#171310] dark:text-[#f7f4ed]"><section className="mx-auto max-w-[1480px] px-5 pb-[clamp(6rem,10vw,10rem)] pt-8 md:px-8 xl:px-10"><p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#b98a3d]">Your private edit</p><div className="mt-4 flex items-end justify-between border-b border-[#281e16]/12 pb-9 dark:border-white/12"><h1 className="font-serif text-[clamp(4rem,8vw,8rem)] font-light leading-none tracking-[-0.045em]">Saved pieces.</h1><span className="hidden pb-2 text-[10px] uppercase tracking-[0.16em] text-[#716b63] sm:block">{saved.length} selected</span></div>{saved.length === 0 ? <div className="py-[clamp(6rem,12vw,11rem)] text-center"><Heart className="mx-auto h-6 w-6 text-[#b98a3d]" strokeWidth={1.3} /><p className="mt-6 font-serif text-[clamp(3rem,6vw,6rem)] font-light">Your edit is waiting.</p><p className="mx-auto mt-5 max-w-sm text-sm leading-7 text-[#716b63] dark:text-[#eee9de]/55">Save the pieces you want to return to.</p><Link href="/shop" className="mt-9 inline-flex min-h-12 items-center gap-3 rounded-full bg-[#241b16] px-7 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#f7f4ed]">Discover pieces <ArrowRight className="h-4 w-4" /></Link></div> : <div className="mt-12 grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-3 md:gap-x-6 xl:grid-cols-4">{saved.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}</div>}</section></main><SiteFooter /></>;
}
