import Image from "next/image";

export type HeroListing = {
  id: string;
  title: string;
  imageSrc: string;
  rent: string;
  availability: string;
  beds: number;
  baths: number;
};

interface HeroListingCardProps {
  listing: HeroListing;
  sizes: string;
  /** Fill the parent's height (image crops via object-cover) instead of deriving height from a 4:5 aspect. */
  fillParent?: boolean;
}

export default function HeroListingCard({ listing, sizes, fillParent = false }: HeroListingCardProps) {
  return (
    <div
      className={`group relative overflow-hidden rounded-xl border border-white/20 bg-card/40 backdrop-blur-md transition-all duration-300 hover:scale-[1.03] hover:border-primary/30 dark:border-white/10 dark:bg-white/5 ${fillParent ? "h-full" : ""}`}
    >
      <div
        className={`relative w-full overflow-hidden rounded-xl bg-muted/40 ${fillParent ? "h-full" : "aspect-[4/5]"}`}
      >
        <Image
          src={listing.imageSrc}
          alt={listing.title}
          fill
          className="object-cover"
          sizes={sizes}
        />
        <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <div className="absolute bottom-4 left-4 right-4 text-white">
          <div className="mb-2 flex items-center justify-between">
            <span className="whitespace-nowrap rounded-full bg-white/20 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-widest backdrop-blur-md sm:text-xs">
              {listing.availability}
            </span>
            <span className="text-sm font-semibold sm:text-base">{listing.rent}</span>
          </div>
          <p className="font-heading text-lg font-semibold leading-tight line-clamp-1 sm:text-xl">{listing.title}</p>
          <div className="mt-1.5 flex items-center gap-2 text-xs font-medium text-white/80">
            <span>{listing.beds} bed</span>
            <span className="h-1 w-1 rounded-full bg-white/50" aria-hidden="true"></span>
            <span>{listing.baths} bath</span>
          </div>
        </div>
      </div>
    </div>
  );
}
