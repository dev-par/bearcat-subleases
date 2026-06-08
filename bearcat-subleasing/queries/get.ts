import { db } from "../db/db";
import { Listing } from "@/db/schema";
import { eq } from "drizzle-orm";


export async function getListings() {
    return await db.query.Listing.findMany({
        where: eq(Listing.status, 'active'),
        with: {
            listingImages: { limit: 1 }
        }
    })
}

export async function getListingById(id: string) {
    return await db.query.Listing.findFirst({
        where: eq(Listing.id, id),
        with: {
            listingImages: true
        }
    });
}
