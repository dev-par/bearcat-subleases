import { getListingById } from "@/queries/get";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import DeleteButton from "@/app/components/DeleteButton";
import { Bath, BedDouble, CalendarRange, Home, PersonStanding } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/auth-guards";
import ContactReveal from "@/app/listings/[id]/components/ContactReveal";
import { DISTANCE_LABELS } from "@/types/listing";

function isValidUUID(id: string): boolean {
	const uuidRegex =
		/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
	return uuidRegex.test(id);
}

export default async function Page({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	if (!isValidUUID(id)) {
		notFound();
	}

	const [listing, user] = await Promise.all([getListingById(id), getCurrentUser()]);

	if (!listing) {
		notFound();
	}

	const imageUrl = listing.listingImages?.[0]?.url || "/house.jpg";
	const currencyFormatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 0,
	});
	const dateFormatter = new Intl.DateTimeFormat("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	});
	const amenityBadges = [
		listing.private_bathroom ? "Private bathroom" : null,
		listing.furnished ? "Furnished" : null,
		listing.room_type ? `${listing.room_type} room` : null,
		listing.parking_available === true ? "Parking available" : null,
	].filter(Boolean) as string[];
	const canManageListing = Boolean(user?.isAdmin || user?.id === listing.user_id);

	return (
		<div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10">
			<div className="mb-6">
				<Link
					href="/listings"
					className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
				>
					← Back to listings
				</Link>
			</div>

			{/* Title — full width above the grid */}
			<div className="mb-8">
				<p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
					Listing detail
				</p>
				<h1 className="font-heading mt-3 text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
					{listing.title}
				</h1>
			</div>

			{/* Image + info two-column grid */}
			<div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start">

				{/* Image */}
				<div className="overflow-hidden rounded-[2rem] border border-border/80 bg-card shadow-soft dark:border-white/8">
					<Image
						src={imageUrl}
						alt={listing.title}
						width={800}
						height={800}
						priority
						sizes="(max-width: 1024px) 100vw, 50vw"
						className="aspect-square w-full object-cover"
					/>
				</div>

				{/* Info sidebar */}
				<div>
					<div className="rounded-[2rem] border border-border/80 bg-card p-5 shadow-soft dark:border-white/8 sm:p-6">

						{/* Price */}
						<p className="text-3xl font-semibold text-primary">
							{currencyFormatter.format(listing.rent_cents / 100)}
							<span className="ml-2 text-sm font-medium text-muted-foreground">/ month</span>
						</p>

						{/* Amenity badges */}
						{amenityBadges.length > 0 && (
							<div className="mt-3 flex flex-wrap gap-2">
								{amenityBadges.map((badge) => (
									<Badge key={badge}>{badge}</Badge>
								))}
							</div>
						)}

						{/* Stats grid */}
						<div className="mt-4 grid grid-cols-2 gap-2">
							<div className="rounded-[1.5rem] border border-border/70 bg-muted/40 p-3 dark:border-white/8 dark:bg-white/4">
								<div className="flex items-center gap-2 text-xs text-muted-foreground">
									<BedDouble className="h-3.5 w-3.5 text-primary" />
									Bedrooms
								</div>
								<p className="mt-1.5 text-base font-semibold text-foreground">{listing.bedrooms_in_unit}</p>
							</div>
							<div className="rounded-[1.5rem] border border-border/70 bg-muted/40 p-3 dark:border-white/8 dark:bg-white/4">
								<div className="flex items-center gap-2 text-xs text-muted-foreground">
									<Bath className="h-3.5 w-3.5 text-primary" />
									Bathrooms
								</div>
								<p className="mt-1.5 text-base font-semibold text-foreground">
									{listing.bathrooms_in_unit_x2 / 2}
								</p>
							</div>
							<div className="rounded-[1.5rem] border border-border/70 bg-muted/40 p-3 dark:border-white/8 dark:bg-white/4">
								<div className="flex items-center gap-2 text-xs text-muted-foreground">
									<Home className="h-3.5 w-3.5 text-primary" />
									Room type
								</div>
								<p className="mt-1.5 text-base font-semibold capitalize text-foreground">
									{listing.room_type}
								</p>
							</div>
							<div className="rounded-[1.5rem] border border-border/70 bg-muted/40 p-3 dark:border-white/8 dark:bg-white/4">
								<div className="flex items-center gap-2 text-xs text-muted-foreground">
									<CalendarRange className="h-3.5 w-3.5 text-primary" />
									Availability
								</div>
								<p className="mt-1.5 text-sm font-semibold text-foreground">
									{dateFormatter.format(new Date(listing.start_date))} –{" "}
									{dateFormatter.format(new Date(listing.end_date))}
								</p>
							</div>
							<div className="col-span-2 rounded-[1.5rem] border border-border/70 bg-muted/40 p-3 dark:border-white/8 dark:bg-white/4">
								<div className="flex items-center gap-2 text-xs text-muted-foreground">
									<PersonStanding className="h-3.5 w-3.5 text-primary" />
									Distance from campus
								</div>
								<p className="mt-1.5 text-base font-semibold text-foreground">
									{DISTANCE_LABELS[listing.distance_from_campus]}
								</p>
							</div>
						</div>

						{/* Description */}
						<div className="mt-4 border-t border-border/70 pt-4 dark:border-white/8">
							<h2 className="font-heading text-base font-semibold text-foreground">Description</h2>
							<p className="mt-1.5 text-sm leading-6 text-muted-foreground">
								{listing.description || "No description provided."}
							</p>
						</div>

						{/* Contact */}
						<div className="mt-4 border-t border-border/70 pt-4 dark:border-white/8">
							<h2 className="font-heading text-base font-semibold text-foreground">Contact</h2>
							<ContactReveal listingId={listing.id} isLoggedIn={user !== null} />
						</div>

						{/* Manage */}
						{canManageListing && (
							<div className="mt-4 space-y-2 border-t border-border/70 pt-4 dark:border-white/8">
								<Link href={`/listings/${listing.id}/edit`}>
									<Button variant="outline" className="w-full">
										Edit Listing
									</Button>
								</Link>
								<DeleteButton listingId={listing.id} />
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
