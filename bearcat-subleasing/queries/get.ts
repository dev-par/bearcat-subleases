import { db } from "../db/db";
import { Listing, user } from "@/db/schema";
import { and, eq } from "drizzle-orm";


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

export async function getListingsByUserId(userId: string) {
    return await db.query.Listing.findMany({
        where: and(eq(Listing.user_id, userId), eq(Listing.status, 'active')),
        with: {
            listingImages: { limit: 1 }
        }
    })
}

export async function getListingOwnerContact(
    userId: string
): Promise<{ name: string; email: string } | null> {
    const result = await db
        .select({ name: user.name, email: user.email })
        .from(user)
        .where(eq(user.id, userId))
        .limit(1);

    return result[0] ?? null;
}
