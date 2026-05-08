import Link from "next/link";

import AuthNav from "./AuthNav";
import MobileNav from "./MobileNav";
import NavLinks from "./NavLinks";
import ThemeToggle from "./ThemeToggle";
import { PRIMARY_CTA } from "./nav-config";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/78 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-primary/12 bg-primary/10 text-primary ring-1 ring-primary/15 dark:border-primary/25 dark:bg-primary/12 dark:ring-primary/20">
            <span className="flex items-center gap-1">
              <span className="h-2.5 w-2.5 rounded-full bg-primary" />
              <span className="h-2.5 w-2.5 rounded-full bg-primary/55" />
            </span>
          </span>
          <div className="min-w-0">
            <p className="truncate text-base font-semibold tracking-tight text-foreground sm:text-lg">
              Bearcat Subleasing
            </p>
            <p className="hidden text-xs text-muted-foreground sm:block">
              Cincinnati student housing, built to scan fast.
            </p>
          </div>
        </Link>

        <div className="relative flex items-center gap-3">
          <NavLinks />

          <div className="hidden items-center gap-3 md:flex">
            <ThemeToggle />
            <AuthNav />
            <Button asChild>
              <Link href={PRIMARY_CTA.href}>{PRIMARY_CTA.label}</Link>
            </Button>
          </div>

          <MobileNav />
        </div>
      </div>
    </header>
  );
}
