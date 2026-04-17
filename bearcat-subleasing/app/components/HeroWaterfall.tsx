import Image from "next/image";

export type WaterfallListing = {
  id: string;
  title: string;
  imageSrc: string;
  rent: string;
  availability: string;
  beds: number;
  baths: number;
};

interface HeroWaterfallProps {
  listings: readonly WaterfallListing[];
}

export default function HeroWaterfall({ listings }: HeroWaterfallProps) {
  // Split listings roughly into 2 columns
  const col1 = listings.filter((_, i) => i % 2 === 0);
  const col2 = listings.filter((_, i) => i % 2 === 1);

  const Column = ({ items, className, speed }: { items: WaterfallListing[]; className?: string; speed: string }) => {
    const loopedItems = [...items, ...items];
    
    return (
      <div className={`flex w-full flex-col overflow-visible ${className || ""}`}>
        <div 
          className="flex flex-col gap-4 sm:gap-6 lg:gap-8 hover:[animation-play-state:paused]"
          style={{ animation: `float-up ${speed} linear infinite` }}
        >
          {loopedItems.map((item, idx) => (
            <div 
              key={`${item.id}-${idx}`} 
              className="group relative overflow-hidden rounded-3xl border border-white/20 bg-card/40 p-2 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.1)] backdrop-blur-md transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:border-primary/30 dark:border-white/10 dark:bg-white/5 dark:shadow-[0_14px_40px_-16px_rgba(0,0,0,0.5)]"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.25rem] bg-muted/40">
                <Image
                  src={item.imageSrc}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 50vw"
                />
                <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="rounded-full bg-white/20 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-widest backdrop-blur-md sm:text-[10px]">
                      {item.availability}
                    </span>
                    <span className="text-sm font-semibold sm:text-base">{item.rent}</span>
                  </div>
                  <p className="font-heading text-lg font-semibold leading-tight line-clamp-1 sm:text-xl">{item.title}</p>
                  <div className="mt-1.5 flex items-center gap-2 text-xs font-medium text-white/80">
                    <span>{item.beds} bed</span>
                    <span className="h-1 w-1 rounded-full bg-white/50"></span>
                    <span>{item.baths} bath</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="relative h-full w-full max-w-full overflow-hidden lg:-mr-12">
      {/* Mask out the left edge slightly for a clean fade if needed */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-background to-transparent md:hidden" />

      {/* Grid container with massive negative margin on top/bottom to simulate endless flow */}
      <div className="absolute -inset-y-32 inset-x-0">
        <div className="grid h-full grid-cols-2 gap-4 pl-4 pr-6 sm:gap-6 sm:pl-0 sm:pr-0 lg:gap-8 lg:pr-8">
          <Column items={col1} speed="45s" className="mt-20 lg:mt-8" />
          <Column items={col2} speed="55s" className="mt-40 lg:mt-24" />
        </div>
      </div>
    </div>
  );
}
