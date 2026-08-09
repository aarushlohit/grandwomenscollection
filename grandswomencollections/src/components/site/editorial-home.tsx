"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDownRight, ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/site/product-card";
import { categories, products } from "@/lib/data/catalog";

const reveal = {
  initial: { opacity: 0, transform: "translateY(28px)" },
  whileInView: { opacity: 1, transform: "translateY(0)" },
  viewport: { once: true, margin: "-12%" },
  transition: { duration: 0.78, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
};

const collectionStories = [
  { title: "The Kanchipuram Silks", note: "Handwoven brilliance", image: "/images/collection_sarees_1785319884762.png", href: "/category/sarees" },
  { title: "Temple Heritage Jewellery", note: "Sculpted in tradition", image: "/images/collection_jewelry_1785319899305.png", href: "/category/jewelry" },
  { title: "Festive Lehengas", note: "Ceremony, reimagined", image: "/images/collection_lehengas_1785319969542.png", href: "/category/wedding" }
];

const legacyCategories = [
  { title: "Bridal Occasions", note: "The grand entrance", image: categories[3].image, href: "/category/wedding" },
  { title: "Kanchipuram Sarees", note: "Woven in Kanchi", image: categories[1].image, href: "/category/sarees" },
  { title: "Festive Lehengas", note: "Colour in motion", image: "/images/collection_lehengas_1785319969542.png", href: "/category/traditional" },
  { title: "Temple Jewellery", note: "Future heirlooms", image: "/images/collection_jewelry_1785319899305.png", href: "/category/jewelry" }
];

const occasions = [
  { title: "Bridal", image: categories[3].image, href: "/category/wedding", className: "md:col-span-5 md:row-span-2" },
  { title: "Festive", image: categories[5].image, href: "/category/traditional", className: "md:col-span-3" },
  { title: "Wedding Guest", image: categories[0].image, href: "/category/occasionwear", className: "md:col-span-4" },
  { title: "Occasionwear", image: categories[4].image, href: "/category/party", className: "md:col-span-4" },
  { title: "Jewellery", image: categories[7].image, href: "/category/jewelry", className: "md:col-span-3" }
];

export function EditorialHome() {
  return (
    <div className="bg-[#f7f4ed] text-[#171310] dark:bg-[#171310] dark:text-[#f7f4ed]">
      <BrandStory />
      <Collections />
      <LegacyGrid />
      <Trending />
      <FeaturedEdit />
      <Craftsmanship />
      <Occasions />
      <Philosophy />
      <GrandLetter />
    </div>
  );
}

function BrandStory() {
  return <section className="editorial-section overflow-hidden py-[clamp(6rem,12vw,11rem)]">
    <div className="mx-auto grid max-w-[1480px] items-center gap-16 px-5 md:px-8 lg:grid-cols-[1.06fr_0.94fr] lg:gap-[clamp(4rem,8vw,9rem)] xl:px-10">
      <motion.div {...reveal} className="relative mx-auto w-full max-w-[720px] lg:mx-0">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[24px]"><Image src="/images/saree_editorial_1785319869961.png" alt="Grand Women’s Collections heritage saree editorial" fill className="object-cover" sizes="(max-width:1024px) 92vw, 52vw" /></div>
        <motion.div initial={{ opacity: 0, transform: "translateY(16px)" }} whileInView={{ opacity: 1, transform: "translateY(0)" }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }} className="absolute -bottom-8 right-4 w-[180px] rounded-2xl border border-[#281e16]/10 bg-[#f7f4ed]/74 p-5 shadow-[0_20px_60px_rgba(36,27,22,.13)] backdrop-blur-xl sm:right-8 sm:w-[220px] sm:p-6 dark:border-white/10 dark:bg-[#241b16]/75">
          <p className="font-serif text-5xl font-light text-[#b98a3d] sm:text-6xl">100+</p><p className="mt-3 text-[9px] font-semibold uppercase leading-4 tracking-[0.22em]">Years of zari heritage</p>
        </motion.div>
      </motion.div>
      <motion.div {...reveal} className="max-w-[620px] pt-8 lg:pt-0">
        <Kicker>The Grand Women&apos;s Story</Kicker>
        <h2 className="mt-7 font-serif text-[clamp(3.7rem,7vw,7.8rem)] font-light leading-[0.84] tracking-[-0.045em]">Where heritage<br />meets <em>modernity.</em></h2>
        <p className="mt-9 max-w-[34rem] text-[clamp(1rem,1.2vw,1.15rem)] leading-8 text-[#716b63] dark:text-[#eee9de]/64">Every piece is a conversation between South Indian craft and a modern woman’s life. Woven slowly. Chosen thoughtfully. Made to live beyond a season.</p>
        <div className="mt-12 grid grid-cols-3 border-t border-[#281e16]/12 pt-7 dark:border-white/12">
          {[["250+", "Weavers"], ["Kanchi", "Origin"], ["100%", "Pure silk"]].map(([value, label]) => <div key={label}><p className="font-serif text-[clamp(1.8rem,3vw,3rem)] text-[#b98a3d]">{value}</p><p className="mt-2 text-[8px] font-semibold uppercase tracking-[0.2em] text-[#716b63] dark:text-[#eee9de]/45">{label}</p></div>)}
        </div>
      </motion.div>
    </div>
  </section>;
}

