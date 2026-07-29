import { featuredReviews } from "@/lib/data/catalog";
import { Card } from "@/components/ui/card";

export function ReviewList() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {featuredReviews.map((review) => (
        <Card key={review.id} className="p-6">
          <p className="text-sm uppercase tracking-[0.25em] text-ink/45 dark:text-cream/45">{review.userName}</p>
          <p className="mt-3 text-lg text-ink dark:text-cream">{review.comment}</p>
          <p className="mt-4 text-sm text-ink/55 dark:text-cream/55">{review.rating}/5</p>
        </Card>
      ))}
    </div>
  );
}
