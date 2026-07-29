"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { collections } from "@/lib/data/catalog";
import { SectionHeading } from "@/components/site/section-heading";
import { ArrowUpRight } from "lucide-react";

export default function CollectionsPage() {
  return (
    <>
      <SiteHeader />
      <main className="pt-[72px]">
        <section className="relative overflow-hidden bg-ink py-20 dark:bg-[#0a0a0a]">
          <div className="absolute inset-0 opacity-40">
            <Image
              src="/images/collection_jewelry_1785319899305.png"
              alt="Temple Jewelry Collection"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
          <div className="container relative z-10 py-12 text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-gold drop-shadow-md">Curated Edits</p>
            <h1 className="mt-4 font-serif text-5xl md:text-7xl text-white drop-shadow-lg">Collections</h1>
            <p className="mx-auto mt-4 max-w-md text-[15px] text-white/90 drop-shadow-md">
              Seasonal narratives and timeless capsules, each telling a unique style story of heritage.
            </p>
          </div>
        </section>

        <section className="container py-16">
          <div className="space-y-6">
            {collections.map((collection, i) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link
                  href={`/collections/${collection.slug}`}
                  className="group flex items-center justify-between rounded-3xl border border-ink/5 bg-cream/50 p-8 transition-all hover:border-gold/30 hover:shadow-sm dark:border-cream/5 dark:bg-cream/5 md:p-12"
                >
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-gold">{collection.season}</p>
                    <h2 className="mt-3 font-serif text-headline text-ink dark:text-cream">{collection.title}</h2>
                    <p className="mt-3 max-w-xl text-[15px] text-ink/50 dark:text-cream/50">{collection.description}</p>
                  </div>
                  <ArrowUpRight className="h-6 w-6 flex-shrink-0 text-ink/15 transition-all group-hover:text-gold group-hover:translate-x-1 group-hover:-translate-y-1 dark:text-cream/15" />
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
