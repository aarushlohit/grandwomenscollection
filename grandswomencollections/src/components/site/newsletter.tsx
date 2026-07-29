"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="py-24 md:py-32">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-[2rem] bg-ink p-12 text-center md:p-20 dark:bg-[#0a0a0a]"
        >
          <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-gold/10 blur-3xl" />

          <p className="relative text-[11px] uppercase tracking-[0.4em] text-gold">Newsletter</p>
          <h2 className="relative mt-6 font-serif text-editorial text-cream">
            Stay in the <span className="italic">conversation.</span>
          </h2>
          <p className="relative mx-auto mt-4 max-w-md text-[15px] text-cream/45">
            Exclusive previews, styling tips, and first access to new collections.
            No noise, just luxury.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative mt-10 inline-flex items-center gap-3 rounded-full bg-gold/20 px-6 py-3"
            >
              <Check className="h-4 w-4 text-gold" />
              <span className="text-sm text-cream">Welcome to the inner circle.</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="relative mx-auto mt-10 flex max-w-md gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 rounded-full bg-cream/10 px-6 py-4 text-sm text-cream placeholder:text-cream/30 outline-none transition-colors focus:bg-cream/15"
                required
              />
              <button
                type="submit"
                className="flex items-center gap-2 rounded-full bg-gold px-6 py-4 text-[13px] font-medium uppercase tracking-wider text-white transition-colors hover:bg-gold-dark"
              >
                Subscribe
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          )}

          <p className="relative mt-4 text-xs text-cream/25">
            Unsubscribe anytime. We respect your inbox.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
