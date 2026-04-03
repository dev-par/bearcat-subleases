import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";
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

  return (
    <main className="min-h-screen px-5 py-6 sm:px-8 sm:py-8">
      <div className="mx-auto max-w-7xl">
        <div>
          <section className="px-6 py-8 sm:px-8 sm:py-10">
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to home
              </Link>

              <Link
                href="/listings/create"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:bg-[#b8011c]"
              >
                <Plus className="h-4 w-4" />
                Create listing
              </Link>
            </div>

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
