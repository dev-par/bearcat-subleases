import type { Metadata } from "next";

import ComponentReviewShowcase from "@/app/components/ComponentReviewShowcase";
import ThemeToggle from "@/app/components/ThemeToggle";

export const metadata: Metadata = {
  title: "Component Review",
  description:
    "Temporary review surface for the BEA-12 shared component foundation.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ComponentReviewPage() {
  return (
    <main className="px-5 py-8 sm:px-8 sm:py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Temporary review route
            </p>
            <h1 className="font-heading mt-3 text-4xl font-semibold text-foreground sm:text-5xl">
              Shared component QA
            </h1>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Use this page to review the BEA-12 primitives in one place before deciding whether they are strong enough for the live product surfaces.
            </p>
          </div>
          <ThemeToggle />
        </div>

        <ComponentReviewShowcase />
      </div>
    </main>
  );
}
