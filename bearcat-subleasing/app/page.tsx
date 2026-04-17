import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeroWaterfall from "./components/HeroWaterfall";

const sampleListings = [
  {
    id: "1",
    title: "Jefferson House",
    imageSrc: "/house.webp",
    rent: "$825",
    availability: "Aug 12 - Dec 20",
    beds: 1,
    baths: 1,
  },
  {
    id: "2",
    title: "W. McMillan Ave",
    imageSrc: "/cincy-house1.webp",
    rent: "$695",
    availability: "May 10 - Aug 2",
    beds: 2,
    baths: 1,
  },
  {
    id: "3",
    title: "Clifton Heights Studio",
    imageSrc: "/bedroom.jpg",
    rent: "$760",
    availability: "Aug 1 - Dec 18",
    beds: 1,
    baths: 1,
  },
  {
    id: "4",
    title: "Corryville Loft Space",
    imageSrc: "/house.jpg",
    rent: "$950",
    availability: "Immediate",
    beds: 1,
    baths: 1.5,
  },
  {
    id: "5",
    title: "Straight Street Duplex",
    imageSrc: "/cincy-house1.webp",
    rent: "$720",
    availability: "Jan 1 - May 5",
    beds: 3,
    baths: 2,
  },
  {
    id: "6",
    title: "Calhoun Corner",
    imageSrc: "/house.webp",
    rent: "$810",
    availability: "Fall Semester",
    beds: 2,
    baths: 2,
  },
];

export const metadata: Metadata = {
  title: "Home",
  description:
    "UC and Cincinnati student housing made simpler. Browse subleases, compare details, and find a better fit in one place.",
};

export default function HomePage() {
  return (
    <main className="h-[calc(100dvh-77px)] max-h-[1000px] w-full overflow-hidden">
      <div className="mx-auto flex h-full w-full max-w-[1440px] px-5 sm:px-8">
        {/* Architecturally Structured 2-Column Grid */}
        <section className="grid h-full w-full gap-12 lg:grid-cols-[1fr_minmax(400px,1.2fr)] lg:gap-8 xl:gap-16">
          
          {/* Left Text Block */}
          <div className="relative flex max-w-2xl flex-col justify-center py-10 lg:pr-6">
            <div className="relative">
              <h1 className="font-heading text-balance text-6xl font-semibold leading-[0.94] tracking-tight text-foreground sm:text-[5rem] lg:text-[5.4rem] xl:text-[6.2rem]">
                UC housing, made simpler.
              </h1>

              <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
                Find and post UC-area subleases in one place, without bouncing between scattered housing posts.
              </p>

              <div className="mt-10">
                <Link
                  href="/listings"
                  className="inline-flex min-h-15 items-center justify-center gap-4 rounded-full bg-primary px-9 py-4 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:bg-[color:var(--brand-primary-hover)] dark:shadow-[0_8px_20px_-8px_rgba(255,90,114,0.3)] sm:px-10 sm:text-lg"
                >
                  Find a sublease now
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Side Waterfall Edge Boundary */}
          <div className="relative -mx-5 h-full w-[calc(100%+2.5rem)] sm:-mx-8 sm:w-[calc(100%+4rem)] lg:-mr-[30%] lg:ml-0 lg:w-[130%] xl:-mr-[40%] xl:w-[140%]">
            <HeroWaterfall listings={sampleListings} />
          </div>
        </section>
      </div>
    </main>
  );
}
