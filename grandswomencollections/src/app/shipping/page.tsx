import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";

export const metadata = { title: "Shipping Policy" };

export default function ShippingPage() {
  return (
    <>
      <SiteHeader />
      <main className="pt-[72px]">
        <section className="container py-16">
          <h1 className="font-serif text-editorial text-ink dark:text-cream">Shipping Policy</h1>
          <div className="prose mt-10 max-w-3xl space-y-8 text-[15px] leading-8 text-ink/60 dark:text-cream/60">
            <div>
              <h2 className="mb-3 font-serif text-2xl text-ink dark:text-cream">Domestic Shipping</h2>
              <p>Standard delivery: 5-7 business days. Express delivery: 2-3 business days. Next-day delivery available for select pin codes in Mumbai, Delhi, Bangalore, and Kolkata.</p>
            </div>
            <div>
              <h2 className="mb-3 font-serif text-2xl text-ink dark:text-cream">Free Shipping</h2>
              <p>Complimentary standard shipping on all domestic orders above ₹15,000. Express and next-day upgrades are available at checkout for a nominal fee.</p>
            </div>
            <div>
              <h2 className="mb-3 font-serif text-2xl text-ink dark:text-cream">International Shipping</h2>
              <p>We ship to over 45 countries worldwide. International orders are delivered within 7-14 business days depending on the destination. Duties and taxes are the responsibility of the recipient.</p>
            </div>
            <div>
              <h2 className="mb-3 font-serif text-2xl text-ink dark:text-cream">Luxury Packaging</h2>
              <p>Every order is packaged in our signature luxury box with tissue paper, a handwritten note option, and protective garment bags. Gift wrapping is available at checkout.</p>
            </div>
            <div>
              <h2 className="mb-3 font-serif text-2xl text-ink dark:text-cream">Order Tracking</h2>
              <p>Track your order in real-time through your account dashboard or via the tracking link sent to your email and phone once your order ships.</p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
