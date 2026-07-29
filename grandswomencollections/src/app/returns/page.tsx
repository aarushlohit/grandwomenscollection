import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";

export const metadata = { title: "Returns & Exchanges" };

export default function ReturnsPage() {
  return (
    <>
      <SiteHeader />
      <main className="pt-[72px]">
        <section className="container py-16">
          <h1 className="font-serif text-editorial text-ink dark:text-cream">Returns &amp; Exchanges</h1>
          <div className="prose mt-10 max-w-3xl space-y-8 text-[15px] leading-8 text-ink/60 dark:text-cream/60">
            <div>
              <h2 className="mb-3 font-serif text-2xl text-ink dark:text-cream">Return Policy</h2>
              <p>We want you to love your purchase. If something isn&apos;t right, returns are accepted within 15 days of delivery. Items must be unworn, with original tags and packaging intact.</p>
            </div>
            <div>
              <h2 className="mb-3 font-serif text-2xl text-ink dark:text-cream">How to Initiate a Return</h2>
              <p>Contact our customer care team via email or phone with your order number. We&apos;ll arrange a complimentary pickup and process your refund within 5-7 business days of receiving the item.</p>
            </div>
            <div>
              <h2 className="mb-3 font-serif text-2xl text-ink dark:text-cream">Exchanges</h2>
              <p>We offer free size exchanges subject to availability. If your preferred size is out of stock, we&apos;ll issue a store credit or full refund.</p>
            </div>
            <div>
              <h2 className="mb-3 font-serif text-2xl text-ink dark:text-cream">Non-Returnable Items</h2>
              <p>Customized orders, sale items, and intimate apparel are final sale. Fine jewelry with opened seals cannot be returned for hygiene reasons.</p>
            </div>
            <div>
              <h2 className="mb-3 font-serif text-2xl text-ink dark:text-cream">Refunds</h2>
              <p>Refunds are processed to the original payment method within 5-7 business days. Store credits are issued immediately upon return approval.</p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
