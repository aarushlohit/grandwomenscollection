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
    <section ref={containerRef} className="relative h-screen min-h-screen overflow-hidden">
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

      {/* Foreground Content */}
      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="max-w-3xl rounded-3xl bg-white/10 px-8 py-12 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-blur-md border border-white/20 dark:bg-black/20 dark:border-white/10"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-4 text-[11px] uppercase tracking-[0.5em] text-white"
          >
            Luxury Reimagined
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mb-6 font-serif text-5xl md:text-7xl font-light leading-tight text-white"
          >
            Dress up like <span className="font-bold italic">kalyani</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mx-auto mb-10 max-w-lg text-[15px] leading-relaxed text-white/80"
          >
            Step into a world of curated elegance. Discover collections that blend heritage craftsmanship with modern cinematic aesthetic.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href="/shop"
              className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-[13px] font-medium uppercase tracking-[0.2em] text-black transition-all duration-300 hover:scale-105 hover:bg-gold hover:text-white"
            >
              Explore Collection
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/collections"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-8 py-4 text-[13px] font-medium uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-white/20"
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
