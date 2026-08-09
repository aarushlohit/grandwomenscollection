"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, Search, SlidersHorizontal, X } from "lucide-react";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { ProductCard } from "@/components/site/product-card";
import { products, categories } from "@/lib/data/catalog";

const sortOptions = ["Featured", "Price: Low to High", "Price: High to Low", "Newest", "Best Rated"];

export default function ShopPage() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("Featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  let filtered = products;
  if (query) {
    const q = query.toLowerCase();
    filtered = filtered.filter((product) => product.title.toLowerCase().includes(q) || product.subtitle.toLowerCase().includes(q) || product.tags.some((tag) => tag.includes(q)));
  }
  if (selectedCategory) filtered = filtered.filter((product) => product.category === selectedCategory);
  if (sortBy === "Price: Low to High") filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sortBy === "Price: High to Low") filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sortBy === "Best Rated") filtered = [...filtered].sort((a, b) => b.rating - a.rating);

  return (
    <>
      <SiteHeader />
      <main className="pt-20">
        <section className="relative min-h-[62svh] overflow-hidden bg-ink">
          <Image src="/images/collection_sarees_1785319884762.png" alt="Handwoven silk collection" fill priority className="object-cover opacity-70" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/25 to-transparent" />
          <div className="container relative z-10 flex min-h-[62svh] items-end py-14 md:py-20">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.38em] text-gold-light">The Grand edit · 2026</p>
              <h1 className="mt-5 max-w-4xl font-serif text-[clamp(4.5rem,11vw,10rem)] font-light leading-[0.76] tracking-[-0.05em] text-[#f7f4ed]">The Grand<br /><em className="font-light">wardrobe.</em></h1>
              <p className="mt-7 max-w-md text-sm leading-6 text-[#f7f4ed]/78 md:text-base">Pure silks, considered tailoring and ceremonial pieces selected for modern Indian wardrobes.</p>
            </div>
          </div>
        </section>

        <section className="container py-14 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[250px_minmax(0,1fr)] xl:gap-16">
            <aside className="hidden lg:block">
              <div className="sticky top-28">
                <p className="text-[9px] font-semibold uppercase tracking-[0.26em] text-[#b98a3d]">Explore the edit</p>
                <div className="mt-6 border-t border-[#171310]/10">
                  {[null, ...categories].map((category) => <button key={category?.id ?? "all"} onClick={() => setSelectedCategory(category?.slug ?? null)} className={`flex min-h-12 w-full items-center justify-between border-b border-[#171310]/10 text-left text-sm transition-colors ${selectedCategory === category?.slug ? "font-medium text-[#171310]" : "text-[#716b63] hover:text-[#171310]"}`}><span>{category?.title ?? "View all"}</span>{selectedCategory === category?.slug && <span className="h-1.5 w-1.5 rounded-full bg-[#b98a3d]" />}</button>)}
                </div>
                <p className="mt-8 max-w-[190px] font-serif text-2xl font-light leading-tight text-[#171310]/70">Objects of craft, chosen slowly.</p>
              </div>
            </aside>

            <div>
              <div className="border-b border-[#171310]/12 pb-6">
                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                  <div className="relative w-full max-w-2xl">
                    <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.22em] text-[#716b63]">Search the wardrobe</p>
                    <Search className="pointer-events-none absolute bottom-3 left-0 h-5 w-5 text-[#171310]" strokeWidth={1.3} />
                    <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Saree, bridal, silk…" className="h-12 w-full border-b border-[#171310]/20 bg-transparent pl-8 pr-10 font-serif text-2xl text-[#171310] outline-none transition-colors placeholder:text-[#171310]/25 focus:border-[#b98a3d] md:text-3xl" />
                    {query && <button onClick={() => setQuery("")} aria-label="Clear search" className="absolute bottom-0 right-0 flex h-12 w-11 items-center justify-center text-[#716b63]"><X className="h-4 w-4" /></button>}
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <button onClick={() => setFiltersOpen((open) => !open)} className="flex min-h-11 items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] lg:hidden"><SlidersHorizontal className="h-4 w-4" /> Filter</button>
                    <div className="relative">
                      <select value={sortBy} onChange={(event) => setSortBy(event.target.value)} aria-label="Sort products" className="min-h-11 appearance-none bg-transparent pl-3 pr-8 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#171310] outline-none">
                        {sortOptions.map((option) => <option key={option}>{option}</option>)}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-1 top-1/2 h-3.5 w-3.5 -translate-y-1/2" />
                    </div>
                  </div>
                </div>
                {filtersOpen && <div className="mt-5 flex gap-2 overflow-x-auto pb-1 lg:hidden">{[null, ...categories].map((category) => <button key={category?.id ?? "all"} onClick={() => { setSelectedCategory(category?.slug ?? null); setFiltersOpen(false); }} className={`min-h-11 shrink-0 rounded-full border px-4 text-[10px] uppercase tracking-[0.12em] ${selectedCategory === category?.slug ? "border-[#241b16] bg-[#241b16] text-[#f7f4ed]" : "border-[#171310]/12"}`}>{category?.title ?? "All"}</button>)}</div>}
                <div className="mt-5 flex items-center justify-between"><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#716b63]">{filtered.length} considered pieces</p>{selectedCategory && <button onClick={() => setSelectedCategory(null)} className="text-[10px] uppercase tracking-[0.14em] underline underline-offset-4">Clear filter</button>}</div>
              </div>

              <div className="mt-9 grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 md:grid-cols-3 xl:gap-x-7 xl:gap-y-16">
                {filtered.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}
              </div>
            </div>
          </div>
          {filtered.length === 0 && <div className="py-24 text-center"><p className="font-serif text-4xl text-ink/35 dark:text-cream/35">No pieces found</p><p className="mt-2 text-sm text-ink/45 dark:text-cream/45">Try another search or collection.</p></div>}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
