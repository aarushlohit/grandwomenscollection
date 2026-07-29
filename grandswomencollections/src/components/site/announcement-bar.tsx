"use client";

import { motion } from "framer-motion";

export function AnnouncementBar() {
  return (
    <div className="relative overflow-hidden bg-ink text-cream dark:bg-[#0a0a0a]">
      <div className="flex h-10 items-center">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap"
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="mx-8 flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-cream/70">
              <span className="h-1 w-1 rounded-full bg-gold" />
              Complimentary shipping on orders above ₹15,000
              <span className="h-1 w-1 rounded-full bg-gold" />
              New: The Monarch Edit is here
              <span className="h-1 w-1 rounded-full bg-gold" />
              Book a personal styling session
              <span className="h-1 w-1 rounded-full bg-gold" />
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
