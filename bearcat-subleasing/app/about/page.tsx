import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn how Bearcat Subleasing is building a trust-first marketplace for Cincinnati student housing.",
};

export default function AboutPage() {
  return (
    <main className="px-5 py-8 sm:px-8 sm:py-10">
      <div className="mx-auto max-w-6xl">
        <section className="overflow-hidden rounded-[2rem] border border-border/80 bg-card/88 px-6 py-10 shadow-soft dark:border-white/8 dark:bg-card/92 sm:px-8 sm:py-12">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            About
          </p>
          <h1 className="font-heading mt-4 max-w-4xl text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            An easier way to find the sublease you want. 
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
            Facebook groups bury listings in comments and old posts, so half the
            work is just finding what&apos;s still available. Bearcat Subleasing
            keeps it simple: filter by price, distance, and room type. See everything up front, and if you like what you see, reach out to the poster directly. 
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/listings">
                Browse listings
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/listings/create">Post your sublease</Link>
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
