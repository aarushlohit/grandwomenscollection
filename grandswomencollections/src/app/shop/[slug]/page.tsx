import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronDown, RotateCcw, ShieldCheck, Star, Truck } from "lucide-react";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { ProductCard } from "@/components/site/product-card";
import { AddToCartButton } from "./add-to-cart-button";
import { products } from "@/lib/data/catalog";
import { formatCurrency } from "@/lib/utils";

export async function generateStaticParams() { return products.map((product) => ({ slug: product.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  return product ? { title: product.title, description: product.description } : { title: "Product Not Found" };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) notFound();
  const related = products.filter((item) => item.id !== product.id && (item.category === product.category || item.collection === product.collection)).slice(0, 4);
  const discount = product.compareAtPrice ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100) : 0;

  return <><SiteHeader /><main className="min-h-screen bg-[#f7f4ed] pt-28 text-[#171310] dark:bg-[#171310] dark:text-[#f7f4ed]">
    <div className="mx-auto max-w-[1480px] px-5 pb-[clamp(6rem,10vw,10rem)] md:px-8 xl:px-10">
      <nav className="mb-8 flex flex-wrap items-center gap-2 text-[8px] font-semibold uppercase tracking-[0.2em] text-[#716b63] dark:text-[#eee9de]/42"><Link href="/">Home</Link><span>/</span><Link href="/shop">Collection</Link><span>/</span><span className="text-[#171310] dark:text-[#f7f4ed]">{product.title}</span></nav>
      <div className="grid gap-10 lg:grid-cols-[1.12fr_0.88fr] xl:gap-20">
        <div className="grid gap-4 sm:grid-cols-2">{product.images.map((image, index) => <figure key={image.url} className={`relative overflow-hidden rounded-[20px] bg-[#eee9de] dark:bg-[#241b16] ${index === 0 ? "aspect-[4/5] sm:col-span-2" : "aspect-[3/4]"}`}><Image src={image.url} alt={image.alt} fill priority={index === 0} className="object-cover" sizes="(max-width:1024px) 94vw, 58vw" /><figcaption className="sr-only">{image.alt}</figcaption></figure>)}</div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#b98a3d]">{product.collection.replaceAll("-", " ")}</p>
          <h1 className="mt-5 font-serif text-[clamp(3.5rem,5.5vw,6rem)] font-light leading-[0.86] tracking-[-0.045em]">{product.title}</h1>
          <p className="mt-5 text-base leading-7 text-[#716b63] dark:text-[#eee9de]/55">{product.subtitle}</p>
          <div className="mt-6 flex items-center gap-3"><div className="flex gap-0.5" aria-label={`${product.rating} out of 5 stars`}>{Array.from({ length: 5 }).map((_, index) => <Star key={index} className={`h-3.5 w-3.5 ${index < Math.floor(product.rating) ? "fill-[#b98a3d] text-[#b98a3d]" : "text-[#716b63]/25"}`} />)}</div><span className="text-[10px] font-medium text-[#716b63] dark:text-[#eee9de]/45">{product.rating} · {product.reviewCount} reviews</span></div>
          <div className="mt-8 flex flex-wrap items-baseline gap-3 border-b border-[#281e16]/12 pb-8 dark:border-white/12"><p className="text-xl font-semibold">{formatCurrency(product.price)}</p>{product.compareAtPrice && <><p className="text-sm text-[#716b63] line-through">{formatCurrency(product.compareAtPrice)}</p><span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#b98a3d]">Save {discount}%</span></>}</div>
          <p className="my-8 text-[15px] leading-7 text-[#716b63] dark:text-[#eee9de]/58">{product.description}</p>
          <AddToCartButton product={product} />
          <div className="mt-8 grid gap-3 border-y border-[#281e16]/12 py-6 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 dark:border-white/12"><Trust icon={<Truck />} title="Insured delivery" copy="Pan-India dispatch" /><Trust icon={<RotateCcw />} title="Considered returns" copy="7-day request window" /><Trust icon={<ShieldCheck />} title="Authentic craft" copy="Quality verified" /></div>
          <div className="divide-y divide-[#281e16]/12 dark:divide-white/12"><ProductDisclosure title="The story"><p>{product.description}</p></ProductDisclosure><ProductDisclosure title="Craft & details"><ul>{product.specifications.map((item) => <li key={item}>— {item}</li>)}</ul></ProductDisclosure><ProductDisclosure title="Care"><p>Store folded in breathable cotton. Keep away from moisture and perfume. Specialist dry clean where recommended.</p></ProductDisclosure></div>
          <p className={`mt-6 text-[9px] font-semibold uppercase tracking-[0.16em] ${product.stock <= 5 ? "text-rose-700" : "text-[#716b63] dark:text-[#eee9de]/40"}`}>{product.stock <= 5 ? `Only ${product.stock} pieces remain` : `${product.stock} pieces available`}</p>
        </aside>
      </div>
    </div>

    <section className="bg-[#eee9de] py-[clamp(6rem,10vw,9rem)] dark:bg-[#201915]"><div className="mx-auto max-w-[1100px] px-5 text-center md:px-8"><p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#b98a3d]">Product story</p><h2 className="mt-6 font-serif text-[clamp(3.8rem,7vw,7rem)] font-light leading-[0.85] tracking-[-0.045em]">Made slowly.<br /><em>Worn forever.</em></h2><p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-[#716b63] dark:text-[#eee9de]/55">From material selection to the final hand finish, this piece has passed through expert hands. The result is not simply clothing, but an object of memory.</p></div></section>

    {related.length > 0 && <section className="mx-auto max-w-[1480px] px-5 py-[clamp(6rem,10vw,10rem)] md:px-8 xl:px-10"><p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#b98a3d]">Continue the story</p><h2 className="mt-5 font-serif text-[clamp(3.7rem,6vw,6.5rem)] font-light leading-none tracking-[-0.04em]">You may also cherish.</h2><div className="mt-12 grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-4 md:gap-x-6">{related.map((item, index) => <ProductCard key={item.id} product={item} index={index} />)}</div></section>}
  </main><SiteFooter /></>;
}

function Trust({ icon, title, copy }: { icon: React.ReactElement; title: string; copy: string }) { return <div className="flex items-center gap-3 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:stroke-[1.5] [&_svg]:text-[#b98a3d]"><span>{icon}</span><div><p className="text-[10px] font-semibold">{title}</p><p className="mt-0.5 text-[9px] text-[#716b63] dark:text-[#eee9de]/38">{copy}</p></div></div>; }
function ProductDisclosure({ title, children }: { title: string; children: React.ReactNode }) { return <details className="group py-5"><summary className="flex min-h-11 cursor-pointer list-none items-center justify-between text-[9px] font-semibold uppercase tracking-[0.2em]"><span>{title}</span><ChevronDown className="h-4 w-4 transition-transform duration-200 group-open:rotate-180" /></summary><div className="max-w-lg pb-2 pt-3 text-sm leading-7 text-[#716b63] dark:text-[#eee9de]/52">{children}</div></details>; }
