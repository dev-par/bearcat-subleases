import { getListingById } from "@/queries/get";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import DeleteButton from "@/app/components/DeleteButton";
import { Bath, BedDouble, CalendarRange, Home, MapPin, Sofa } from "lucide-react";
import ThemeToggle from "@/app/components/ThemeToggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/auth";

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
		month: "long",
		day: "numeric",
		year: "numeric",
	});
	const amenityBadges = [
		listing.private_bathroom ? "Private bathroom" : null,
		listing.furnished ? "Furnished" : null,
		listing.room_type ? `${listing.room_type} room` : null,
	].filter(Boolean) as string[];
	const canManageListing = Boolean(user?.isAdmin || user?.id === listing.user_id);

	return (
		<div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10">
			<div className="mb-6 flex items-center justify-between gap-3">
				<Link
					href="/listings"
					className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
				>
					← Back to listings
				</Link>
				<ThemeToggle />
			</div>

			<div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
				<div className="overflow-hidden rounded-[2rem] border border-border/80 bg-card shadow-soft dark:border-white/8">
					<Image
						src={imageUrl}
						alt={listing.title}
						width={600}
						height={600}
						className="aspect-square w-full object-cover"
					/>
				</div>

				<div className="rounded-[2rem] border border-border/80 bg-card p-6 shadow-soft dark:border-white/8 sm:p-8">
					<p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
						Listing detail
					</p>
					<h1 className="font-heading mt-3 text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
						{listing.title}
					</h1>
					<p className="mt-4 text-4xl font-semibold text-primary">
						{currencyFormatter.format(listing.rent_cents / 100)}
						<span className="ml-2 text-base font-medium text-muted-foreground">/ month</span>
					</p>

					<div className="mt-5 flex flex-wrap gap-2">
						{amenityBadges.map((badge) => (
							<Badge key={badge}>
								{badge}
							</Badge>
						))}
					</div>

					<div className="mt-8 grid gap-4 sm:grid-cols-2">
						<div className="rounded-[1.5rem] border border-border/70 bg-muted/40 p-4 dark:border-white/8 dark:bg-white/4">
							<div className="flex items-center gap-2 text-sm text-muted-foreground">
								<BedDouble className="h-4 w-4 text-primary" />
								Bedrooms
							</div>
							<p className="mt-2 text-lg font-semibold text-foreground">{listing.bedrooms_in_unit}</p>
						</div>
						<div className="rounded-[1.5rem] border border-border/70 bg-muted/40 p-4 dark:border-white/8 dark:bg-white/4">
							<div className="flex items-center gap-2 text-sm text-muted-foreground">
								<Bath className="h-4 w-4 text-primary" />
								Bathrooms
							</div>
							<p className="mt-2 text-lg font-semibold text-foreground">
								{listing.bathrooms_in_unit_x2 / 2}
							</p>
						</div>
						<div className="rounded-[1.5rem] border border-border/70 bg-muted/40 p-4 dark:border-white/8 dark:bg-white/4">
							<div className="flex items-center gap-2 text-sm text-muted-foreground">
								<Home className="h-4 w-4 text-primary" />
								Room type
							</div>
							<p className="mt-2 text-lg font-semibold capitalize text-foreground">
								{listing.room_type || "Not specified"}
							</p>
						</div>
						<div className="rounded-[1.5rem] border border-border/70 bg-muted/40 p-4 dark:border-white/8 dark:bg-white/4">
							<div className="flex items-center gap-2 text-sm text-muted-foreground">
								<CalendarRange className="h-4 w-4 text-primary" />
								Availability
							</div>
							<p className="mt-2 text-base font-semibold text-foreground">
								{dateFormatter.format(new Date(listing.start_date))} -{" "}
								{dateFormatter.format(new Date(listing.end_date))}
							</p>
						</div>
					</div>

					<div className="mt-8 rounded-[1.5rem] border border-border/70 bg-white p-5 dark:border-white/8 dark:bg-white/4">
						<h2 className="font-heading text-2xl font-semibold text-foreground">Description</h2>
						<p className="mt-3 text-base leading-7 text-muted-foreground">
							{listing.description || "No description provided."}
						</p>
					</div>

					<div className="mt-6 rounded-[1.5rem] border border-border/70 bg-white p-5 dark:border-white/8 dark:bg-white/4">
						<h2 className="font-heading text-2xl font-semibold text-foreground">Location</h2>
						<p className="mt-3 flex items-start gap-2 text-base leading-7 text-muted-foreground">
							<MapPin className="mt-1 h-4 w-4 shrink-0 text-primary" />
							<span>{listing.address || "Address shared after contact."}</span>
						</p>
					</div>

					<div className="mt-6 rounded-[1.5rem] border border-border/70 bg-[linear-gradient(180deg,rgba(255,247,240,0.9)_0%,rgba(255,255,255,1)_100%)] p-5 dark:border-primary/18 dark:bg-[linear-gradient(180deg,rgba(255,90,114,0.08)_0%,rgba(20,24,29,0.96)_72%)]">
						<h2 className="font-heading text-2xl font-semibold text-foreground">Contact</h2>
						<p className="mt-3 flex items-start gap-2 text-base leading-7 text-muted-foreground">
							<Sofa className="mt-1 h-4 w-4 shrink-0 text-primary" />
							<span>Contact visibility will live here once verified-user flows are added.</span>
						</p>
						<Button className="mt-5 w-full">Contact landlord</Button>
					</div>

					{canManageListing ? (
						<div className="mt-6 space-y-3">
							<Link href={`/listings/${listing.id}/edit`}>
								<Button variant="outline" className="w-full">
									Edit Listing
								</Button>
							</Link>
							<DeleteButton listingId={listing.id} />
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
}