function Collections() {
  return <section className="bg-[#eee9de] py-[clamp(6rem,12vw,11rem)] dark:bg-[#201915]">
    <div className="mx-auto max-w-[1480px] px-5 md:px-8 xl:px-10">
      <motion.div {...reveal} className="flex flex-col justify-between gap-8 md:flex-row md:items-end"><div><Kicker>House collections</Kicker><h2 className="mt-6 max-w-[12ch] font-serif text-[clamp(4rem,8vw,8.5rem)] font-light leading-[0.82] tracking-[-0.045em]">South Indian elegance, <em>redefined.</em></h2></div><p className="max-w-sm text-base leading-7 text-[#716b63] dark:text-[#eee9de]/58">Three worlds of craft. Each shaped by provenance, occasion and the pleasure of dressing beautifully.</p></motion.div>
      <div className="mt-[clamp(4rem,8vw,7rem)] grid gap-5 md:grid-cols-12">
        {collectionStories.map((story, index) => <motion.div key={story.title} {...reveal} className={index === 0 ? "md:col-span-5" : index === 1 ? "md:col-span-3 md:pt-24" : "md:col-span-4 md:pt-10"}><EditorialImageLink {...story} aspect={index === 1 ? "aspect-[3/5]" : "aspect-[4/5]"} /></motion.div>)}
      </div>
    </div>
  </section>;
}

function LegacyGrid() {
  return <section className="py-[clamp(6rem,12vw,11rem)]"><div className="mx-auto max-w-[1480px] px-5 md:px-8 xl:px-10">
    <motion.div {...reveal}><Kicker>Curated categories</Kicker><h2 className="mt-6 font-serif text-[clamp(4rem,8vw,8rem)] font-light leading-[0.84] tracking-[-0.045em]">Curated for<br /><em>your legacy.</em></h2></motion.div>
    <div className="mt-[clamp(4rem,8vw,7rem)] grid gap-4 md:grid-cols-[1.25fr_0.75fr] md:gap-6">
      <motion.div {...reveal}><EditorialImageLink {...legacyCategories[0]} aspect="aspect-[4/5] md:aspect-auto md:h-full" /></motion.div>
      <div className="grid gap-4 md:gap-6">{legacyCategories.slice(1).map((item, index) => <motion.div key={item.title} {...reveal}><EditorialImageLink {...item} aspect={index === 1 ? "aspect-[16/9] md:aspect-[16/7]" : "aspect-[16/9]"} compact /></motion.div>)}</div>
    </div>
  </div></section>;
}

function Trending() {
  return <section className="border-y border-[#281e16]/10 py-[clamp(6rem,12vw,10rem)] dark:border-white/10"><div className="mx-auto max-w-[1480px] px-5 md:px-8 xl:px-10">
    <motion.div {...reveal} className="flex items-end justify-between"><div><Kicker>Curated for you</Kicker><h2 className="mt-5 font-serif text-[clamp(4rem,7vw,7rem)] font-light leading-none tracking-[-0.045em]">Trending now.</h2></div><Link href="/shop" className="hidden min-h-12 items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.2em] md:flex">View all pieces <ArrowRight className="h-4 w-4" /></Link></motion.div>
    <div className="mt-14 grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 md:grid-cols-4 xl:gap-x-7">{products.slice(0, 4).map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}</div>
    <Link href="/shop" className="mt-10 flex min-h-12 items-center justify-center gap-3 border border-[#281e16]/12 text-[9px] font-semibold uppercase tracking-[0.2em] md:hidden dark:border-white/12">View all pieces <ArrowRight className="h-4 w-4" /></Link>
  </div></section>;
}

