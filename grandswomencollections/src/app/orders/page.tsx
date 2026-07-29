import { SiteFooter } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/header";
import { Card } from "@/components/ui/card";

export default function OrdersPage() {
  return (
    <>
      <SiteHeader />
      <main className="container py-16">
        <h1 className="font-serif text-5xl text-ink dark:text-cream">Orders</h1>
        <Card className="mt-8 p-8 text-sm text-ink/65 dark:text-cream/65">
          Timeline tracking, invoice access, support escalation, and return initiation fit into this order history surface.
        </Card>
      </main>
      <SiteFooter />
    </>
  );
}
