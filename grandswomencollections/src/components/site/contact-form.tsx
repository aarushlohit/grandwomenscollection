"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, SendHorizontal } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(3),
  message: z.string().min(10)
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" }
  });

  async function onSubmit(values: ContactFormValues) {
    setSubmitted(true);
    form.reset();
  }

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card rounded-3xl p-10 text-center border border-black/5 dark:border-white/10"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Check className="h-8 w-8" />
          </div>
          <h3 className="mt-6 font-serif text-3xl text-ink dark:text-cream">Message Sent</h3>
          <p className="mt-3 text-sm text-ink/60 dark:text-cream/60">Our personal shoppers will reach out within 24 hours.</p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onSubmit={form.handleSubmit(onSubmit)}
          className="glass-card rounded-[2rem] p-8 md:p-10 border border-black/5 dark:border-white/10 space-y-5"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-gold">Name</label>
              <input
                {...form.register("name")}
                className="w-full rounded-2xl glass-input px-4 py-3.5 text-sm"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-gold">Email</label>
              <input
                {...form.register("email")}
                type="email"
                className="w-full rounded-2xl glass-input px-4 py-3.5 text-sm"
                placeholder="your@email.com"
              />
            </div>
          </div>
          <div>
            <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-gold">Subject</label>
            <input
              {...form.register("subject")}
              className="w-full rounded-2xl glass-input px-4 py-3.5 text-sm"
              placeholder="Custom order, sizing advice, bridal consultation..."
            />
          </div>
          <div>
            <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-gold">Message</label>
            <textarea
              {...form.register("message")}
              rows={5}
              className="w-full resize-none rounded-2xl glass-input px-4 py-3.5 text-sm"
              placeholder="Tell us about your occasion and requirements..."
            />
          </div>
          <button
            type="submit"
            className="w-full mt-4 flex items-center justify-center gap-3 rounded-full bg-gold py-4 text-xs font-bold uppercase tracking-[0.25em] text-white shadow-xl hover:bg-gold-dark transition-all duration-300"
          >
            <SendHorizontal className="h-4 w-4" />
            Send Inquiry
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