function FeaturedEdit() {
  return <section className="p-3 sm:p-5 md:p-8"><motion.div {...reveal} className="group relative min-h-[78svh] overflow-hidden rounded-[24px]">
    <Image src="/images/collection_lehengas_1785319969542.png" alt="The Grand bridal edit" fill className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.025]" sizes="100vw" />
    <div className="absolute inset-0 bg-gradient-to-r from-[#171310]/72 via-[#171310]/22 to-transparent" />
    <div className="relative flex min-h-[78svh] items-end px-6 py-12 text-[#f7f4ed] sm:px-10 md:px-[7vw] md:py-[7vw]"><div className="max-w-[720px]"><Kicker light>The Bridal Edit</Kicker><h2 className="mt-6 font-serif text-[clamp(4rem,8vw,8rem)] font-light leading-[0.83] tracking-[-0.045em]">Pieces made for the moments <em>you&apos;ll remember.</em></h2><Link href="/collections/heritage-series" className="mt-9 inline-flex min-h-12 items-center gap-3 rounded-full border border-white/35 bg-white/10 px-6 text-[9px] font-semibold uppercase tracking-[0.2em] backdrop-blur-lg transition-colors duration-200 hover:bg-[#f7f4ed] hover:text-[#171310]">Discover the edit <ArrowRight className="h-4 w-4" /></Link></div></div>
  </motion.div></section>;
}

