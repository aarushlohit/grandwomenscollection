"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Wand2, Camera, Compass, Crown, ArrowRight, Sparkles, Check, RefreshCw } from "lucide-react";

export function AIFashionStylistBanner() {
  const [activeOccasion, setActiveOccasion] = useState("Wedding Reception");
  const [activeSilk, setActiveSilk] = useState("Royal Kanchipuram");
  const [isGenerating, setIsGenerating] = useState(false);

  const combinations: Record<string, { title: string; desc: string; image: string }> = {
    "Wedding Reception": {
      title: "Crimson Gold Zari Ensemble",
      desc: "Rich crimson silk adorned with pure gold zari temple borders paired with ruby guttapusalu jewelry.",
      image: "/images/saree_editorial_1785319869961.png"
    },
    "Festive Gala": {
      title: "Pastel Brocade Half-Saree",
      desc: "Blush rose organza drape with hand-embroidered zari motifs and antique pearl choker.",
      image: "/images/collection_lehengas_1785319969542.png"
    },
    "Traditional Puja": {
      title: "Royal Emerald Silk Drape",
      desc: "Deep emerald silk woven with sacred peacock motifs, styled with emerald-encrusted temple jhumkas.",
      image: "/images/collection_sarees_1785319884762.png"
    }
  };

  const currentLook = combinations[activeOccasion];

  const handleSelect = (occ: string) => {
    setIsGenerating(true);
    setActiveOccasion(occ);
    setTimeout(() => setIsGenerating(false), 400);
  };

  return (
    <section className="py-24 md:py-36 relative overflow-hidden bg-cream/40 dark:bg-black/60 transition-colors">
      {/* Background liquid glow effects */}
      <div className="absolute left-1/4 top-10 h-80 w-80 rounded-full bg-gold/15 blur-[120px] pointer-events-none" />
      <div className="absolute right-10 bottom-10 h-96 w-96 rounded-full bg-amber-500/10 blur-[140px] pointer-events-none" />

      <div className="container relative z-10">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-5 py-2 backdrop-blur-md shadow-sm">
            <Crown className="h-4 w-4 text-gold" />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold">Exclusive Style Assistant</span>
          </div>
          <h2 className="mt-6 font-serif text-4xl md:text-6xl text-ink dark:text-cream leading-tight">
            Personal Couture <span className="italic text-gold">Stylist</span>
          </h2>
          <p className="mt-4 text-base text-ink/60 dark:text-cream/60 leading-relaxed">
            Experience real-time AI styling. Tailored recommendations for heritage drapes, auspicious color pairings, and temple jewelry.
          </p>
        </div>

        {/* Liquid Glass Interactive Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-card rounded-2xl p-8 md:p-14 relative overflow-hidden border border-black/10 dark:border-white/15"
        >
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            {/* Left Controls */}
            <div className="lg:col-span-6 space-y-8">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold mb-3">Step 1: Choose Occasion</p>
                <div className="flex flex-wrap gap-2.5">
                  {["Wedding Reception", "Festive Gala", "Traditional Puja"].map((occ) => (
                    <button
                      key={occ}
                      onClick={() => handleSelect(occ)}
                      className={`px-5 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                        activeOccasion === occ
                          ? "bg-gold text-white shadow-lg shadow-gold/20 scale-105"
                          : "bg-white/80 dark:bg-white/10 text-ink/80 dark:text-cream/80 border border-black/5 dark:border-white/10 hover:border-gold/50"
                      }`}
                    >
                      {occ}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold mb-3">Step 2: Select Weave Preference</p>
                <div className="grid grid-cols-2 gap-3">
                  {["Royal Kanchipuram", "Pure Organza Silk", "Brocade Handloom", "Chettinad Heritage"].map((silk) => (
                    <button
                      key={silk}
                      onClick={() => setActiveSilk(silk)}
                      className={`p-4 rounded-2xl text-left border transition-all text-xs font-medium flex items-center justify-between ${
                        activeSilk === silk
                          ? "border-gold bg-gold/10 text-ink dark:text-cream font-semibold"
                          : "border-black/5 dark:border-white/10 bg-white/40 dark:bg-white/5 text-ink/70 dark:text-cream/70 hover:border-gold/30"
                      }`}
                    >
                      <span>{silk}</span>
                      {activeSilk === silk && <Check className="h-4 w-4 text-gold" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-black/5 dark:border-white/10 flex items-center gap-4">
                <button 
                  onClick={() => setIsGenerating(true)}
                  className="flex-1 py-4 px-8 rounded-full bg-ink dark:bg-white text-white dark:text-black font-semibold text-xs uppercase tracking-[0.2em] shadow-xl hover:opacity-90 transition-all flex items-center justify-center gap-3 group"
                >
                  <Wand2 className="h-4 w-4 text-gold transition-transform group-hover:rotate-45" />
                  <span>Generate Custom Look</span>
                </button>
              </div>
            </div>

            {/* Right Interactive Preview Display */}
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden glass-card shadow-2xl group border border-white/20">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeOccasion + activeSilk}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={currentLook.image}
                      alt={currentLook.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                    {/* Curated Overlay Badge */}
                    <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
                      <span className="glass-pill px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-white border-white/20">
                        {activeSilk}
                      </span>
                      <span className="flex items-center gap-1.5 glass-pill px-3 py-1.5 rounded-full text-[10px] text-white/90">
                        <Compass className="h-3.5 w-3.5 text-gold animate-spin-slow" />
                        Live Curated
                      </span>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-10">
                      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">{activeOccasion}</p>
                      <h3 className="font-serif text-3xl mt-1 text-white">{currentLook.title}</h3>
                      <p className="mt-2 text-xs text-white/80 leading-relaxed max-w-md">
                        {currentLook.desc}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function AIVisualSearchBanner() {
  return (
    <section className="py-24 md:py-32 relative">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-card rounded-2xl overflow-hidden border border-black/5 dark:border-white/10 shadow-2xl"
        >
          <div className="grid gap-0 lg:grid-cols-2">
            <div className="p-10 md:p-16 relative z-10 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/20 px-4 py-2 bg-black/5 dark:bg-white/5 backdrop-blur-md w-fit">
                <Camera className="h-4 w-4 text-gold" />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink dark:text-white">Visual Match</span>
              </div>
              <h2 className="mt-8 font-serif text-4xl md:text-5xl text-ink dark:text-white leading-tight">
                Snap & Find Your <br />
                <span className="italic text-gold">Silk Companion</span>
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-ink/70 dark:text-cream/70">
                Spotted an exquisite Kanjeevaram motif or traditional temple necklace online?
                Upload a photo and our visual AI will present identical or complementing handcrafted pieces.
              </p>

              <div className="mt-8 flex flex-wrap gap-2.5">
                {["Instagram Reel", "Pinterest Board", "Photo Upload", "Bridal Inspiration"].map((source) => (
                  <span
                    key={source}
                    className="glass-pill px-4 py-2 rounded-full text-xs font-medium text-ink/70 dark:text-cream/70"
                  >
                    {source}
                  </span>
                ))}
              </div>

              <div className="mt-10 rounded-2xl border-2 border-dashed border-gold/40 bg-gold/5 p-8 text-center transition-all hover:border-gold hover:bg-gold/10 cursor-pointer group">
                <Camera className="mx-auto h-8 w-8 text-gold transition-transform group-hover:scale-110" />
                <p className="mt-3 text-sm font-semibold text-ink dark:text-cream">
                  Drop image here or click to browse
                </p>
                <p className="mt-1 text-xs text-ink/40 dark:text-cream/40">
                  Instant pattern & color matching
                </p>
              </div>
            </div>

            <div className="relative hidden lg:block h-full min-h-[480px]">
              <Image
                src="/images/ai_stylist_1785319983883.png"
                alt="AI Fashion visual search"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-cream via-transparent to-transparent dark:from-[#080808]" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
