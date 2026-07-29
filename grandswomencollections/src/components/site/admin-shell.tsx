import Link from "next/link";
import type { ReactNode } from "react";

const adminLinks = [
  ["/admin", "Dashboard"],
  ["/admin/products", "Products"],
  ["/admin/orders", "Orders"],
  ["/admin/customers", "Customers"],
  ["/admin/inventory", "Inventory"],
  ["/admin/coupons", "Coupons"],
  ["/admin/banners", "Banners"],
  ["/admin/collections", "Collections"],
  ["/admin/settings", "Settings"],
  ["/admin/ai", "AI"],
  ["/admin/soc", "SOC Dashboard"]
] as const;

export function AdminShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      <div className="grid min-h-screen lg:grid-cols-[260px_1fr]">
        <aside className="border-r border-white/10 p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Admin Control</p>
          <p className="mt-3 font-serif text-3xl">Grand Console</p>
          <nav className="mt-8 grid gap-2">
            {adminLinks.map(([href, label]) => (
              <Link key={href} href={href} className="rounded-2xl border border-transparent px-4 py-3 text-sm text-white/70 transition hover:border-white/10 hover:bg-white/5 hover:text-white">
                {label}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="p-6 lg:p-10">{children}</main>
      </div>
    </div>
  );
}
