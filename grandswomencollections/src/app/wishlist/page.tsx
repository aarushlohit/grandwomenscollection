"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Trash2 } from "lucide-react";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { useWishlistStore } from "@/store/use-wishlist-store";
import { products } from "@/lib/data/catalog";
import { formatCurrency } from "@/lib/utils";

export default function WishlistPage() {
  const { productIds, toggle } = useWishlistStore();
  const wishlistProducts = products.filter((p) => productIds.includes(p.id));

  return (
    <>
      <SiteHeader />
      <main className="pt-[72px] bg-cream dark:bg-black min-h-screen transition-colors">
        <section className="container py-12 md:py-16">
          <div className="mb-8">
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold">Saved Favorites</span>
            <h1 className="font-serif text-4xl md:text-6xl text-ink dark:text-cream mt-1">Your Curated Wishlist</h1>
          </div>

          {wishlistProducts.length === 0 ? (
            <div className="glass-card rounded-[2.5rem] p-16 text-center max-w-xl mx-auto my-12 border border-black/5 dark:border-white/10">
              <Heart className="mx-auto h-12 w-12 text-gold opacity-50" />
              <p className="mt-4 font-serif text-3xl text-ink dark:text-cream">Your wishlist is empty</p>
              <p className="mt-2 text-sm text-ink/60 dark:text-cream/60 font-light">Explore our silk drapes and jewelry to curate your saved pieces.</p>
              <Link href="/shop" className="mt-8 inline-flex rounded-full bg-gold px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-xl hover:bg-gold-dark transition-all">
                Explore Collection
              </Link>
            </div>
          ) : (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {wishlistProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link href={`/shop/${product.slug}`} className="group block">
                    <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] glass-card border border-black/5 dark:border-white/10 shadow-lg">
                      <Image src={product.images[0].url} alt={product.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                      <button
                        onClick={(e) => { e.preventDefault(); toggle(product.id); }}
                        className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full glass-pill hover:bg-rose-500 hover:text-white transition-all"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-4 px-2">
                      <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold">{product.category}</p>
                      <p className="font-serif text-xl text-ink dark:text-cream font-medium group-hover:text-gold transition-colors">{product.title}</p>
                      <p className="text-sm font-bold text-ink dark:text-cream mt-1">{formatCurrency(product.price)}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
