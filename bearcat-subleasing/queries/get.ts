import { db } from "../db/db";
import { Listing } from "@/db/schema";
import { eq } from "drizzle-orm";


export async function getListings() {
    return await db.query.Listing.findMany({
        with: {
            listingImages: true
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
