"use client";

import { usePathname } from "next/navigation";

import Footer from "./Footer";

// The homepage hero is a fixed one-viewport layout with no scroll; the sitewide
// footer would push it past 100dvh and reintroduce scroll, so it's suppressed here.
export default function ConditionalFooter() {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  return <Footer />;
}
