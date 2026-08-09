"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Menu, Moon, Search, ShoppingBag, Sun, UserRound, X } from "lucide-react";
import { useCartStore } from "@/store/use-cart-store";
import { useWishlistStore } from "@/store/use-wishlist-store";
import { useTheme } from "@/components/theme-provider";
import { SearchOverlay } from "@/components/site/search-overlay";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/collections", label: "Collections" },
  { href: "/categories", label: "Categories" },
  { href: "/about", label: "Our Story" },
  { href: "/contact", label: "Contact" }
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const cartCount = useCartStore((state) => state.items.length);
  const wishlistCount = useWishlistStore((state) => state.productIds.length);
  const onHero = pathname === "/" && !scrolled;

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 36);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  const foreground = onHero ? "text-white" : "text-[#171310] dark:text-[#f7f4ed]";

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-5 z-50 flex justify-center px-3">
        <div className={`pointer-events-auto flex h-14 w-full max-w-[1040px] items-center justify-between rounded-full border px-3 transition-[background-color,border-color,box-shadow] duration-300 sm:px-4 ${onHero ? "border-white/25 bg-white/10 shadow-[0_12px_45px_rgba(17,12,8,0.12)] backdrop-blur-xl" : "border-[#281e16]/10 bg-[rgba(247,244,237,0.9)] shadow-[0_12px_42px_rgba(36,27,22,0.09)] backdrop-blur-xl dark:border-white/10 dark:bg-[rgba(23,19,16,0.9)]"}`}>
          <Link href="/" aria-label="Grand Women’s Collections home" className={`flex min-h-11 shrink-0 items-center px-2 ${foreground}`}>
            <span className="font-serif text-[19px] font-semibold tracking-[0.25em]">GRAND</span>
          </Link>

          <nav className="hidden items-center lg:flex" aria-label="Main navigation">
            {navLinks.map((link) => {
              const active = pathname === link.href || (link.href !== "/shop" && pathname.startsWith(`${link.href}/`));
              return <Link key={link.href} href={link.href} className={`relative flex min-h-11 items-center px-3 text-[9px] font-semibold uppercase tracking-[0.2em] transition-opacity duration-150 ${foreground} ${active ? "opacity-100" : "opacity-[0.62] hover:opacity-100"}`}>{link.label}{active && <motion.span layoutId="grand-nav" className="absolute inset-x-3 bottom-1.5 h-px bg-[#b98a3d]" />}</Link>;
            })}
          </nav>

          <div className={`flex shrink-0 items-center ${foreground}`}>
            <NavIcon label="Toggle theme" onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")} icon={resolvedTheme === "dark" ? <Sun /> : <Moon />} hideMobile />
            <button onClick={() => setSearchOpen(true)} aria-label="Search" className="flex h-11 w-10 items-center justify-center opacity-75 transition-opacity hover:opacity-100"><Search className="h-[17px] w-[17px]" strokeWidth={1.55} /></button>
            <CountLink href="/wishlist" label="Wishlist" count={wishlistCount}><Heart /></CountLink>
            <Link href="/profile" aria-label="Account" className="hidden h-11 w-10 items-center justify-center opacity-75 transition-opacity hover:opacity-100 sm:flex"><UserRound className="h-[17px] w-[17px]" strokeWidth={1.55} /></Link>
            <CountLink href="/cart" label="Shopping bag" count={cartCount}><ShoppingBag /></CountLink>
            <button onClick={() => setMobileOpen(true)} aria-label="Open menu" className="flex h-11 w-10 items-center justify-center lg:hidden"><Menu className="h-[19px] w-[19px]" strokeWidth={1.55} /></button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="fixed inset-0 z-[60] bg-[#f7f4ed] text-[#171310] dark:bg-[#171310] dark:text-[#f7f4ed]">
          <div className="flex h-full flex-col px-5 py-5">
            <div className="flex h-14 items-center justify-between border-b border-current/10">
              <span className="font-serif text-xl font-semibold tracking-[0.25em]">GRAND</span>
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu" className="flex h-11 w-11 items-center justify-center rounded-full border border-current/10"><X className="h-5 w-5" /></button>
            </div>
            <nav className="flex flex-1 flex-col justify-center" aria-label="Mobile navigation">
              {navLinks.map((link, index) => <motion.div key={link.href} initial={{ opacity: 0, transform: "translateY(18px)" }} animate={{ opacity: 1, transform: "translateY(0)" }} transition={{ duration: 0.55, delay: index * 0.045, ease: [0.16, 1, 0.3, 1] }}><Link href={link.href} className="group flex min-h-16 items-baseline justify-between border-b border-current/10 py-3 font-serif text-[clamp(2.7rem,13vw,4.5rem)] font-light leading-none tracking-[-0.035em]"><span>{link.label}</span><span className="font-sans text-[9px] uppercase tracking-[0.2em] opacity-35">0{index + 1}</span></Link></motion.div>)}
            </nav>
            <div className="flex items-center justify-between border-t border-current/10 pt-4 text-[10px] uppercase tracking-[0.18em] opacity-55"><span>Coimbatore · India</span><button onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")} className="flex min-h-11 items-center gap-2">{resolvedTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />} Theme</button></div>
          </div>
        </motion.div>}
      </AnimatePresence>
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

function NavIcon({ label, onClick, icon, hideMobile }: { label: string; onClick: () => void; icon: React.ReactElement; hideMobile?: boolean }) {
  return <button onClick={onClick} aria-label={label} className={`${hideMobile ? "hidden sm:flex" : "flex"} h-11 w-10 items-center justify-center opacity-75 transition-opacity hover:opacity-100 [&_svg]:h-[17px] [&_svg]:w-[17px] [&_svg]:stroke-[1.55]`}>{icon}</button>;
}

function CountLink({ href, label, count, children }: { href: string; label: string; count: number; children: React.ReactElement }) {
  return <Link href={href} aria-label={label} className="relative flex h-11 w-10 items-center justify-center opacity-80 transition-opacity hover:opacity-100 [&_svg]:h-[17px] [&_svg]:w-[17px] [&_svg]:stroke-[1.55]">{children}{count > 0 && <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#b98a3d] px-1 text-[8px] font-semibold text-[#f7f4ed]">{count}</span>}</Link>;
}
