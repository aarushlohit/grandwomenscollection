"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { testimonials } from "@/lib/data/catalog";
import { SectionHeading } from "./section-heading";

export function TestimonialsSection() {
  return (
    <section className="py-24 md:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="Testimonials"
          title="What they&apos;re saying."
          center
        />

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="rounded-3xl border border-ink/5 bg-cream/50 p-8 dark:border-cream/5 dark:bg-cream/5"
            >
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="mt-6 font-serif text-lg leading-relaxed text-ink dark:text-cream">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="relative h-12 w-12 overflow-full rounded-full">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-ink dark:text-cream">{testimonial.name}</p>
                  <p className="text-xs text-ink/40 dark:text-cream/40">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
