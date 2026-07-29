"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ProductCard } from "./product-card";
import { SectionHeading } from "./section-heading";
import type { Product } from "@/types";

function ProductRow({
  title,
  products,
  eyebrow
}: {
  title: string;
  products: Product[];
  eyebrow: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="mb-20 md:mb-28">
      <SectionHeading
        eyebrow={eyebrow}
        title={title}
        action="Shop now"
        actionHref="/shop"
      />
      <div ref={scrollRef} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
    </div>
  );
}

export function ProductCarousels({
  trendingProducts,
  bestSellers,
  newArrivals
}: {
  trendingProducts: Product[];
  bestSellers: Product[];
  newArrivals: Product[];
}) {
  return (
    <div className="py-24 md:py-32">
      <div className="container">
        <ProductRow
          eyebrow="Curated for you"
          title="Trending now."
          products={trendingProducts}
        />
        <ProductRow
          eyebrow="Most loved"
          title="Best sellers."
          products={bestSellers}
        />
        <ProductRow
          eyebrow="Just landed"
          title="New arrivals."
          products={newArrivals}
        />
      </div>
    </div>
  );
}
