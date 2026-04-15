import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CircleCheckBig,
  MapPinned,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn how Bearcat Subleasing is building a trust-first marketplace for Cincinnati student housing.",
};

const principles = [
  {
    title: "Trust before density",
    description:
      "Housing decisions move faster when price, dates, and room setup are visible before anything decorative gets in the way.",
    icon: ShieldCheck,
  },
  {
    title: "Student-local by design",
    description:
      "The product leans into Cincinnati energy and UC-adjacent cues without copying official university branding.",
    icon: MapPinned,
  },
  {
    title: "Clear signals over noise",
    description:
      "Listing quality, imagery, and contact intent are treated as product signals, not filler content.",
    icon: CircleCheckBig,
  },
];

export default function AboutPage() {
  return (
    <main className="px-5 py-8 sm:px-8 sm:py-10">
      <div className="mx-auto max-w-6xl">
        <section className="overflow-hidden rounded-[2rem] border border-border/80 bg-card/88 px-6 py-10 shadow-soft dark:border-white/8 dark:bg-card/92 sm:px-8 sm:py-12">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            About the marketplace
          </p>
          <h1 className="font-heading mt-4 max-w-4xl text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
            A calmer, more trustworthy way for Cincinnati students to find a
            sublease.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
            Bearcat Subleasing is being shaped as a student-first marketplace
            where the important housing facts surface early, the interface feels
            credible, and the product tone stays local instead of generic.
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

        <section className="mt-8 grid gap-5 md:grid-cols-3">
          {principles.map((principle) => {
            const Icon = principle.icon;

            return (
              <Card key={principle.title}>
                <CardContent className="p-6">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <h2 className="font-heading mt-5 text-2xl font-semibold text-foreground">
                  {principle.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {principle.description}
                </p>
                </CardContent>
              </Card>
            );
          })}
        </section>
      </div>
    </main>
  );
}
