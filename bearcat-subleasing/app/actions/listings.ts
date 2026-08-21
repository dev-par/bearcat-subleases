"use server"

import { db } from "@/db/db";
import { getListingById, getListingOwnerContact } from "@/queries/get";
import { Listing } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { assertValidListingId } from "@/lib/validation/listing";
import { AuthorizationError, requireUser } from "@/lib/auth-guards";
import { deleteS3Objects } from "@/lib/s3";
import type { PreferredContactMethod } from "@/types/user";

export type GetListingContactResult =
  | {
      success: true;
      data: {
        name: string;
        email: string;
        phone: string | null;
        preferredContactMethod: PreferredContactMethod;
      };
    }
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

		await db.delete(Listing).where(eq(Listing.id, listingId));
		revalidatePath("/listings");

		const hadImage = listing.image_key !== null;
		if (listing.image_key !== null) {
			await deleteS3Objects([listing.image_key]);
		}
		console.log(`[listing:delete] listingId=${listingId} userId=${user.id} hadImage=${hadImage}`);
	} catch (error) {
		const message =
			error instanceof Error ? error.message : "Failed to delete listing";
		return { success: false, error: message };
	}

	redirect("/listings");
}
