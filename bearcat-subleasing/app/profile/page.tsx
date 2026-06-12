import type { Metadata } from "next";
import Link from "next/link";
import ListingCard from "@/app/components/ListingCard";
import { requireUser } from "@/lib/auth-guards";
import { getListingsByUserId } from "@/queries/get";

export const metadata: Metadata = {
  title: "My Profile",
  description: "Manage your active Bearcat Subleasing listings.",
};

export default async function ProfilePage() {
  const user = await requireUser();
  const listings = await getListingsByUserId(user.id);

  return (
    <main className="px-5 py-8 sm:px-8 sm:py-10">
      <div className="mx-auto max-w-7xl">
        <section className="rounded-[2rem] border border-border/70 bg-card/55 px-6 pb-8 pt-6 shadow-soft dark:border-white/8 dark:bg-card/35 sm:px-8 sm:pb-10">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Your account</p>
              <h2 className="font-heading mt-2 text-3xl font-semibold text-foreground">
                My Listings
              </h2>
            </div>
            <Link
              href="/listings/create"
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:bg-[color:var(--brand-primary-hover)] dark:shadow-primary/15"
            >
              Post a listing
            </Link>
          </div>

          {listings.length === 0 ? (
            <div className="rounded-[1.75rem] border border-dashed border-border bg-muted/35 px-6 py-16 text-center dark:border-white/10 dark:bg-white/3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">No listings yet</p>
              <h3 className="font-heading mt-4 text-2xl font-semibold text-foreground">
                You haven&apos;t posted anything yet.
              </h3>
              <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-muted-foreground">
                Share your sublease and reach students looking for near-campus housing.
              </p>
              <Link
                href="/listings/create"
                className="mt-8 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:bg-[color:var(--brand-primary-hover)] dark:shadow-primary/15"
              >
                Post your first listing
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
