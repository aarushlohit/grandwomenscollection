import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, LockKeyhole } from "lucide-react";

export function AuthShell({ eyebrow, title, description, children, footer }: { eyebrow: string; title: string; description: string; children: ReactNode; footer?: ReactNode }) {
  return (
    <main className="grid min-h-[100dvh] bg-[#f5f0e8] lg:grid-cols-[minmax(0,0.9fr)_minmax(34rem,1.1fr)] dark:bg-[#0d0c0a]">
      <div className="relative hidden overflow-hidden lg:block">
        <Image src="/images/saree_editorial_1785319869961.png" alt="Grand Women’s Collections silk editorial" fill priority className="object-cover" sizes="45vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-black/15" />
        <div className="absolute inset-x-0 bottom-0 p-12 xl:p-16">
          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-gold-light">Grand Women&apos;s Collections</p>
          <p className="mt-5 max-w-lg font-serif text-5xl font-light leading-[0.95] tracking-[-0.03em] text-white xl:text-6xl">A private wardrobe of pieces worth keeping.</p>
        </div>
      </div>
      <div className="flex min-h-[100dvh] flex-col px-5 py-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex min-h-11 items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/55 hover:text-ink dark:text-cream/55 dark:hover:text-cream"><ArrowLeft className="h-4 w-4" /> Store</Link>
          <span className="font-serif text-xl tracking-[0.28em] text-ink dark:text-cream">GRAND</span>
        </div>
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-16">
          <p className="editorial-kicker">{eyebrow}</p>
          <h1 className="mt-4 font-serif text-[clamp(3.25rem,6vw,5.5rem)] font-light leading-[0.86] tracking-[-0.04em] text-ink dark:text-cream">{title}</h1>
          <p className="mt-6 max-w-sm text-sm leading-6 text-ink/55 dark:text-cream/55">{description}</p>
          <div className="mt-9">{children}</div>
          {footer && <div className="mt-7 border-t border-ink/10 pt-6 text-sm text-ink/55 dark:border-cream/10 dark:text-cream/55">{footer}</div>}
        </div>
        <p className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.16em] text-ink/35 dark:text-cream/35"><LockKeyhole className="h-3.5 w-3.5" /> Secure Firebase authentication</p>
      </div>
    </main>
  );
}
