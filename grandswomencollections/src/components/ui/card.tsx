import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("min-w-0 overflow-hidden break-words rounded-2xl border border-ink/10 bg-[#f8f5ef] shadow-[0_18px_55px_rgba(53,38,22,0.07)] dark:border-cream/10 dark:bg-[#15130f]", className)} {...props} />;
}
