"use server"

import { db } from "@/db/db";
import { getListingById, getListingOwnerContact } from "@/queries/get";
import { Listing, ListingImage } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { assertValidListingId } from "@/lib/validation/listing";
import { AuthorizationError, requireUser } from "@/lib/auth-guards";

export type GetListingContactResult =
  | { success: true; data: { name: string; email: string } }
  | { success: false; error: string };

export async function getListingContact(listingId: string): Promise<GetListingContactResult> {
	try {
		await requireUser();
		assertValidListingId(listingId);

		const listing = await getListingById(listingId);
		if (!listing) return { success: false, error: "Listing not found." };
		if (!listing.user_id) return { success: false, error: "Contact information is unavailable." };

		const contact = await getListingOwnerContact(listing.user_id);
		if (!contact) return { success: false, error: "Contact information is unavailable." };

		return { success: true, data: contact };
	} catch (error) {
		if (error instanceof AuthorizationError) {
			return { success: false, error: "You must be signed in to view contact info." };
		}
		return { success: false, error: error instanceof Error ? error.message : "Something went wrong." };
	}
}

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
		revalidatePath("/listings");
	} catch (error) {
		const message =
			error instanceof Error ? error.message : "Failed to delete listing";
		return { success: false, error: message };
	}

	redirect("/listings");
}
