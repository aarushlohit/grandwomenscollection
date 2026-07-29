"use client";

import { useState } from "react";
import { useDeferredValue } from "react";
import { Search, X } from "lucide-react";
import type { Product } from "@/types";
import { searchProducts } from "@/lib/search";
import { ProductCard } from "@/components/site/product-card";

export function ShopFilters({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const results = searchProducts(products, deferredQuery);

  return (
    <div className="space-y-8">
      <div className="relative max-w-md">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/30" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="w-full rounded-full border border-ink/10 bg-cream/50 py-3 pl-11 pr-4 text-sm text-ink outline-none transition-colors focus:border-gold dark:border-cream/10 dark:bg-cream/5 dark:text-cream"
          placeholder="Search by name, occasion, or style..."
        />
        {query && (
          <button onClick={() => setQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-ink/30">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {results.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
      {results.length === 0 && (
        <div className="py-20 text-center">
          <p className="font-serif text-3xl text-ink/30 dark:text-cream/30">No pieces found</p>
          <p className="mt-2 text-sm text-ink/40 dark:text-cream/40">Try a different search term</p>
        </div>
      )}
    </div>
  );
}
