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
            className={cn(
              buttonVariants({
                variant: active ? "default" : "ghost",
                size: orientation === "desktop" ? "sm" : "default",
              }),
              orientation === "mobile" ? "justify-start" : "",
              orientation === "mobile" && !active
                ? "font-medium text-foreground/80 hover:bg-transparent hover:text-foreground"
                : "",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
