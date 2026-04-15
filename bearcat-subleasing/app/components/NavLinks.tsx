"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { NAV_ITEMS } from "./nav-config";

function isActive(pathname: string, href: string, match: "exact" | "prefix") {
  if (match === "exact") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

interface NavLinksProps {
  orientation?: "desktop" | "mobile";
  onNavigate?: () => void;
}

export default function NavLinks({
  orientation = "desktop",
  onNavigate,
}: NavLinksProps) {
  const pathname = usePathname();

  return (
    <div
      className={
        orientation === "desktop"
          ? "hidden items-center gap-2 md:flex"
          : "flex flex-col items-stretch gap-2"
      }
    >
      {NAV_ITEMS.map((item) => {
        const active = isActive(pathname, item.href, item.match);

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={
              orientation === "desktop"
                ? `rounded-full px-4 py-2 text-sm font-semibold transition ${
                    active
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/15"
                      : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                  }`
                : `rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                    active
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/15"
                      : "bg-muted/45 text-foreground hover:bg-muted/70"
                  }`
            }
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
