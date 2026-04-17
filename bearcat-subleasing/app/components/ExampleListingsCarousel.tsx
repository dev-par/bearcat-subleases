"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";

type ExampleListing = {
  title: string;
  rent: string;
  window: string;
  location: string;
  detail: string;
  note: string;
};

interface ExampleListingsCarouselProps {
  listings: readonly ExampleListing[];
}

const AUTO_ROTATE_MS = 4500;

export default function ExampleListingsCarousel({
  listings,
}: ExampleListingsCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const listingCount = listings.length;

  useEffect(() => {
    if (listingCount < 2) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % listingCount);
    }, AUTO_ROTATE_MS);

    return () => window.clearInterval(intervalId);
  }, [listingCount]);

  if (listingCount === 0) {
    return (
      <div className="relative overflow-hidden rounded-[2.2rem] border border-border/80 bg-card/96 p-5 shadow-soft dark:border-white/8 dark:bg-card/92 sm:p-6">
        <div className="absolute inset-x-10 top-3 h-16 rounded-full bg-primary/7 blur-3xl dark:bg-primary/8" />
        <div className="relative rounded-[1.7rem] border border-dashed border-border/70 bg-background/70 p-8 text-center dark:border-white/8 dark:bg-white/3">
          <p className="font-heading text-2xl font-semibold text-foreground">
            Example listings coming soon
          </p>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Add a few sample listings to preview how the carousel rotates through featured subleases.
          </p>
        </div>
      </div>
    );
  }

  const safeActiveIndex = activeIndex >= listingCount ? 0 : activeIndex;
  const activeListing = listings[safeActiveIndex];

  function showPrevious() {
    if (listingCount < 2) {
      return;
    }

    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? listingCount - 1 : currentIndex - 1,
    );
  }

  function showNext() {
    if (listingCount < 2) {
      return;
    }

    setActiveIndex((currentIndex) => (currentIndex + 1) % listingCount);
  }

  function getPlaceholderLabel(title: string) {
    return title
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }

  return (
    <div className="relative overflow-hidden rounded-[2.2rem] border border-border/80 bg-card/96 p-5 shadow-soft dark:border-white/8 dark:bg-card/92 sm:p-6">
      <div className="absolute inset-x-10 top-3 h-16 rounded-full bg-primary/7 blur-3xl dark:bg-primary/8" />
      <div className="absolute -right-8 top-14 h-28 w-28 rounded-full bg-[color:var(--owner)]/10 blur-3xl dark:bg-[color:var(--owner)]/8" />

      <div className="relative">
        <div
          key={activeListing.title}
          className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-right-3 rounded-[1.7rem] border border-border/70 bg-[linear-gradient(160deg,rgba(255,255,255,0.98)_0%,rgba(247,241,234,0.86)_100%)] p-4 duration-500 dark:border-white/8 dark:bg-[linear-gradient(145deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.02)_100%)] sm:p-5"
        >
          <div className="relative overflow-hidden rounded-[1.35rem] border border-border/70 bg-[linear-gradient(145deg,#f2ece5_0%,#ffffff_38%,#ece6df_100%)] dark:border-white/8 dark:bg-[linear-gradient(145deg,#20262d_0%,#171c22_48%,#101419_100%)]">
            <div className="aspect-[4/3] p-5 md:aspect-video lg:aspect-[21/9]">
              <div className="absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top,rgba(224,1,34,0.16),transparent_58%)] dark:bg-[radial-gradient(circle_at_top,rgba(255,90,114,0.16),transparent_58%)]" />
              <div className="absolute inset-x-5 top-5 flex items-center justify-between">
                <div className="rounded-full border border-white/70 bg-white/86 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-primary shadow-sm dark:border-white/10 dark:bg-white/7 dark:text-[#ff9dab]">
                  {activeListing.window}
                </div>
                <div className="rounded-full border border-black/6 bg-black/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white dark:border-white/10 dark:bg-white/8 dark:text-white/86">
                  {getPlaceholderLabel(activeListing.title)}
                </div>
              </div>

              <div className="absolute inset-x-7 bottom-7">
                <div className="rounded-[1.2rem] border border-white/75 bg-white/88 p-4 shadow-[0_18px_48px_-30px_rgba(0,0,0,0.2)] backdrop-blur dark:border-white/10 dark:bg-[#141a20]/90 dark:shadow-[0_22px_54px_-36px_rgba(0,0,0,0.8)]">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <h3 className="font-heading text-[1.9rem] leading-none font-semibold text-foreground sm:text-[2.2rem]">
                        {activeListing.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {activeListing.detail}
                      </p>
                    </div>

                    <div className="rounded-[1rem] bg-primary px-3 py-2 text-right text-primary-foreground shadow-lg shadow-primary/15 dark:shadow-primary/10">
                      <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-primary-foreground/80">
                        Monthly
                      </p>
                      <p className="mt-1 text-lg font-semibold sm:text-xl">
                        {activeListing.rent}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute left-8 top-20 h-36 w-32 rounded-[2rem] border border-white/70 bg-white/42 shadow-[0_18px_44px_-28px_rgba(0,0,0,0.18)] dark:border-white/8 dark:bg-white/4 dark:shadow-[0_20px_44px_-30px_rgba(0,0,0,0.7)]" />
              <div className="absolute right-9 top-18 h-40 w-38 rounded-[2.2rem] border border-white/70 bg-[linear-gradient(145deg,rgba(255,255,255,0.72)_0%,rgba(255,255,255,0.3)_100%)] shadow-[0_20px_48px_-30px_rgba(0,0,0,0.18)] dark:border-white/8 dark:bg-[linear-gradient(145deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.02)_100%)] dark:shadow-[0_22px_50px_-34px_rgba(0,0,0,0.72)]" />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between gap-3">
            <div className="rounded-full border border-border/70 bg-background/80 px-4 py-2 text-sm text-muted-foreground dark:border-white/8 dark:bg-white/4">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                {activeListing.location}
              </div>
            </div>

            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Example listing
            </p>
          </div>

          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            {activeListing.note}
          </p>
        </div>

        <div className="mt-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 rounded-full border border-border/70 bg-background/78 px-3 py-2 dark:border-white/8 dark:bg-white/4">
            {listings.map((listing, index) => (
              <button
                key={listing.title}
                type="button"
                aria-label={`Show example listing ${index + 1}`}
                aria-pressed={index === safeActiveIndex}
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 rounded-full transition ${
                  index === safeActiveIndex
                    ? "w-8 bg-primary"
                    : "w-2.5 bg-border hover:bg-primary/45 dark:bg-white/12 dark:hover:bg-white/25"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={showPrevious}
              aria-label="Show previous example listing"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-background/80 text-foreground transition hover:border-primary/25 hover:text-primary dark:border-white/8 dark:bg-white/4"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={showNext}
              aria-label="Show next example listing"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-background/80 text-foreground transition hover:border-primary/25 hover:text-primary dark:border-white/8 dark:bg-white/4"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
