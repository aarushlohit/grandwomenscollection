import Link from "next/link";
import { Instagram, Twitter, Facebook, Sparkles } from "lucide-react";

const footerLinks = {
  Shop: [
    { href: "/shop", label: "Kanchipuram Silks" },
    { href: "/collections", label: "Curated Edits" },
    { href: "/categories", label: "Browse Categories" },
    { href: "/shop?new=true", label: "Festive Arrivals" }
  ],
  Services: [
    { href: "/contact", label: "Bridal Concierge" },
    { href: "/shipping", label: "Pan-India Shipping" },
    { href: "/returns", label: "Quality Guarantee" },
    { href: "/faq", label: "FAQ & Sizing" }
  ],
  Company: [
    { href: "/about", label: "Our Legacy" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" }
  ]
};

export function SiteFooter() {
  return (
    <footer className="border-t border-black/5 dark:border-white/10 bg-white/60 dark:bg-black/80 backdrop-blur-2xl text-ink dark:text-cream transition-colors">
      <div className="container py-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-block">
              <span className="font-serif text-3xl font-bold tracking-[0.25em] text-ink dark:text-cream">GRAND</span>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.4em] text-gold">South Indian Luxury Boutique</p>
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-relaxed font-light text-ink/70 dark:text-cream/70">
              Curating heritage Kanchipuram silks, bridal lehengas, and temple jewelry for auspicious moments. Every drape carries the soul of South Indian weaving.
            </p>
            <div className="mt-8 flex gap-3">
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full glass-pill text-ink/70 dark:text-cream/70 transition-all hover:border-gold hover:text-gold hover:scale-110">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full glass-pill text-ink/70 dark:text-cream/70 transition-all hover:border-gold hover:text-gold hover:scale-110">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full glass-pill text-ink/70 dark:text-cream/70 transition-all hover:border-gold hover:text-gold hover:scale-110">
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold">{section}</p>
              <ul className="mt-5 space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-xs font-medium text-ink/70 dark:text-cream/70 transition-colors hover:text-gold">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-black/5 dark:border-white/10 pt-8 md:flex-row">
          <p className="text-xs text-ink/40 dark:text-cream/40">
            &copy; {new Date().getFullYear()} GRAND Women&apos;s Collections. Silk Mark Certified. All rights reserved.
          </p>
          <p className="text-xs text-ink/40 dark:text-cream/40 font-medium">
            Handcrafted luxury for auspicious moments.
          </p>
        </div>
      </div>
    </footer>
  );
}
