"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { categories } from "@/lib/data/catalog";

const categoryImageMap: Record<string, string> = {
  occasionwear: "/images/saree_editorial_1785319869961.png",
  sarees: "/images/collection_sarees_1785319884762.png",
  workwear: "/images/collection_lehengas_1785319969542.png",
  wedding: "/images/collection_jewelry_1785319899305.png"
};

export default function CategoriesPage() {
  return (
    <>
      <SiteHeader />
      <main className="pt-[72px] bg-cream dark:bg-black min-h-screen transition-colors">
        {/* Liquid Glass Hero */}
        <section className="relative overflow-hidden py-24 md:py-32">
          <div className="absolute inset-0 opacity-30 dark:opacity-20">
            <Image
              src="/images/collection_sarees_1785319884762.png"
              alt="Categories Header"
              fill
              className="object-cover"
            />
          </div>
          <div className="container relative z-10 py-8 text-center max-w-2xl mx-auto">
            <span className="glass-pill px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-[0.3em] text-gold inline-block mb-4">
              Explore By Occasion & Weave
            </span>
            <h1 className="font-serif text-5xl md:text-7xl text-ink dark:text-cream">All Categories</h1>
            <p className="mt-4 text-base text-ink/70 dark:text-cream/70 font-light">
              Handcrafted Kanchipuram silks, bridal lehengas, temple jewelry, and artisan drapes.
            </p>
          </div>
        </section>

        <section className="container py-16">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, i) => {
              const imageSrc = categoryImageMap[category.slug] || category.image;
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.6 }}
                >
                  <Link href={`/category/${category.slug}`} className="group block overflow-hidden rounded-[2.5rem] glass-card border border-black/5 dark:border-white/10 shadow-xl relative">
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <Image 
                        src={imageSrc} 
                        alt={category.title} 
                        fill 
                        className="object-cover transition-transform duration-1000 group-hover:scale-110" 
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">Heritage Craft</p>
                      <h3 className="font-serif text-3xl mt-1 text-white">{category.title}</h3>
                      <p className="mt-2 text-xs text-white/70 line-clamp-2 leading-relaxed">{category.description}</p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
