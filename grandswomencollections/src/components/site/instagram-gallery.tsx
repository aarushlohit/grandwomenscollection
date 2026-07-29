"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { instagramPosts } from "@/lib/data/catalog";
import { SectionHeading } from "./section-heading";

export function InstagramGallery() {
  return (
    <section className="py-24 md:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="Instagram"
          title="@grandwomenscollections"
          description="Follow us for daily style inspiration, behind-the-scenes moments, and exclusive previews."
          center
        />

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {instagramPosts.map((post, i) => (
            <motion.a
              key={post.id}
              href="#"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative aspect-square overflow-hidden rounded-2xl"
            >
              <Image
                src={post.image}
                alt="Instagram post"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-ink/0 transition-colors duration-500 group-hover:bg-ink/40">
                <div className="flex items-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <Heart className="h-5 w-5 text-cream" />
                  <span className="text-sm font-medium text-cream">{post.likes.toLocaleString()}</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
