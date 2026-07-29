"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export function EditorialStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={containerRef} className="relative py-24 md:py-40 bg-zinc-50 dark:bg-[#050505] overflow-hidden">
      <div className="container relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] shadow-2xl">
              <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0 h-[120%] w-[120%] -top-[10%] -left-[10%]">
                <Image
                  src="/images/saree_editorial_1785319869961.png"
                  alt="Traditional South Indian Bride in Kanchipuram Saree"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>
              <div className="absolute inset-0 ring-1 ring-inset ring-black/10 dark:ring-white/10 rounded-[2rem]" />
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="absolute -bottom-8 -right-8 hidden aspect-square w-48 rounded-[2rem] bg-white/60 p-6 shadow-xl backdrop-blur-xl border border-white/40 dark:bg-black/40 dark:border-white/10 md:block"
            >
              <p className="font-serif text-5xl text-gold">100+</p>
              <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-ink/70 dark:text-cream/70 font-medium">Years of Zari Heritage</p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-gold">The Kalyani Legacy</p>
            <h2 className="mt-6 font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.1] text-ink dark:text-cream font-light">
              Where heritage
              <br />
              meets <span className="italic font-bold">modernity.</span>
            </h2>
            <p className="mt-8 max-w-lg text-[15px] leading-relaxed text-ink/60 dark:text-cream/60">
              Every drape in our collection is a conversation between traditional South Indian craftsmanship
              and contemporary luxury. We work with master weavers in Kanchipuram, preserving
              centuries-old handloom techniques while creating masterpieces for the modern woman.
            </p>
            <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-ink/60 dark:text-cream/60">
              From pure silk sarees woven with pure gold zari to meticulously sculpted temple jewelry, each piece is a testament to divine beauty.
            </p>
            
            <div className="mt-12 grid grid-cols-3 gap-8 border-t border-ink/10 dark:border-white/10 pt-8">
              {[
                { number: "250+", label: "Weavers" },
                { number: "Kanchi", label: "Origin" },
                { number: "100%", label: "Pure Silk" }
              ].map((stat, i) => (
                <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + (i * 0.1), duration: 0.6 }}
                >
                  <p className="font-serif text-3xl md:text-4xl text-gold">{stat.number}</p>
                  <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-ink/40 dark:text-cream/40">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
