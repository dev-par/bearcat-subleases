import HeroListingCard, { type HeroListing } from "./HeroListingCard";

interface HeroWaterfallProps {
  listings: readonly HeroListing[];
}

interface WaterfallColumnProps {
  items: HeroListing[];
  className?: string;
  speed: string;
}

function WaterfallColumn({ items, className, speed }: WaterfallColumnProps) {
  const loopedItems = [...items, ...items];

  return (
    <div className={`flex w-full flex-col overflow-visible ${className || ""}`}>
      <div
        className="flex flex-col gap-6 hover:[animation-play-state:paused] lg:gap-8"
        style={{ animation: `float-up ${speed} linear infinite` }}
      >
        {loopedItems.map((item, idx) => (
          <HeroListingCard key={`${item.id}-${idx}`} listing={item} sizes="50vw" />
        ))}
      </div>
    </div>
  );
}

export default function HeroWaterfall({ listings }: HeroWaterfallProps) {
  // Split listings roughly into 2 columns
  const col1 = listings.filter((_, i) => i % 2 === 0);
  const col2 = listings.filter((_, i) => i % 2 === 1);

  return (
    <div className="relative h-full w-full max-w-full [clip-path:inset(0_-9999px)] md:-mr-12">
      {/* Grid container with massive negative margin on top/bottom to simulate endless flow */}
      <div className="absolute -inset-y-32 inset-x-0">
        <div className="grid h-full grid-cols-2 gap-8 pr-8">
          <WaterfallColumn items={col1} speed="45s" className="mt-8" />
          <WaterfallColumn items={col2} speed="55s" className="mt-24" />
        </div>
      </div>
    </div>
  );
}
