import type { Metadata } from "next";
import Link from "next/link";
import { getListings } from "@/queries/get";
import ListingsBrowser from "@/app/listings/components/ListingsBrowser";

export const metadata: Metadata = {
  title: "Listings",
  description:
    "Browse current Bearcat Subleasing listings with clearer facts, stronger trust signals, and near-campus housing details.",
};

export default async function ListingsPage() {
  const listings = await getListings();

  return (
    <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10">
      {listings.length === 0 ? (
        <div className="rounded-[1.75rem] border border-dashed border-border bg-muted/35 px-6 py-16 text-center dark:border-white/10 dark:bg-white/3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Nothing live yet</p>
          <h2 className="font-heading mt-4 text-3xl font-semibold text-foreground">
            The first great listing sets the tone.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-muted-foreground">
            Add the first sublease and this dashboard will immediately inherit the trust-first layout.
          </p>
          <Link
            href="/listings/create"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:bg-(--brand-primary-hover) dark:shadow-primary/15"
          >
            Post the first listing
          </Link>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Marketplace feed</p>
            <h2 className="font-heading mt-2 text-3xl font-semibold text-foreground">
              Current near-campus options
            </h2>
          </div>

          <ListingsBrowser listings={listings} />
        </>
      )}
    </main>
  );
}
