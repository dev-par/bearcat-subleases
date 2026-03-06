"use server"

import { db } from "@/db/db"
import { getListingById } from "@/queries/get";
import { Listing } from "@/db/schema";
import { eq } from "drizzle-orm";
import { ListingImage } from "@/db/schema";
import { redirect } from "next/navigation";


function isValidUUID(id: string): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
}

export async function deleteListing(listingId: string) {
    try {
        // TODO: add auth when implemented

        if (!isValidUUID(listingId)) {
            throw new Error("Invalid listing ID format")
        }

        const listing = await getListingById(listingId);

        if (!listing) {
            throw new Error("Listing not found")
        }

        await db.delete(ListingImage).where(eq(ListingImage.listing_id, listingId))

        await db.delete(Listing).where(eq(Listing.id, listingId))
    }
    catch (error) {
        return { success: false, error: "Failed to delete listing" }
    }

    redirect('/');
}