"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Bot, Boxes, ChartNoAxesCombined, ChevronRight, CircleUserRound, Gift, Images, LayoutDashboard, PackageCheck, Settings, ShieldCheck, ShoppingBag, Users } from "lucide-react";

const adminLinks = [
  ["/admin", "Overview", LayoutDashboard], ["/admin/products", "Products", ShoppingBag],
  ["/admin/orders", "Orders", PackageCheck], ["/admin/customers", "Customers", Users],
  ["/admin/inventory", "Inventory", Boxes], ["/admin/coupons", "Coupons", Gift],
  ["/admin/banners", "Banners", Images], ["/admin/collections", "Collections", ChartNoAxesCombined],
  ["/admin/ai", "AI Studio", Bot], ["/admin/soc", "Security", ShieldCheck],
  ["/admin/settings", "Settings", Settings]
] as const;

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="admin-shell min-h-[100dvh] bg-[#0c0d0d] text-[#f2f0eb]">
      <div className="grid min-h-[100dvh] lg:grid-cols-[244px_minmax(0,1fr)]">
        <aside className="border-b border-white/10 bg-[#111211] lg:sticky lg:top-0 lg:h-[100dvh] lg:border-b-0 lg:border-r">
          <div className="flex h-[76px] items-center justify-between border-b border-white/10 px-5 lg:h-[88px]">
            <Link href="/admin" className="flex min-h-11 items-center gap-3">
              <span className="font-serif text-xl tracking-[0.25em]">GRAND</span>
              <span className="border-l border-white/15 pl-3 text-[8px] font-semibold uppercase leading-[1.5] tracking-[0.24em] text-white/45">Admin<br />Console</span>
            </Link>
            <span className="flex h-8 items-center rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 text-[9px] font-semibold uppercase tracking-[0.18em] text-emerald-300 lg:hidden">Live</span>
          </div>
          <nav className="flex gap-1 overflow-x-auto px-3 py-3 lg:grid lg:gap-1 lg:overflow-visible lg:px-3 lg:py-5" aria-label="Admin navigation">
            {adminLinks.map(([href, label, Icon]) => {
              const active = href === "/admin" ? pathname === href : pathname.startsWith(href);
              return (
                <Link key={href} href={href} className={`group flex min-h-11 shrink-0 items-center gap-3 rounded-lg px-3.5 text-[12px] font-medium transition-colors ${active ? "bg-[#e7d3ac] text-[#17140f]" : "text-white/52 hover:bg-white/5 hover:text-white"}`}>
                  <Icon className="h-4 w-4" strokeWidth={1.7} /><span>{label}</span>
                  <ChevronRight className={`ml-auto hidden h-3.5 w-3.5 lg:block ${active ? "opacity-60" : "opacity-0 transition group-hover:opacity-40"}`} />
                </Link>
              );
            })}
          </nav>
          <div className="absolute bottom-0 left-0 right-0 hidden border-t border-white/10 p-4 lg:block">
            <div className="flex items-center gap-3 rounded-lg bg-white/[0.035] p-3">
              <CircleUserRound className="h-8 w-8 text-white/45" strokeWidth={1.25} />
              <div className="min-w-0"><p className="truncate text-xs font-medium">Store administrator</p><p className="mt-0.5 text-[10px] text-white/35">Protected session</p></div>
            </div>
          </div>
        </aside>
        <div className="min-w-0">
          <header className="flex h-[76px] items-center justify-between border-b border-white/10 px-5 md:px-8 lg:h-[88px]">
            <div><p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#d6b77f]">Grand operations</p><p className="mt-1 text-xs text-white/35">Commerce, content and security</p></div>
            <div className="hidden items-center gap-2 sm:flex"><span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,0.65)]" /><span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/45">Systems healthy</span></div>
          </header>
          <main className="p-5 md:p-8 xl:p-10">{children}</main>
        </div>
      </div>
    </div>
  );
}
