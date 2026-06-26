import { DISTANCE_LABELS, Listing } from "@/types/listing";
import { Bath, BedDouble, CalendarRange, PersonStanding } from "lucide-react";
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

				<div className="flex flex-1 flex-col p-5">
					<div className="flex items-start justify-between gap-3">
						<div>
							<p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
								{dateFormatter.format(new Date(listing.start_date))} - {dateFormatter.format(new Date(listing.end_date))}
							</p>
							<h2 className="font-heading mt-2 text-2xl font-semibold leading-tight text-card-foreground">
								{listing.title}
							</h2>
						</div>
						<div className="flex min-w-[5.5rem] flex-col items-center justify-center rounded-full bg-primary px-3 py-3 text-center text-primary-foreground shadow-lg shadow-primary/15 dark:shadow-primary/10">
							<p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-primary-foreground/80">
								Monthly
							</p>
							<p className="mt-1 text-xl font-semibold leading-none">{price}</p>
						</div>
					</div>

					{listing.description && (
						<p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">
							{listing.description}
						</p>
					)}

					<div className="mt-4 flex flex-wrap gap-2">
						{badges.map((badge) => (
							<span
								key={badge}
								className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground dark:border-white/8 dark:bg-white/4 dark:text-muted-foreground"
							>
								{badge}
							</span>
						))}
					</div>

					<div className="mt-5 grid grid-cols-2 gap-3 text-sm text-card-foreground">
						<div className="rounded-full border border-border/70 bg-muted/30 px-4 py-3 dark:border-white/8 dark:bg-white/3">
							<div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
								<BedDouble className="h-4 w-4" />
								Bedrooms
							</div>
							<p className="mt-1 text-lg font-semibold leading-none">{listing.bedrooms_in_unit}</p>
						</div>
						<div className="rounded-full border border-border/70 bg-muted/30 px-4 py-3 dark:border-white/8 dark:bg-white/3">
							<div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
								<Bath className="h-4 w-4" />
								Bathrooms
							</div>
							<p className="mt-1 text-lg font-semibold leading-none">{listing.bathrooms_in_unit_x2 / 2}</p>
						</div>
					</div>

					<div className="mt-5 flex flex-wrap items-center gap-4 border-t border-border/80 pt-4 text-sm text-muted-foreground dark:border-white/8">
						<div className="flex items-center gap-2">
							<CalendarRange className="h-4 w-4 text-primary" />
							{dateFormatter.format(new Date(listing.start_date))}
						</div>
						<div className="flex items-center gap-2">
							<PersonStanding className="h-4 w-4 text-primary" />
							{DISTANCE_LABELS[listing.distance_from_campus]} from campus
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
}
