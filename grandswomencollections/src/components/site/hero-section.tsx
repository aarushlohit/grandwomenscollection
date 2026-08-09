"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <section ref={containerRef} className="relative min-h-[100svh] overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
        {/* Subtle overlay for legibility */}
        <div className="absolute inset-0 bg-black/30 dark:bg-black/50 transition-colors duration-500" />
      </div>

      {/* Foreground Content — intentionally text-only so the campaign film remains visible. */}
      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-10 flex min-h-[100svh] items-end px-5 pb-24 pt-32 sm:px-10 lg:px-[7vw] lg:pb-[10vh]"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="hero-copy max-w-[62rem] text-left"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-5 text-[10px] font-medium uppercase tracking-[0.48em] text-white/85 sm:text-[11px]"
          >
            Grand Women&apos;s Collections
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-balance mb-7 max-w-[12ch] font-serif text-[clamp(3.6rem,8.4vw,8.8rem)] font-light leading-[0.82] tracking-[-0.045em] text-white"
          >
            Woven for the <span className="font-medium italic">moments</span> that become heirlooms.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mb-10 max-w-md text-[15px] leading-relaxed text-white/85 sm:text-base"
          >
            Handpicked silk sarees, occasion wear and jewellery with the quiet splendour of Indian craft.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex flex-wrap items-center gap-3 sm:gap-4"
          >
            <Link
              href="/shop"
              className="group inline-flex min-h-12 items-center gap-3 rounded-md bg-cream px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-ink transition-all duration-300 hover:bg-gold hover:text-white active:scale-[0.98]"
            >
              Explore Collection
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/collections"
              className="inline-flex min-h-12 items-center gap-2 rounded-md border border-white/55 px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-white hover:text-ink active:scale-[0.98]"
            >
              View Lookbook
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/50">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-4 w-4 text-white/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
