import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Building2, CalendarRange, SearchCheck } from "lucide-react";
import ListingCard from "../components/ListingCard";
import { getListings } from "@/queries/get";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Listings",
  description:
    "Browse current Bearcat Subleasing listings with clearer facts, stronger trust signals, and near-campus housing details.",
};

function formatDateRange(startDate: string, endDate: string) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  });

  return `${formatter.format(new Date(startDate))} - ${formatter.format(new Date(endDate))}`;
}

export default async function ListingsPage() {
  const listings = await getListings();
  const furnishedCount = listings.filter((listing) => listing.furnished).length;
  const privateBathCount = listings.filter((listing) => listing.private_bathroom).length;

  return (
    <main className="min-h-screen px-5 py-6 sm:px-8 sm:py-8">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-[2rem] border border-border/80 bg-white/90 shadow-soft backdrop-blur-xl">
          <section className="border-b border-border/80 bg-[linear-gradient(180deg,rgba(255,250,246,0.96)_0%,rgba(255,255,255,0.92)_100%)] px-6 py-8 sm:px-8 sm:py-10">
            <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to home
                </Link>
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  Listing dashboard
                </p>
                <h1 className="font-heading mt-3 text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
                  Browse subleases with the facts students actually scan for first.
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
                  Price, timing, room setup, and photo confidence stay visible so the marketplace feels
                  useful before it feels busy.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/listings/create"
                  className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:bg-[#b8011c]"
                >
                  Create listing
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-white px-5 py-3 text-sm font-semibold text-foreground transition hover:border-primary/20 hover:text-primary"
                >
                  Why Bearcat
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-[1.5rem] border border-border/70 bg-white p-5 shadow-card">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/8 text-primary">
                    <Building2 className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm text-muted-foreground">Active listings</p>
                    <p className="text-2xl font-semibold text-foreground">{listings.length}</p>
                  </div>
                </div>
              </div>
              <div className="rounded-[1.5rem] border border-border/70 bg-white p-5 shadow-card">
                <div className="flex items-center gap-3">
                  <span
                    className="grid h-11 w-11 place-items-center rounded-2xl"
                    style={{
                      backgroundColor: "color-mix(in srgb, var(--verified) 12%, transparent)",
                      color: "var(--verified)",
                    }}
                  >
                    <SearchCheck className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm text-muted-foreground">Furnished options</p>
                    <p className="text-2xl font-semibold text-foreground">{furnishedCount}</p>
                  </div>
                </div>
              </div>
              <div className="rounded-[1.5rem] border border-border/70 bg-white p-5 shadow-card">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-accent text-accent-foreground">
                    <CalendarRange className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm text-muted-foreground">Private bath listings</p>
                    <p className="text-2xl font-semibold text-foreground">{privateBathCount}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="px-6 py-8 sm:px-8 sm:py-10">
            {listings.length === 0 ? (
              <div className="rounded-[1.75rem] border border-dashed border-border bg-muted/35 px-6 py-16 text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Nothing live yet</p>
                <h2 className="font-heading mt-4 text-3xl font-semibold text-foreground">
                  The first great listing sets the tone.
                </h2>
                <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-muted-foreground">
                  Add the first sublease and this dashboard will immediately inherit the trust-first layout.
                </p>
                <Link
                  href="/listings/create"
                  className="mt-8 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:bg-[#b8011c]"
                >
                  Post the first listing
                </Link>
              </div>
            ) : (
              <>
                <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Marketplace feed</p>
                    <h2 className="font-heading mt-2 text-3xl font-semibold text-foreground">
                      Current near-campus options
                    </h2>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Earliest window: {formatDateRange(listings[0].start_date, listings[0].end_date)}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {listings.map((listing) => (
                    <ListingCard key={listing.id} listing={listing} />
                  ))}
                </div>
              </>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
