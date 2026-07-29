import { MetricCard } from "@/components/site/metric-card";
import { Card } from "@/components/ui/card";
import { getDashboardMetrics } from "@/lib/site";

export default function AdminDashboardPage() {
  const metrics = getDashboardMetrics();

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-white/45">Dashboard</p>
        <h1 className="mt-3 font-serif text-5xl">Commercial overview</h1>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Revenue" value={`₹${metrics.revenue.toLocaleString("en-IN")}`} hint="Net platform revenue this month." />
        <MetricCard label="Orders" value={String(metrics.orders)} hint="Orders across storefront and assisted sales." />
        <MetricCard label="AOV" value={`₹${metrics.averageOrderValue.toLocaleString("en-IN")}`} hint="Average order value." />
        <MetricCard label="Conversion" value={`${metrics.conversionRate}%`} hint="Product page to order conversion." />
      </div>
      <Card className="p-6 text-black">
        Product, coupon, content, and AI controls are separated into dedicated admin routes so the customer storefront stays clean.
      </Card>
    </div>
  );
}
