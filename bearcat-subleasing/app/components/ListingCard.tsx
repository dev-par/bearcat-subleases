import { DISTANCE_LABELS, Listing } from "@/types/listing";
import { Bath, BedDouble, PersonStanding } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ListingCardProps {
	listing: Listing;
}

export default function ListingCard({ listing }: ListingCardProps) {
	const imageUrl = listing.listingImages?.[0]?.url || "/house.jpg";
	const dateFormatter = new Intl.DateTimeFormat("en-US", {
		month: "short",
		day: "numeric",
	});
	const price = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 0,
	}).format(listing.rent_cents / 100);
	const badges = [
		listing.room_type ? `${listing.room_type} room` : null,
		listing.furnished ? "Furnished" : null,
		listing.private_bathroom ? "Private bath" : null,
	].filter(Boolean) as string[];

	return (
		<Link href={`/listings/${listing.id}`} className="group block h-full">
			<div className="flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-border/80 bg-card shadow-card transition duration-200 hover:-translate-y-1 hover:border-primary/20 hover:shadow-soft dark:border-white/8 dark:bg-card/96 dark:hover:border-primary/30">
				<Image
					src={imageUrl}
					alt={listing.title}
					width={600}
					height={600}
					sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
					className="aspect-square w-full object-cover transition duration-300 group-hover:scale-[1.03]"
				/>

				<div className="flex flex-1 flex-col p-4">
					<div className="flex items-start justify-between gap-3">
						<div className="min-w-0 flex-1">
							<p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
								{dateFormatter.format(new Date(listing.start_date))} –{" "}
								{dateFormatter.format(new Date(listing.end_date))}
							</p>
							<h2 className="font-heading mt-2 text-2xl font-semibold leading-tight text-card-foreground text-balance line-clamp-2">
								{listing.title}
							</h2>
						</div>
						<div className="flex shrink-0 flex-col items-end text-right">
							<p className="text-2xl font-semibold tabular-nums leading-none text-foreground">
								{price}
							</p>
							<p className="mt-1 text-xs font-medium text-muted-foreground">/mo</p>
						</div>
					</div>

					<div className="mt-3 flex items-center gap-2.5 text-sm text-muted-foreground">
						<BedDouble className="h-4 w-4 shrink-0" aria-hidden="true" />
						<span className="tabular-nums font-medium text-card-foreground">
							{listing.bedrooms_in_unit}
						</span>
						<span className="text-border" aria-hidden="true">·</span>
						<Bath className="h-4 w-4 shrink-0" aria-hidden="true" />
						<span className="tabular-nums font-medium text-card-foreground">
							{listing.bathrooms_in_unit_x2 / 2}
						</span>
						<span className="ml-auto flex items-center gap-1.5">
							<PersonStanding className="h-4 w-4 text-primary" aria-hidden="true" />
							{DISTANCE_LABELS[listing.distance_from_campus]}
						</span>
					</div>

					{badges.length > 0 && (
						<div className="mt-3 flex flex-wrap gap-2 border-t border-border/80 pt-3 dark:border-white/8">
							{badges.map((badge) => (
								<span
									key={badge}
									className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground dark:border-white/8 dark:bg-white/4 dark:text-muted-foreground"
								>
									{badge}
								</span>
							))}
						</div>
					)}
				</div>
			</div>
		</Link>
	);
}
