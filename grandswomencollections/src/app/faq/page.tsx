import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";

export const metadata = { title: "Frequently Asked Questions" };

const faqs = [
  {
    q: "How do I find my size?",
    a: "Each product page includes a detailed size guide. For personalized assistance, use our AI Stylist or reach out to our personal shopping team."
  },
  {
    q: "What is your return policy?",
    a: "We offer a 15-day return policy for unworn items with tags attached. Customized and sale items are final sale. Visit our Returns page for full details."
  },
  {
    q: "How long does shipping take?",
    a: "Standard delivery takes 5-7 business days. Express delivery (2-3 days) and next-day delivery are available at checkout for select pin codes."
  },
  {
    q: "Do you ship internationally?",
    a: "Yes, we ship to over 45 countries. International shipping rates and delivery times are calculated at checkout."
  },
  {
    q: "Can I get personal styling advice?",
    a: "Absolutely! Our AI Stylist is available 24/7 for instant recommendations. For deeper consultations, book a session with our human stylists via the Contact page."
  },
  {
    q: "Are the products authentic?",
    a: "Every piece is designed and manufactured in-house or by our certified artisan partners. We guarantee authenticity and provide certificates for fine jewelry."
  },
  {
    q: "How do I track my order?",
    a: "Once your order ships, you'll receive a tracking link via email and SMS. You can also track orders in your account dashboard."
  },
  {
    q: "Do you offer gift wrapping?",
    a: "Yes, all orders come in our signature luxury packaging. Gift wrapping with a personalized note is available at checkout."
  }
];

export default function FAQPage() {
  return (
    <>
      <SiteHeader />
      <main className="pt-20">
        <section className="relative overflow-hidden bg-ink py-20 dark:bg-[#0a0a0a]">
          <div className="container relative z-10 py-12 text-center">
            <p className="text-[11px] uppercase tracking-[0.4em] text-gold">Help</p>
            <h1 className="mt-4 font-serif text-editorial text-cream">FAQ</h1>
          </div>
        </section>

        <section className="container py-16">
          <div className="mx-auto max-w-3xl space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group rounded-2xl border border-ink/5 bg-cream/50 dark:border-cream/5 dark:bg-cream/5">
                <summary className="flex cursor-pointer items-center justify-between p-6 text-ink dark:text-cream">
                  <span className="font-serif text-lg pr-4">{faq.q}</span>
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-ink/5 text-ink/40 transition-transform group-open:rotate-45 dark:bg-cream/5 dark:text-cream/40">+</span>
                </summary>
                <div className="px-6 pb-6 text-[15px] leading-7 text-ink/55 dark:text-cream/55">{faq.a}</div>
              </details>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
