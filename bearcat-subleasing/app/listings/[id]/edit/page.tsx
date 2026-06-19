import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import ListingForm from "@/app/listings/components/ListingForm";
import { getCurrentUser } from "@/lib/auth-guards";
import { assertValidListingId } from "@/lib/validation/listing";
import { getListingById } from "@/queries/get";

export default async function EditListingPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;

	try {
		assertValidListingId(id);
	} catch {
		notFound();
	}

	const [listing, user] = await Promise.all([getListingById(id), getCurrentUser()]);

	if (!listing) {
		notFound();
	}

	if (!user) {
		redirect(`/listings/${listing.id}`);
	}

	const canManageListing = user.isAdmin || listing.user_id === user.id;

	if (!canManageListing) {
		redirect(`/listings/${listing.id}`);
	}

	return (
		<div className="mx-auto max-w-xl px-4 py-8 sm:py-10">
			<div className="mb-4">
				<Link
					href={`/listings/${listing.id}`}
					className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
				>
					← Back to listing
				</Link>
			</div>
			<p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
				{user.isAdmin && listing.user_id !== user.id
					? "Admin moderation"
					: "Owner tools"}
			</p>
			<h1 className="font-heading mt-2 text-4xl font-semibold text-foreground">
				Edit Listing
			</h1>
			<p className="mt-2 text-sm leading-6 text-muted-foreground">
				Update the listing details students use to compare price, availability,
				photos, and fit.
			</p>

			<ListingForm
				mode="edit"
				initialValues={{
					title: listing.title,
					description: listing.description,
					rent_cents: listing.rent_cents,
					start_date: listing.start_date,
					end_date: listing.end_date,
					room_type: listing.room_type,
					bedrooms_in_unit: listing.bedrooms_in_unit,
					bathrooms_in_unit_x2: listing.bathrooms_in_unit_x2,
					private_bathroom: listing.private_bathroom,
					distance_from_campus: listing.distance_from_campus,
					parking_available: listing.parking_available,
					furnished: listing.furnished,
					imageUrls: listing.listingImages.map((image) => image.url),
				}}
				submitUrl={`/api/listings/${listing.id}`}
				submitMethod="PUT"
				successRedirectUrl={`/listings/${listing.id}`}
			/>
		</div>
	);
}
