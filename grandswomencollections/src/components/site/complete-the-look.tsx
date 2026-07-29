"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { products } from "@/lib/data/catalog";
import { formatCurrency } from "@/lib/utils";

export function CompleteTheLook() {
  const heroProduct = products[0];
  const accessories = products.filter((p) => ["jewelry", "handbags", "accessories"].includes(p.category)).slice(0, 3);

  return (
    <section className="py-24 md:py-32">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <p className="text-[11px] uppercase tracking-[0.4em] text-gold">Style Guide</p>
          <h2 className="mt-4 font-serif text-headline text-ink dark:text-cream">
            Complete the Look
          </h2>
          <p className="mt-4 text-[15px] text-ink/50 dark:text-cream/50">
            Our stylists pair each piece with complementary accessories for the perfect ensemble.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={heroProduct.images[0].url}
                alt={heroProduct.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink/70 to-transparent p-8">
              <p className="text-[10px] uppercase tracking-[0.3em] text-cream/60">Featured</p>
              <p className="mt-1 font-serif text-2xl text-cream">{heroProduct.title}</p>
              <p className="mt-1 text-sm text-cream/60">{formatCurrency(heroProduct.price)}</p>
            </div>
          </motion.div>

          <div className="flex flex-col gap-4">
            <p className="text-[11px] uppercase tracking-[0.3em] text-ink/40 dark:text-cream/40">
              Pair with
            </p>
            {accessories.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  href={`/shop/${item.slug}`}
                  className="group flex items-center gap-5 rounded-2xl border border-ink/5 bg-cream/50 p-4 transition-all hover:border-gold/30 hover:shadow-sm dark:border-cream/5 dark:bg-cream/5"
                >
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl">
                    <Image
                      src={item.images[0].url}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-ink/35 dark:text-cream/35">{item.category}</p>
                    <p className="mt-1 font-serif text-lg text-ink dark:text-cream">{item.title}</p>
                    <p className="mt-1 text-sm text-ink/50 dark:text-cream/50">{formatCurrency(item.price)}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-ink/20 transition-all group-hover:text-gold group-hover:translate-x-1 dark:text-cream/20" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
