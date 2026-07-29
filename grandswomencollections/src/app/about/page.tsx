"use client";

import Image from "next/image";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { motion } from "framer-motion";
import { Heart, Gem, Shield, Wand2 } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="pt-[72px] bg-cream dark:bg-black transition-colors min-h-screen">
        {/* Liquid Glass Hero */}
        <section className="relative overflow-hidden py-28 md:py-36">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/saree_editorial_1785319869961.png"
              alt="South Indian Heritage Craft"
              fill
              className="object-cover opacity-30 dark:opacity-20 blur-[2px]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-cream/60 via-cream/80 to-cream dark:from-black/70 dark:via-black/80 dark:to-black" />
          </div>

          <div className="container relative z-10 text-center max-w-3xl">
            <span className="glass-pill px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-[0.3em] text-gold inline-block mb-6">
              Our Legacy & Atelier
            </span>
            <h1 className="font-serif text-5xl md:text-7xl text-ink dark:text-cream leading-tight">
              Where South Indian Heritage Meets <span className="italic text-gold">Modern Couture</span>
            </h1>
            <p className="mt-6 text-lg text-ink/70 dark:text-cream/70 leading-relaxed max-w-xl mx-auto font-light">
              Crafting heirloom Kanchipuram silks, temple-inspired gold artistry, and regal silhouettes for the modern woman.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="container py-20 relative z-10">
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-gold">The Beginning</span>
              <h2 className="font-serif text-4xl md:text-5xl text-ink dark:text-cream leading-tight">
                Honoring 500+ Master Weavers Across Kanchipuram & Chettinad
              </h2>
              <p className="text-[15px] leading-relaxed text-ink/70 dark:text-cream/70">
                GRAND Women&apos;s Collections was born from a passion to preserve authentic South Indian handloom weaving. We believe true luxury isn&apos;t mass-produced — it is woven thread by gold thread by generational master weavers who pour their heritage into every drape.
              </p>
              <p className="text-[15px] leading-relaxed text-ink/70 dark:text-cream/70">
                From pure silk threads dipped in real zari to hand-carved temple jewelry motifs, each piece is engineered to become a cherished family heirloom.
              </p>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden glass-card shadow-2xl border border-black/5 dark:border-white/10">
                <Image
                  src="/images/collection_sarees_1785319884762.png"
                  alt="Kanchipuram Silk Weaving"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <p className="text-xs uppercase tracking-widest text-gold font-bold">Handloom Excellence</p>
                  <p className="font-serif text-2xl mt-1">100% Pure Mulberry Silk & Zari</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Liquid Values Cards */}
        <section className="container py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Gem, title: "Artisan First", desc: "Direct ethical partnerships with master weavers across South India" },
              { icon: Heart, title: "Pure Mulberry Silk", desc: "Every drape passes Silk Mark & 14-point purity inspection" },
              { icon: Shield, title: "Heirloom Guarantee", desc: "Crafted to be passed down through generations" },
              { icon: Wand2, title: "AI Styling Assistant", desc: "Real-time drape & jewelry curation for your auspicious occasions" }
            ].map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="glass-card-hover rounded-3xl p-8 border border-black/5 dark:border-white/10"
              >
                <div className="h-12 w-12 rounded-2xl bg-gold/10 flex items-center justify-center text-gold mb-6">
                  <value.icon className="h-6 w-6" />
                </div>
                <h3 className="font-serif text-2xl text-ink dark:text-cream">{value.title}</h3>
                <p className="mt-2 text-xs text-ink/60 dark:text-cream/60 leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="py-24 relative overflow-hidden">
          <div className="container relative z-10 text-center">
            <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-gold">Impeccable Trust</span>
            <h2 className="mt-3 font-serif text-4xl text-ink dark:text-cream">Crafted By Numbers</h2>
            <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4 max-w-4xl mx-auto">
              {[
                { value: "500+", label: "Master Weavers" },
                { value: "100%", label: "Silk Mark Certified" },
                { value: "18K+", label: "Delighted Brides" },
                { value: "4.9/5", label: "Client Rating" }
              ].map((stat, i) => (
                <div key={stat.label} className="glass-card rounded-3xl p-8 border border-black/5 dark:border-white/10">
                  <p className="font-serif text-5xl text-gold font-bold">{stat.value}</p>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-ink/60 dark:text-cream/60">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
