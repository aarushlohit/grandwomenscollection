"use client";

import Link from "next/link";
import { use } from "react";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { ProductCard } from "@/components/site/product-card";
import { products, categories } from "@/lib/data/catalog";

export default function CategorySlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const category = categories.find((c) => c.slug === slug);
  const categoryProducts = products.filter((p) => p.category === slug);

  return (
    <>
      <SiteHeader />
      <main className="pt-[72px]">
        <section className="relative overflow-hidden bg-ink py-20 dark:bg-[#0a0a0a]">
          <div className="container relative z-10 py-12 text-center">
            <p className="text-[11px] uppercase tracking-[0.4em] text-gold">Category</p>
            <h1 className="mt-4 font-serif text-editorial text-cream">{category?.title ?? "Category"}</h1>
            <p className="mx-auto mt-4 max-w-md text-[15px] text-cream/50">{category?.description}</p>
          </div>
        </section>

        <section className="container py-16">
          {categoryProducts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {categoryProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="font-serif text-3xl text-ink/30 dark:text-cream/30">Coming soon</p>
              <p className="mt-2 text-sm text-ink/40 dark:text-cream/40">We&apos;re curating something special for this category.</p>
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
