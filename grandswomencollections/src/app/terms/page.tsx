import { SiteFooter } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/header";

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main className="container py-16">
        <h1 className="font-serif text-5xl text-ink dark:text-cream">Terms & Conditions</h1>
        <p className="mt-6 max-w-3xl text-sm leading-8 text-ink/65 dark:text-cream/65">Transaction terms, return windows, payment limitations, dispute resolution, and platform acceptable use terms belong here.</p>
      </main>
      <SiteFooter />
    </>
  );
}
