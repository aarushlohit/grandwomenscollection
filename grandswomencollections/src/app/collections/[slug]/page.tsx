"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { ProductCard } from "@/components/site/product-card";
import { products, collections } from "@/lib/data/catalog";
import { use } from "react";

export default function CollectionsSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const collection = collections.find((c) => c.slug === slug);
  const collectionProducts = products.filter((p) => p.collection === slug);

  return (
    <>
      <SiteHeader />
      <main className="pt-20">
        <section className="relative overflow-hidden bg-ink py-20 dark:bg-[#0a0a0a]">
          <div className="container relative z-10 py-12 text-center">
            <p className="text-[11px] uppercase tracking-[0.4em] text-gold">{collection?.season}</p>
            <h1 className="mt-4 font-serif text-editorial text-cream">{collection?.title ?? "Collection"}</h1>
            <p className="mx-auto mt-4 max-w-lg text-[15px] text-cream/50">{collection?.description}</p>
          </div>
        </section>

        <section className="container py-16">
          {collectionProducts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {collectionProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="font-serif text-3xl text-ink/30 dark:text-cream/30">Coming soon</p>
              <p className="mt-2 text-sm text-ink/40 dark:text-cream/40">Products for this collection are being curated.</p>
              <Link href="/shop" className="mt-6 inline-flex rounded-full bg-ink px-6 py-3 text-[13px] uppercase tracking-wider text-cream hover:bg-gold dark:bg-cream dark:text-ink">
                Browse all products
              </Link>
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
