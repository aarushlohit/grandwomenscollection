"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, Grid3X3, LayoutList, X } from "lucide-react";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { ProductCard } from "@/components/site/product-card";
import { products, categories } from "@/lib/data/catalog";

const sortOptions = ["Featured", "Price: Low to High", "Price: High to Low", "Newest", "Best Rated"];

export default function ShopPage() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("Featured");
  const [showFilters, setShowFilters] = useState(false);

  let filtered = products;
  if (query) {
    const q = query.toLowerCase();
    filtered = filtered.filter(
      (p) => p.title.toLowerCase().includes(q) || p.subtitle.toLowerCase().includes(q) || p.tags.some((t) => t.includes(q))
    );
  }
  if (selectedCategory) {
    filtered = filtered.filter((p) => p.category === selectedCategory);
  }
  if (sortBy === "Price: Low to High") filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sortBy === "Price: High to Low") filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sortBy === "Best Rated") filtered = [...filtered].sort((a, b) => b.rating - a.rating);

  return (
    <>
      <SiteHeader />
      <main className="pt-[72px]">
        <section className="relative overflow-hidden bg-ink py-20 dark:bg-[#0a0a0a]">
          <div className="absolute inset-0 opacity-40">
            <Image
              src="/images/collection_sarees_1785319884762.png"
              alt="Kanchipuram Silk Sarees"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <div className="container relative z-10 py-12 text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-gold drop-shadow-md">The Heritage Collection</p>
            <h1 className="mt-4 font-serif text-5xl md:text-7xl text-white drop-shadow-lg">Shop</h1>
            <p className="mx-auto mt-4 max-w-md text-[15px] text-white/90 drop-shadow-md">
              Discover pure Kanchipuram silks and handcrafted traditional wear.
            </p>
          </div>
        </section>

        <section className="container py-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="relative max-w-md flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/30" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, occasion, or style..."
                className="w-full rounded-full border border-ink/10 bg-cream/50 py-3 pl-11 pr-4 text-sm text-ink outline-none transition-colors focus:border-gold dark:border-cream/10 dark:bg-cream/5 dark:text-cream"
              />
              {query && (
                <button onClick={() => setQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-ink/30">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                {[null, ...categories.slice(0, 5)].map((cat) => (
                  <button
                    key={cat?.id ?? "all"}
                    onClick={() => setSelectedCategory(cat?.slug ?? null)}
                    className={`whitespace-nowrap rounded-full px-4 py-2 text-xs transition-colors ${
                      selectedCategory === cat?.slug
                        ? "bg-ink text-cream dark:bg-cream dark:text-ink"
                        : "border border-ink/10 text-ink/50 hover:border-ink/30 dark:border-cream/10 dark:text-cream/50"
                    }`}
                  >
                    {cat?.title ?? "All"}
                  </button>
                ))}
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-full border border-ink/10 bg-transparent px-4 py-2 text-xs text-ink outline-none dark:border-cream/10 dark:text-cream"
              >
                {sortOptions.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-20 text-center">
              <p className="font-serif text-3xl text-ink/30 dark:text-cream/30">No pieces found</p>
              <p className="mt-2 text-sm text-ink/40 dark:text-cream/40">Try adjusting your filters</p>
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
