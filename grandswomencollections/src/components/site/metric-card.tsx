import { Card } from "@/components/ui/card";

export function MetricCard({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <Card className="p-6">
      <p className="text-xs uppercase tracking-[0.25em] text-ink/45 dark:text-cream/45">{label}</p>
      <p className="mt-4 font-serif text-4xl text-ink dark:text-cream">{value}</p>
      <p className="mt-3 text-sm text-ink/60 dark:text-cream/60">{hint}</p>
    </Card>
  );
}
