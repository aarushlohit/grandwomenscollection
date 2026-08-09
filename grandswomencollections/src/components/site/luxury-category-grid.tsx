"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/lib/data/catalog";
import { SectionHeading } from "./section-heading";

const overrideImages = [
  "/images/saree_editorial_1785319869961.png", // occasionwear
  "/images/collection_sarees_1785319884762.png", // sarees
  "/images/collection_lehengas_1785319969542.png", // workwear (repurposed for lehengas in ui)
  "/images/collection_jewelry_1785319899305.png" // wedding
];

const overrideTitles = [
  "Bridal Occasions",
  "Kanchipuram Sarees",
  "Festive Lehengas",
  "Temple Jewelry"
];

export function LuxuryCategoryGrid() {
  const [first, ...rest] = categories;

  return (
    <section className="py-24 md:py-40 bg-zinc-50 dark:bg-[#050505]">
      <div className="container relative z-10">
        <SectionHeading
          eyebrow="Categories"
          title="Curated for your legacy."
          description="From temple weddings to modern festive gatherings — discover pieces curated for every auspicious chapter of your life."
          action="All categories"
          actionHref="/categories"
        />

        <div className="grid gap-6 lg:grid-cols-12 mt-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            <Link href={`/category/${first.slug}`} className="group relative block h-full overflow-hidden rounded-xl shadow-xl">
              <div className="relative h-full min-h-[500px] overflow-hidden">
                <Image
                  src={overrideImages[0]}
                  alt={overrideTitles[0]}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-xl" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-10">
                <h3 className="font-serif text-4xl text-white">{overrideTitles[0]}</h3>
                <p className="mt-3 max-w-md text-[15px] text-white/70">Statement making bridal and reception edits for the most important days.</p>
                <span className="mt-6 inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.2em] text-gold">
                  Explore <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
              </div>
            </Link>
          </motion.div>

          <div className="lg:col-span-5 grid gap-6">
            {categories.slice(1, 4).map((category, i) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
                className="h-full"
              >
                <Link href={`/category/${category.slug}`} className="group relative block h-full overflow-hidden rounded-xl shadow-lg">
                  <div className="relative h-full min-h-[240px] overflow-hidden">
                    <Image
                      src={overrideImages[i + 1]}
                      alt={overrideTitles[i + 1]}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                    <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-xl" />
                  </div>
                  <div className="absolute bottom-0 left-0 p-8 h-full flex flex-col justify-end w-2/3">
                    <h3 className="font-serif text-2xl text-white leading-tight">{overrideTitles[i + 1]}</h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {rest.length > 3 && (
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {rest.slice(3, 7).map((category, i) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link href={`/category/${category.slug}`} className="group relative block overflow-hidden rounded-2xl shadow-md">
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 p-5">
                    <h3 className="font-serif text-xl text-white">{category.title}</h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
