"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-12 w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] outline-none transition placeholder:text-muted-foreground/70 selection:bg-primary/20 disabled:cursor-not-allowed disabled:opacity-50 file:mr-4 file:rounded-full file:border-0 file:bg-primary/10 file:px-4 file:py-2 file:font-semibold file:text-primary hover:file:bg-primary/14 focus-visible:border-primary/40 focus-visible:ring-2 focus-visible:ring-primary/15 dark:border-white/10 dark:bg-white/4 dark:file:bg-primary/14 aria-invalid:border-destructive aria-invalid:ring-destructive/15",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
