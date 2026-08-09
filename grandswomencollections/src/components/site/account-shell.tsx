import Link from "next/link";
import type { ReactNode } from "react";
import { Heart, MapPin, Package, ShieldCheck, UserRound } from "lucide-react";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";

const links = [["/profile", "Profile", UserRound], ["/orders", "Orders", Package], ["/wishlist", "Wishlist", Heart]] as const;

export function AccountShell({ eyebrow, title, active, children }: { eyebrow: string; title: string; active: string; children: ReactNode }) {
  return <><SiteHeader /><main className="min-h-[75svh] pt-20"><section className="container py-12 md:py-20"><p className="editorial-kicker">{eyebrow}</p><h1 className="mt-3 font-serif text-[clamp(3.5rem,7vw,7rem)] font-light leading-none tracking-[-0.04em] text-ink dark:text-cream">{title}</h1><div className="mt-10 grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)]"><aside><nav className="flex gap-2 overflow-x-auto border-b border-ink/10 pb-4 lg:grid lg:border-b-0 lg:border-r lg:pb-0 lg:pr-6 dark:border-cream/10">{links.map(([href,label,Icon])=><Link key={href} href={href} className={`flex min-h-12 shrink-0 items-center gap-3 rounded-md px-4 text-xs font-semibold ${active===href?"bg-ink text-cream dark:bg-cream dark:text-ink":"text-ink/50 hover:bg-ink/5 hover:text-ink dark:text-cream/50 dark:hover:bg-cream/5 dark:hover:text-cream"}`}><Icon className="h-4 w-4" />{label}</Link>)}</nav></aside><div className="min-w-0">{children}</div></div></section></main><SiteFooter /></>;
}

export function AccountEmptyState({ icon = "profile", title, description }: { icon?: "profile" | "order"; title: string; description: string }) {
  const Icon = icon === "order" ? Package : MapPin;
  return <div className="border-y border-ink/10 py-14 dark:border-cream/10"><Icon className="h-7 w-7 text-gold-dark dark:text-gold" strokeWidth={1.4} /><h2 className="mt-6 font-serif text-4xl text-ink dark:text-cream">{title}</h2><p className="mt-3 max-w-xl text-sm leading-6 text-ink/55 dark:text-cream/55">{description}</p><div className="mt-7 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/35 dark:text-cream/35"><ShieldCheck className="h-4 w-4" /> Protected customer information</div></div>;
}