function Craftsmanship() {
  return <section className="overflow-hidden bg-[#241b16] py-[clamp(6rem,12vw,11rem)] text-[#f7f4ed]"><div className="mx-auto max-w-[1480px] px-5 md:px-8 xl:px-10">
    <motion.div {...reveal} className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-end"><div><Kicker light>Crafted in India</Kicker><h2 className="mt-6 font-serif text-[clamp(4rem,8vw,8.4rem)] font-light leading-[0.82] tracking-[-0.045em]">Woven by hand.<br /><em>Made to be remembered.</em></h2></div><p className="max-w-md justify-self-end text-base leading-7 text-[#eee9de]/55">The softness of mulberry silk. The gleam of zari. The marks of human hands. These are details that cannot be hurried.</p></motion.div>
    <div className="mt-[clamp(4rem,9vw,8rem)] grid grid-cols-12 items-end gap-3 md:gap-6">
      <motion.div {...reveal} className="col-span-7 md:col-span-5"><CraftImage src="/images/collection_sarees_1785319884762.png" alt="Kanchipuram silk and zari detail" aspect="aspect-[4/5]" label="01 · Silk" /></motion.div>
      <motion.div {...reveal} className="col-span-5 mb-14 md:col-span-3 md:mb-24"><CraftImage src="/images/collection_jewelry_1785319899305.png" alt="Temple jewellery craftsmanship" aspect="aspect-[3/4]" label="02 · Metal" /></motion.div>
      <motion.div {...reveal} className="col-span-9 col-start-4 md:col-span-4 md:col-start-auto"><CraftImage src="/images/saree_editorial_1785319869961.png" alt="Finished handwoven saree" aspect="aspect-[4/5]" label="03 · Drape" /></motion.div>
    </div>
  </div></section>;
}

function Occasions() {
  return <section className="py-[clamp(6rem,12vw,11rem)]"><div className="mx-auto max-w-[1480px] px-5 md:px-8 xl:px-10">
    <motion.div {...reveal} className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><Kicker>The occasion directory</Kicker><h2 className="mt-5 font-serif text-[clamp(4rem,7vw,7rem)] font-light leading-none tracking-[-0.045em]">Dress for the memory.</h2></div><p className="max-w-xs text-sm leading-6 text-[#716b63] dark:text-[#eee9de]/55">A considered route into the collection, guided by where you are going.</p></motion.div>
    <div className="mt-14 grid auto-rows-[220px] gap-4 md:grid-cols-12 md:auto-rows-[260px]">{occasions.map((item) => <motion.div key={item.title} {...reveal} className={item.className}><EditorialImageLink {...item} aspect="h-full" compact /></motion.div>)}</div>
  </div></section>;
}

function Philosophy() {
  return <section className="border-y border-[#281e16]/10 px-5 py-[clamp(8rem,16vw,16rem)] text-center dark:border-white/10"><motion.div {...reveal} className="mx-auto max-w-[1100px]"><Kicker>Our philosophy</Kicker><blockquote className="mt-8 font-serif text-[clamp(4rem,9vw,9.5rem)] font-light leading-[0.82] tracking-[-0.05em]">“Tradition should not <em>stand still.</em>”</blockquote><p className="mx-auto mt-10 max-w-lg text-base leading-7 text-[#716b63] dark:text-[#eee9de]/55">We preserve what matters, and reinterpret it for today.</p></motion.div></section>;
}

function GrandLetter() {
  return <section className="bg-[#eee9de] py-[clamp(6rem,12vw,10rem)] dark:bg-[#201915]"><motion.div {...reveal} className="mx-auto grid max-w-[1480px] gap-10 px-5 md:grid-cols-[1fr_0.8fr] md:items-end md:px-8 xl:px-10"><div><Kicker>The Grand Letter</Kicker><h2 className="mt-6 max-w-[11ch] font-serif text-[clamp(4rem,7vw,7rem)] font-light leading-[0.84] tracking-[-0.045em]">Stories, collections and pieces <em>worth remembering.</em></h2></div><form className="border-b border-[#281e16]/30 pb-2 dark:border-white/25" onSubmit={(event) => event.preventDefault()}><label htmlFor="grand-letter" className="sr-only">Email address</label><div className="flex items-center gap-3"><input id="grand-letter" type="email" autoComplete="email" required placeholder="Your email address" className="min-h-14 flex-1 bg-transparent text-base outline-none placeholder:text-[#716b63]/65 dark:placeholder:text-[#eee9de]/35" /><button className="flex min-h-12 items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.18em]">Join the journal <ArrowRight className="h-4 w-4" /></button></div><p className="mt-3 text-[9px] tracking-[0.08em] text-[#716b63] dark:text-[#eee9de]/40">Occasional letters. No noise.</p></form></motion.div></section>;
}

function Kicker({ children, light = false }: { children: React.ReactNode; light?: boolean }) { return <p className={`text-[9px] font-semibold uppercase tracking-[0.32em] ${light ? "text-[#dec89f]" : "text-[#b98a3d]"}`}>{children}</p>; }

function EditorialImageLink({ title, note, image, href, aspect, compact = false }: { title: string; note?: string; image: string; href: string; aspect: string; compact?: boolean }) {
  return <Link href={href} className={`group relative block overflow-hidden rounded-[24px] ${aspect}`}><Image src={image} alt={title} fill className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.035]" sizes="(max-width:768px) 94vw, 50vw" /><div className="absolute inset-0 bg-gradient-to-t from-[#171310]/72 via-transparent to-transparent" /><div className={`absolute inset-x-0 bottom-0 text-[#f7f4ed] transition-transform duration-300 ease-[cubic-bezier(.23,1,.32,1)] group-hover:-translate-y-1 ${compact ? "p-5 md:p-6" : "p-6 md:p-8"}`}>{note && <p className="text-[8px] font-semibold uppercase tracking-[0.22em] text-[#dec89f]">{note}</p>}<div className={`${note ? "mt-2" : ""} flex items-end justify-between gap-4`}><h3 className={`${compact ? "text-[clamp(1.8rem,3vw,3rem)]" : "text-[clamp(2.2rem,4vw,4.5rem)]"} max-w-[12ch] font-serif font-light leading-[0.92] tracking-[-0.025em]`}>{title}</h3><ArrowDownRight className="h-5 w-5 shrink-0 opacity-60 transition-opacity group-hover:opacity-100" /></div></div></Link>;
}

function CraftImage({ src, alt, aspect, label }: { src: string; alt: string; aspect: string; label: string }) { return <figure><div className={`relative overflow-hidden rounded-[18px] ${aspect}`}><Image src={src} alt={alt} fill className="object-cover" sizes="50vw" /></div><figcaption className="mt-3 text-[8px] font-semibold uppercase tracking-[0.22em] text-[#eee9de]/45">{label}</figcaption></figure>; }
