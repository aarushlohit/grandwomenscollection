"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  actionHref,
  center = false
}: {
  eyebrow: string;
  title: string;
  description?: string;
  action?: string;
  actionHref?: string;
  center?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7 }}
      className={`mb-12 flex flex-col gap-4 md:mb-16 ${center ? "items-center text-center" : "md:flex-row md:items-end md:justify-between"}`}
    >
      <div className={center ? "max-w-2xl" : "max-w-2xl"}>
        <p className="text-[11px] uppercase tracking-[0.4em] text-gold">{eyebrow}</p>
        <h2 className="mt-4 font-serif text-headline text-ink dark:text-cream">{title}</h2>
        {description && (
          <p className="mt-4 max-w-xl text-[15px] leading-7 text-ink/55 dark:text-cream/55">
            {description}
          </p>
        )}
      </div>
      {action && actionHref && (
        <Link
          href={actionHref}
          className="group mt-2 inline-flex items-center gap-2 text-[13px] uppercase tracking-[0.2em] text-gold transition-colors hover:text-gold-dark"
        >
          {action}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </motion.div>
  );
}
