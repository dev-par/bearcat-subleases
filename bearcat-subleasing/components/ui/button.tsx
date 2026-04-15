"use client";

import * as React from "react";
import { Slot } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-[color:var(--brand-primary-hover)] dark:shadow-primary/15",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline:
          "border border-border/80 bg-card/90 text-foreground shadow-card hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary dark:border-white/8 dark:bg-card/92",
        ghost:
          "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
        destructive:
          "bg-[#8f1326] text-white shadow-lg shadow-[#8f1326]/18 hover:bg-[#78101f] dark:bg-[#ad2740] dark:text-white dark:shadow-[#ad2740]/16 dark:hover:bg-[#921f35]",
        accent:
          "border border-border/70 bg-accent/55 text-accent-foreground hover:bg-accent/75",
      },
      size: {
        default: "min-h-11 px-5 py-3",
        sm: "min-h-9 px-4 py-2 text-xs",
        lg: "min-h-12 px-6 py-3.5 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
