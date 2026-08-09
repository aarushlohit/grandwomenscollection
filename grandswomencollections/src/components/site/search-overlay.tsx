"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Search, X } from "lucide-react";
import { categories, products } from "@/lib/data/catalog";

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => inputRef.current?.focus(), 180);
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  const matches = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return products.filter((product) => product.featured).slice(0, 4);
    return products.filter((product) => [product.title, product.subtitle, product.category, ...product.tags].some((value) => value.toLowerCase().includes(normalized))).slice(0, 8);
  }, [query]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div role="dialog" aria-modal="true" aria-label="Search the collection" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="fixed inset-0 z-[70] overflow-y-auto bg-[#f7f4ed] text-[#171310]">
          <div className="mx-auto min-h-full w-full max-w-[1500px] px-5 pb-16 pt-5 sm:px-8 lg:px-12">
            <div className="flex h-14 items-center justify-between border-b border-[#171310]/10">
              <Link href="/" onClick={onClose} className="font-serif text-xl font-semibold tracking-[0.25em]">GRAND</Link>
              <button onClick={onClose} aria-label="Close search" className="flex h-11 w-11 items-center justify-center rounded-full border border-[#171310]/12 transition-colors hover:bg-[#171310] hover:text-[#f7f4ed]"><X className="h-5 w-5" strokeWidth={1.5} /></button>
            </div>

            <motion.div initial={{ opacity: 0, transform: "translateY(18px)" }} animate={{ opacity: 1, transform: "translateY(0)" }} transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }} className="mx-auto mt-16 max-w-6xl md:mt-24">
              <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#b98a3d]">Discover your piece</p>
              <div className="mt-5 flex items-end gap-3 border-b border-[#171310]/25 pb-4 focus-within:border-[#b98a3d]">
                <Search className="mb-2 h-6 w-6 shrink-0" strokeWidth={1.25} />
                <input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="What are you looking for?" style={{ outline: "none" }} className="min-w-0 flex-1 bg-transparent font-serif text-[clamp(2.4rem,6vw,6rem)] font-light leading-none tracking-[-0.04em] placeholder:text-[#171310]/22" />
                {query && <button onClick={() => setQuery("")} className="mb-1 min-h-11 px-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#716b63]">Clear</button>}
              </div>

              {!query && <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3">{categories.slice(0, 6).map((category) => <Link key={category.id} href={`/category/${category.slug}`} onClick={onClose} className="text-xs uppercase tracking-[0.15em] text-[#716b63] transition-colors hover:text-[#171310]">{category.title}</Link>)}</div>}

              <div className="mt-14 flex items-end justify-between border-b border-[#171310]/10 pb-4">
                <h2 className="font-serif text-3xl font-light md:text-4xl">{query ? "Search results" : "The current edit"}</h2>
                <span className="text-[10px] uppercase tracking-[0.18em] text-[#716b63]">{matches.length} pieces</span>
              </div>

              {matches.length > 0 ? <div className="mt-7 grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-4 md:gap-x-6">{matches.map((product, index) => <motion.div key={product.id} initial={{ opacity: 0, transform: "translateY(12px)" }} animate={{ opacity: 1, transform: "translateY(0)" }} transition={{ duration: 0.4, delay: index * 0.035 }}><Link href={`/shop/${product.slug}`} onClick={onClose} className="group block"><div className="relative aspect-[3/4] overflow-hidden rounded-[18px] bg-[#eee9de]"><Image src={product.images[0].url} alt={product.images[0].alt} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" sizes="(max-width: 768px) 50vw, 25vw" /></div><div className="mt-4 flex items-start justify-between gap-3"><div><h3 className="font-serif text-lg leading-tight md:text-xl">{product.title}</h3><p className="mt-1 text-xs text-[#716b63]">₹{product.price.toLocaleString("en-IN")}</p></div><ArrowUpRight className="h-4 w-4 shrink-0 opacity-35 transition-opacity group-hover:opacity-100" /></div></Link></motion.div>)}</div> : <div className="py-24 text-center"><p className="font-serif text-4xl text-[#171310]/35">No piece found.</p><p className="mt-3 text-sm text-[#716b63]">Try saree, bridal, festive, or jewellery.</p></div>}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
