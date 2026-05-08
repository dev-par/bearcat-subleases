"use server"

import { db } from "@/db/db";
import { getListingById } from "@/queries/get";
import { Listing } from "@/db/schema";
import { eq } from "drizzle-orm";
import { ListingImage } from "@/db/schema";
import { redirect } from "next/navigation";
import { assertValidListingId } from "@/lib/validation/listing";
import { AuthorizationError, requireUser } from "@/lib/auth-guards";

export async function deleteListing(listingId: string) {
	try {
		const user = await requireUser();
		assertValidListingId(listingId);

		const listing = await getListingById(listingId);

		if (!listing) {
			throw new Error("Listing not found");
		}

		if (!user.isAdmin && listing.user_id !== user.id) {
			throw new AuthorizationError(
				"You do not have access to delete this listing",
			);
		}

		await db.delete(ListingImage).where(eq(ListingImage.listing_id, listingId));
		await db.delete(Listing).where(eq(Listing.id, listingId));
	} catch (error) {
		const message =
			error instanceof Error ? error.message : "Failed to delete listing";
		return { success: false, error: message };
	}

	redirect("/listings");
}
