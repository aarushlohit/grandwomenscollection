import * as React from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "flex h-12 w-full rounded-full border border-ink/10 bg-white/80 px-4 py-2 text-sm text-ink outline-none ring-0 placeholder:text-ink/45 focus:border-ink/30",
        className
      )}
      {...props}
    />
  );
}
