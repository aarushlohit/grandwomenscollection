"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Heart, ShoppingBag, Search, Sun, Moon } from "lucide-react";
import { useCartStore } from "@/store/use-cart-store";
import { useWishlistStore } from "@/store/use-wishlist-store";
import { useTheme } from "@/components/theme-provider";

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
  const { resolvedTheme, setTheme } = useTheme();
  const pathname = usePathname();
  const cartCount = useCartStore((s) => s.items.length);
  const wishlistCount = useWishlistStore((s) => s.productIds.length);
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const headerBg = scrolled || !isHome
    ? "bg-white/80 dark:bg-black/80 backdrop-blur-2xl border-b border-black/5 dark:border-white/10 shadow-sm"
    : "bg-transparent";

  const textColor = scrolled || !isHome
    ? "text-ink dark:text-cream"
    : "text-white";

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerBg}`}>
        <div className="container flex h-[72px] items-center justify-between">
          <Link href="/" className="relative z-10 flex items-center">
            <span className={`font-serif text-xl tracking-[0.25em] font-bold ${textColor}`}>
              GRAND
            </span>
            <span className={`ml-2.5 text-[10px] font-medium uppercase tracking-[0.35em] ${textColor} opacity-70`}>
              Boutique
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-[13px] font-medium uppercase tracking-[0.2em] transition-colors duration-300 ${textColor} ${
                  pathname === link.href ? "opacity-100" : "opacity-70 hover:opacity-100"
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gold rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className={`h-10 w-10 flex items-center justify-center rounded-full transition-colors ${textColor} hover:bg-black/5 dark:hover:bg-white/10`}
              title="Toggle Theme"
            >
              {resolvedTheme === "dark" ? <Sun className="h-[18px] w-[18px]" strokeWidth={1.5} /> : <Moon className="h-[18px] w-[18px]" strokeWidth={1.5} />}
            </button>

            <Link
              href="/shop"
              className={`hidden h-10 w-10 items-center justify-center rounded-full transition-colors lg:flex ${textColor} hover:bg-black/5 dark:hover:bg-white/10`}
            >
              <Search className="h-[18px] w-[18px]" strokeWidth={1.5} />
            </Link>
            <Link
              href="/wishlist"
              className={`relative h-10 w-10 flex items-center justify-center rounded-full transition-colors ${textColor} hover:bg-black/5 dark:hover:bg-white/10`}
            >
              <Heart className="h-[18px] w-[18px]" strokeWidth={1.5} />
              {wishlistCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[9px] font-bold text-white">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link
              href="/cart"
              className={`relative h-10 w-10 flex items-center justify-center rounded-full transition-colors ${textColor} hover:bg-black/5 dark:hover:bg-white/10`}
            >
              <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[9px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`ml-1 flex h-10 w-10 items-center justify-center rounded-full transition-colors lg:hidden ${textColor} hover:bg-black/5 dark:hover:bg-white/10`}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-2xl dark:bg-black/95 lg:hidden flex flex-col justify-center items-center"
          >
            <nav className="flex flex-col items-center justify-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    className={`font-serif text-4xl transition-colors ${
                      pathname === link.href ? "text-gold" : "text-ink dark:text-cream"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="mt-6 flex items-center gap-6"
              >
                <button
                  onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                  className="p-3 rounded-full border border-black/10 dark:border-white/20 text-ink dark:text-cream"
                >
                  {resolvedTheme === "dark" ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
                </button>
                <Link href="/wishlist" className="p-3 rounded-full border border-black/10 dark:border-white/20 text-ink dark:text-cream">
                  <Heart className="h-6 w-6" />
                </Link>
                <Link href="/cart" className="p-3 rounded-full border border-black/10 dark:border-white/20 text-ink dark:text-cream">
                  <ShoppingBag className="h-6 w-6" />
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
