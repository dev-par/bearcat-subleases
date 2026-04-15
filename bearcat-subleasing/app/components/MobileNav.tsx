"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import NavLinks from "./NavLinks";
import ThemeToggle from "./ThemeToggle";
import { PRIMARY_CTA } from "./nav-config";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        onClick={() => setOpen((current) => !current)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/80 bg-card/90 text-foreground shadow-card transition hover:border-primary/30 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open ? (
        <div
          id="mobile-nav-panel"
          className="absolute inset-x-0 top-[calc(100%+0.75rem)] rounded-[1.75rem] border border-border/80 bg-background/98 p-4 shadow-soft backdrop-blur xl:hidden"
        >
          <div className="flex flex-col gap-3">
            <NavLinks orientation="mobile" onNavigate={() => setOpen(false)} />
            <Link
              href={PRIMARY_CTA.href}
              onClick={() => setOpen(false)}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:bg-[color:var(--brand-primary-hover)]"
            >
              {PRIMARY_CTA.label}
            </Link>
            <ThemeToggle />
          </div>
        </div>
      ) : null}
    </div>
  );
}
