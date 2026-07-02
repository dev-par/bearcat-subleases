"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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

  if (orientation === "mobile") {
    return (
      <>
        {NAV_ITEMS.map((item) => {
          const active = isActive(pathname, item.href, item.match);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={cn(
                "w-full py-3 text-base font-medium transition-colors",
                active
                  ? "font-semibold text-primary"
                  : "text-foreground hover:text-primary",
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </>
    );
  }

  return (
    <div className="hidden items-center gap-2 md:flex">
      {NAV_ITEMS.map((item) => {
        const active = isActive(pathname, item.href, item.match);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              buttonVariants({
                variant: active ? "default" : "ghost",
                size: "sm",
              }),
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
