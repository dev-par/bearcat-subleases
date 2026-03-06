import { db } from "../db/db";
import { Listing, ListingImage } from "@/db/schema";
import { CreateListingInput } from "@/types/listing";

export async function createListing(data: CreateListingInput, imageUrls: string[]) {
    const [listing] = await db.insert(Listing).values(data).returning();

    if (imageUrls.length > 0) {
        await db.insert(ListingImage).values(
            imageUrls.map(url => ({
                listing_id: listing.id,
                url: url,
            }))
        );
    }

    return listing;
}