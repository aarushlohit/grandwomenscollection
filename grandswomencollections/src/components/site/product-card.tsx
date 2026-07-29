"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Star } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useWishlistStore } from "@/store/use-wishlist-store";
import type { Product } from "@/types";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const isWishlisted = useWishlistStore((s) => s.productIds.includes(product.id));
  const discount = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
    >
      <Link href={`/shop/${product.slug}`} className="group block">
        <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] glass-card border border-black/5 dark:border-white/10 shadow-lg">
          <Image
            src={product.images[0].url}
            alt={product.images[0].alt}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {discount > 0 && (
            <span className="absolute left-4 top-4 glass-pill px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gold">
              -{discount}%
            </span>
          )}

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full glass-pill transition-all duration-300 hover:scale-110"
          >
            <Heart
              className={`h-4 w-4 transition-colors ${
                isWishlisted ? "fill-rose-500 text-rose-500" : "text-ink/70 dark:text-cream/70"
              }`}
            />
          </button>

          <div className="absolute bottom-4 left-4 right-4 opacity-0 transition-all duration-500 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
            <span className="w-full justify-center flex items-center rounded-full bg-white/90 dark:bg-black/90 px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-ink dark:text-cream backdrop-blur-md shadow-xl">
              View Product
            </span>
          </div>
        </div>

        <div className="mt-4 space-y-1.5 px-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold">
            {product.category}
          </p>
          <h3 className="font-serif text-xl text-ink transition-colors group-hover:text-gold dark:text-cream font-medium">
            {product.title}
          </h3>
          <p className="text-xs text-ink/50 dark:text-cream/50 line-clamp-1 font-light">
            {product.subtitle}
          </p>
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-baseline gap-2">
              <p className="text-lg font-bold text-ink dark:text-cream">
                {formatCurrency(product.price)}
              </p>
              {product.compareAtPrice && (
                <p className="text-xs text-ink/40 line-through dark:text-cream/40">
                  {formatCurrency(product.compareAtPrice)}
                </p>
              )}
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-gold text-gold" />
              <span className="text-xs font-semibold text-ink/70 dark:text-cream/70">
                {product.rating}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
