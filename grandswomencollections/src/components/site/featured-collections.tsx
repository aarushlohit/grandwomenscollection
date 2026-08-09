"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { collections } from "@/lib/data/catalog";
import { SectionHeading } from "./section-heading";

const overrideImages = [
  "/images/collection_sarees_1785319884762.png",
  "/images/collection_jewelry_1785319899305.png",
  "/images/collection_lehengas_1785319969542.png",
];

const overrideTitles = [
  "The Kanchipuram Silks",
  "Temple Heritage Jewelry",
  "Festive Lehengas"
];

export function FeaturedCollections() {
  return (
    <section className="py-24 md:py-40 relative bg-white dark:bg-black">
      <div className="container relative z-10">
        <SectionHeading
          eyebrow="Curated Collections"
          title="South Indian elegance, redefined."
          description="Each collection is a curated story — a vision of how traditional luxury should feel."
          action="View all collections"
          actionHref="/collections"
        />

        <div className="grid gap-8 lg:grid-cols-3 mt-16">
          {collections.slice(0, 3).map((collection, i) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.2, ease: "easeOut" }}
            >
              <Link
                href={`/collections/${collection.slug}`}
                className="group relative block overflow-hidden rounded-xl bg-ink/5 dark:bg-cream/5 shadow-2xl"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={overrideImages[i]}
                    alt={overrideTitles[i]}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  {/* Glassmorphism gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-xl" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-8 transform transition-transform duration-500 translate-y-2 group-hover:translate-y-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60">Festive &apos;26</p>
                  <h3 className="mt-2 font-serif text-3xl text-white">{overrideTitles[i]}</h3>
                  <p className="mt-3 max-w-md text-sm text-white/70 line-clamp-2 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    Discover the richness of {overrideTitles[i].toLowerCase()} tailored for the modern festive season.
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.2em] text-gold transition-colors group-hover:text-white">
                    Explore
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
