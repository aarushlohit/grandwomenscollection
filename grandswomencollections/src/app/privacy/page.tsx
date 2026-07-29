import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";

export const metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="pt-[72px]">
        <section className="container py-16">
          <h1 className="font-serif text-editorial text-ink dark:text-cream">Privacy Policy</h1>
          <p className="mt-2 text-sm text-ink/40 dark:text-cream/40">Last updated: July 2026</p>
          <div className="prose mt-10 max-w-3xl space-y-8 text-[15px] leading-8 text-ink/60 dark:text-cream/60">
            <div>
              <h2 className="mb-3 font-serif text-2xl text-ink dark:text-cream">Information We Collect</h2>
              <p>We collect information you provide directly, including your name, email address, shipping address, payment details, and styling preferences. We also collect usage data through cookies and analytics to improve your experience.</p>
            </div>
            <div>
              <h2 className="mb-3 font-serif text-2xl text-ink dark:text-cream">How We Use Your Information</h2>
              <p>Your information is used to process orders, provide personalized styling recommendations, send order updates, and improve our services. We never sell your personal data to third parties.</p>
            </div>
            <div>
              <h2 className="mb-3 font-serif text-2xl text-ink dark:text-cream">Data Security</h2>
              <p>We implement enterprise-grade security measures including encryption, secure servers, and regular security audits. All payment processing is handled through PCI-compliant providers.</p>
            </div>
            <div>
              <h2 className="mb-3 font-serif text-2xl text-ink dark:text-cream">Your Rights</h2>
              <p>You can access, update, or delete your personal data at any time by contacting our privacy team. We respond to all requests within 30 days.</p>
            </div>
            <div>
              <h2 className="mb-3 font-serif text-2xl text-ink dark:text-cream">Contact</h2>
              <p>For privacy-related inquiries, please contact privacy@grandwomenscollections.com</p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
