import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { ProductCard } from "@/components/site/product-card";
import { AddToCartButton } from "./add-to-cart-button";
import { products } from "@/lib/data/catalog";
import { formatCurrency } from "@/lib/utils";
import { Star, ShieldCheck, Sparkles, Truck } from "lucide-react";

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.title,
    description: product.description
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const related = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.collection === product.collection))
    .slice(0, 4);

  const discount = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  return (
    <>
      <SiteHeader />
      <main className="pt-[72px] bg-cream dark:bg-black min-h-screen transition-colors">
        <section className="container py-12 md:py-16">
          <nav className="mb-8 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink/40 dark:text-cream/40">
            <Link href="/" className="hover:text-gold">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-gold">Shop</Link>
            <span>/</span>
            <span className="text-gold font-bold">{product.title}</span>
          </nav>

          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            {/* Gallery */}
            <div className="grid gap-6 sm:grid-cols-2">
              {product.images.map((image, i) => (
                <div 
                  key={image.url} 
                  className={`relative overflow-hidden rounded-[2.5rem] glass-card border border-black/5 dark:border-white/10 shadow-xl ${
                    i === 0 ? "sm:col-span-2 aspect-[4/5]" : "aspect-[3/4]"
                  }`}
                >
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    priority={i === 0}
                    sizes="(max-width: 1024px) 100vw, 55vw"
                  />
                </div>
              ))}
            </div>

            {/* Product Details Sidebar */}
            <div className="lg:sticky lg:top-[100px] lg:self-start space-y-6">
              <div className="glass-card rounded-[2.5rem] p-8 md:p-10 border border-black/5 dark:border-white/10 space-y-6">
                <div>
                  <span className="glass-pill px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.25em] text-gold">
                    {product.collection || "Pure Handloom"}
                  </span>
                  <h1 className="mt-3 font-serif text-4xl md:text-5xl text-ink dark:text-cream leading-tight">{product.title}</h1>
                  <p className="mt-2 text-sm text-ink/60 dark:text-cream/60 font-light">{product.subtitle}</p>

                  <div className="mt-4 flex items-center gap-2">
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-gold text-gold" : "text-black/10 dark:text-white/10"}`} />
                      ))}
                    </div>
                    <span className="text-xs font-semibold text-ink/60 dark:text-cream/60">{product.rating} ({product.reviewCount} Reviews)</span>
                  </div>
                </div>

                <div className="flex items-baseline gap-4 pt-2">
                  <p className="font-serif text-4xl font-bold text-ink dark:text-cream">{formatCurrency(product.price)}</p>
                  {product.compareAtPrice && (
                    <>
                      <p className="text-lg text-ink/40 line-through dark:text-cream/40">{formatCurrency(product.compareAtPrice)}</p>
                      <span className="glass-pill px-3 py-1 rounded-full text-xs font-bold text-rose-500">-{discount}% OFF</span>
                    </>
                  )}
                </div>

                <p className="text-sm leading-relaxed text-ink/70 dark:text-cream/70 font-light">{product.description}</p>

                <AddToCartButton product={product} />

                <div className="space-y-4 pt-2">
                  <div className="glass-card rounded-2xl p-5 border border-black/5 dark:border-white/10">
                    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold mb-3">Color Options</p>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((color) => (
                        <span key={color} className="glass-pill px-4 py-2 rounded-full text-xs font-medium">{color}</span>
                      ))}
                    </div>
                  </div>

                  <div className="glass-card rounded-2xl p-5 border border-black/5 dark:border-white/10">
                    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold mb-3">Specifications</p>
                    <ul className="space-y-2">
                      {product.specifications.map((spec) => (
                        <li key={spec} className="flex items-center gap-2.5 text-xs text-ink/70 dark:text-cream/70">
                          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                          {spec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-ink/50 dark:text-cream/50 pt-2 border-t border-black/5 dark:border-white/10">
                  <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-gold" /> Silk Mark Certified</span>
                  <span className="flex items-center gap-1.5"><Truck className="h-4 w-4 text-gold" /> Insured Pan-India Express</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section className="container border-t border-black/5 dark:border-white/10 py-16">
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-gold block mb-2">Complements Your Drape</span>
            <h2 className="font-serif text-4xl text-ink dark:text-cream mb-10">You May Also Cherish</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
