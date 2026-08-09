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
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
    >
      <Link href={`/shop/${product.slug}`} className="group block">
        <div className="relative aspect-[3/4] overflow-hidden rounded-[18px] bg-[#eee9de] dark:bg-[#241b16]">
          <Image
            src={product.images[0].url}
            alt={product.images[0].alt}
            fill
            className="object-cover transition-[transform,opacity] duration-700 ease-luxury group-hover:scale-[1.03] group-hover:opacity-0"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {product.images[1] && <Image src={product.images[1].url} alt={product.images[1].alt} fill className="scale-[1.015] object-cover opacity-0 transition-[transform,opacity] duration-700 ease-luxury group-hover:scale-100 group-hover:opacity-100" sizes="(max-width: 768px) 50vw, 25vw" />}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {discount > 0 && (
            <span className="absolute left-3 top-3 bg-[#f7f3ec] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-ink shadow-sm">
              Save {discount}%
            </span>
          )}

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-[#f7f3ec]/95 text-ink shadow-sm transition-colors duration-300 hover:bg-ink hover:text-cream"
          >
            <Heart
              className={`h-4 w-4 transition-colors ${
                isWishlisted ? "fill-rose-500 text-rose-500" : "text-ink/70 dark:text-cream/70"
              }`}
            />
          </button>

          <div className="absolute bottom-4 left-4 right-4 opacity-0 transition-all duration-500 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
            <span className="flex w-full items-center justify-center rounded-full border border-white/30 bg-[#f7f4ed]/85 px-4 py-3 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#171310] shadow-xl backdrop-blur-xl">
              Discover piece →
            </span>
          </div>
        </div>

        <div className="mt-4 space-y-1 px-0.5">
          <p className="text-[8px] font-semibold uppercase tracking-[0.24em] text-[#b98a3d]">
            {product.category}
          </p>
          <h3 className="font-serif text-[clamp(1.2rem,1.8vw,1.55rem)] font-medium leading-tight text-[#171310] transition-colors group-hover:text-[#b98a3d] dark:text-[#f7f4ed]">
            {product.title}
          </h3>
          <p className="text-xs text-ink/50 dark:text-cream/50 line-clamp-1 font-light">
            {product.subtitle}
          </p>
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-baseline gap-2">
              <p className="text-sm font-semibold text-ink dark:text-cream">
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
    </motion.article>
  );
}
