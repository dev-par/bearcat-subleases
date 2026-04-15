"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "border-border bg-muted text-muted-foreground dark:border-white/8 dark:bg-white/4",
        accent: "border-accent/60 bg-accent/40 text-accent-foreground",
        verified:
          "border-[color:var(--verified)]/30 bg-[color:var(--verified)]/10 text-[color:var(--verified)]",
        owner:
          "border-[color:var(--owner)]/40 bg-[color:var(--owner)]/16 text-[color:var(--owner-foreground)]",
        admin:
          "border-[color:var(--admin)]/25 bg-[color:var(--admin)]/12 text-[color:var(--admin-foreground)]",
        destructive:
          "border-destructive/30 bg-destructive/10 text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
