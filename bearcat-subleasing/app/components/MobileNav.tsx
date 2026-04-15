"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import NavLinks from "./NavLinks";
import ThemeToggle from "./ThemeToggle";
import { PRIMARY_CTA } from "./nav-config";
import { Button } from "@/components/ui/button";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <Button
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        onClick={() => setOpen((current) => !current)}
        variant="outline"
        size="icon"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {open ? (
        <div
          id="mobile-nav-panel"
          className="absolute inset-x-0 top-[calc(100%+0.75rem)] rounded-[1.75rem] border border-border/80 bg-background/98 p-4 shadow-soft backdrop-blur xl:hidden"
        >
          <div className="flex flex-col gap-3">
            <NavLinks orientation="mobile" onNavigate={() => setOpen(false)} />
            <Button asChild size="lg">
              <Link href={PRIMARY_CTA.href} onClick={() => setOpen(false)}>
                {PRIMARY_CTA.label}
              </Link>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      ) : null}
    </div>
  );
}
