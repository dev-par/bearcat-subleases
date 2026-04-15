import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ExampleListingsCarousel from "./components/ExampleListingsCarousel";

const sampleListings = [
  {
    title: "Jefferson House",
    rent: "$825",
    window: "Aug - Dec",
    location: "Clifton · 8-minute walk to campus",
    detail: "2 bed setup · Furnished room",
    note: "A clear fall option with the basics visible up front instead of buried in messages.",
  },
  {
    title: "W. McMillan Ave",
    rent: "$690",
    window: "May - Aug",
    location: "West McMillan · Near UC shuttle routes",
    detail: "Private room · Utilities split",
    note: "Good summer option when you need something close to campus without overpaying.",
  },
  {
    title: "Clifton Heights",
    rent: "$760",
    window: "Fall semester",
    location: "Clifton Heights · Close to classes and late food spots",
    detail: "Private bath · 4BR house",
    note: "A solid semester-length listing with the kind of details students usually have to ask twice for.",
  },
] as const;

export const metadata: Metadata = {
  title: "Home",
  description:
    "UC and Cincinnati student housing made simpler. Browse subleases, compare details, and find a better fit in one place.",
};

export default function HomePage() {
  return (
    <main>
      <div className="mx-auto flex w-full max-w-7xl flex-col px-5 pb-14 pt-8 sm:px-8 sm:pb-18 sm:pt-10">
        <div className="flex flex-1 flex-col sm:px-2 lg:px-4">
          <section className="grid items-center gap-12 py-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)] lg:gap-16 lg:py-10">
            <div className="max-w-2xl lg:pr-6">
              <h1 className="font-heading max-w-4xl text-5xl leading-[0.94] font-semibold tracking-tight text-balance text-foreground sm:text-[4.25rem] lg:text-[5.6rem]">
                UC housing, made simpler.
              </h1>

              <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
                Find and post UC-area subleases in one place, without bouncing between scattered housing posts.
              </p>

              <div className="mt-8">
                <Link
                  href="/listings"
                  className="inline-flex min-h-15 items-center justify-center gap-4 rounded-full bg-primary px-9 py-4 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:bg-[color:var(--brand-primary-hover)] dark:shadow-primary/15 sm:px-10 sm:text-lg"
                >
                  Find a sublease now
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <ExampleListingsCarousel listings={sampleListings} />
          </section>
        </div>
      </div>
    </main>
  );
}
