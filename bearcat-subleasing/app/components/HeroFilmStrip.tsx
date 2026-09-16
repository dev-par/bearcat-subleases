import HeroListingCard, { type HeroListing } from "./HeroListingCard";

interface HeroFilmStripProps {
  listings: readonly HeroListing[];
}

export default function HeroFilmStrip({ listings }: HeroFilmStripProps) {
  const loopedItems = [...listings, ...listings];

  return (
    <div className="filmstrip-edge-fade relative h-full w-full overflow-hidden">
      {/* Absolute wrapper so the wide w-max track can't inflate the page grid's
          implicit column (the vertical waterfall does the same with -inset-y-32). */}
      <div className="absolute inset-0 flex items-center py-6">
        <div
          className="flex h-full w-max hover:[animation-play-state:paused]"
          style={{ animation: "float-left 40s linear infinite" }}
        >
          {loopedItems.map((item, idx) => (
            // Height-driven sizing with a width floor: each card fills the strip
            // band, width follows from the 4:5 aspect, and min-w keeps cards
            // legible on short viewports (the image crops instead of shrinking).
            // mr-* instead of gap on the track: with gap, the doubled track's
            // midpoint sits half-a-gap off and the translateX(-50%) loop jumps.
            <div key={`${item.id}-${idx}`} className="mr-3 aspect-[4/5] h-full min-w-48 shrink-0">
              <HeroListingCard listing={item} sizes="320px" fillParent />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
