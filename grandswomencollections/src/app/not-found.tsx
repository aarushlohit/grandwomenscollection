"use client";

import Link from "next/link";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="flex min-h-screen items-center justify-center pt-[72px]">
        <div className="container py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-serif text-[12rem] leading-none text-ink/5 dark:text-cream/5">404</p>
            <h1 className="mt-8 font-serif text-headline text-ink dark:text-cream">
              Page not found
            </h1>
            <p className="mx-auto mt-4 max-w-md text-[15px] text-ink/50 dark:text-cream/50">
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
              Let&apos;s get you back to something beautiful.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/"
                className="rounded-full bg-ink px-8 py-4 text-[13px] uppercase tracking-[0.2em] text-cream transition-colors hover:bg-gold dark:bg-cream dark:text-ink"
              >
                Back to Home
              </Link>
              <Link
                href="/shop"
                className="rounded-full border border-ink/15 px-8 py-4 text-[13px] uppercase tracking-[0.2em] text-ink transition-colors hover:border-gold hover:text-gold dark:border-cream/15 dark:text-cream"
              >
                Browse Shop
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
