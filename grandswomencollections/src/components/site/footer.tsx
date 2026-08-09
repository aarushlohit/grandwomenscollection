import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const groups = [
  { title: "Shop", links: [["/collections", "Collections"], ["/category/sarees", "Sarees"], ["/category/wedding", "Lehengas"], ["/category/jewelry", "Jewellery"]] },
  { title: "About", links: [["/about", "Our Story"], ["/about#craft", "Craftsmanship"], ["/collections", "Journal"]] },
  { title: "Help", links: [["/contact", "Contact"], ["/shipping", "Shipping"], ["/returns", "Returns"], ["/faq", "FAQ"]] },
  { title: "Social", links: [["#", "Instagram"], ["#", "Pinterest"]] }
] as const;

export function SiteFooter() {
  return <footer className="bg-[#241b16] text-[#f7f4ed]">
    <div className="mx-auto max-w-[1480px] px-5 pb-8 pt-[clamp(5rem,10vw,9rem)] md:px-8 xl:px-10">
      <div className="grid gap-16 lg:grid-cols-[1.15fr_1.85fr]">
        <div><Link href="/" className="inline-flex min-h-12 items-center font-serif text-[clamp(3.5rem,7vw,7.5rem)] font-light leading-none tracking-[0.16em]">GRAND</Link><p className="mt-6 max-w-sm text-sm leading-7 text-[#eee9de]/52">South Indian craft, curated with a modern eye. Pieces for celebration, memory and legacy.</p><p className="mt-8 text-[9px] font-semibold uppercase tracking-[0.28em] text-[#dec89f]">Coimbatore · Tamil Nadu · India</p></div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-4">{groups.map((group) => <div key={group.title}><h3 className="text-[9px] font-semibold uppercase tracking-[0.26em] text-[#dec89f]">{group.title}</h3><ul className="mt-6 space-y-1">{group.links.map(([href, label]) => <li key={label}><Link href={href} className="group flex min-h-10 items-center gap-1.5 text-sm text-[#eee9de]/58 transition-colors duration-150 hover:text-[#f7f4ed]">{label}{group.title === "Social" && <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-70" />}</Link></li>)}</ul></div>)}</div>
      </div>
      <div className="mt-[clamp(5rem,10vw,9rem)] flex flex-col gap-5 border-t border-white/10 pt-7 text-[9px] font-medium uppercase tracking-[0.16em] text-[#eee9de]/34 sm:flex-row sm:items-center sm:justify-between"><p>© {new Date().getFullYear()} Grand Women&apos;s Collections</p><div className="flex gap-6"><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div></div>
    </div>
  </footer>;
}
