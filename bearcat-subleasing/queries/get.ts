import { db } from "../db/db";
import { Listing, user } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import type { PreferredContactMethod } from "@/types/user";


export async function getListings() {
    return await db.query.Listing.findMany({
        where: eq(Listing.status, 'active'),
    })
}

export async function getListingById(id: string) {
    return await db.query.Listing.findFirst({
        where: eq(Listing.id, id),
    });
}

export async function getListingsByUserId(userId: string) {
    return await db.query.Listing.findMany({
        where: and(eq(Listing.user_id, userId), eq(Listing.status, 'active')),
    })
}

export async function getListingOwnerContact(
    userId: string
): Promise<{ name: string; email: string; phone: string | null; preferredContactMethod: PreferredContactMethod } | null> {
    const result = await db
        .select({
            name: user.name,
            email: user.email,
            phone: user.phone,
            preferredContactMethod: user.preferredContactMethod,
        })
        .from(user)
        .where(eq(user.id, userId))
        .limit(1);

    return result[0] ?? null;
}

export async function getUserContactPreferences(
    userId: string
): Promise<{ phone: string | null; preferredContactMethod: PreferredContactMethod } | null> {
    const result = await db
        .select({ phone: user.phone, preferredContactMethod: user.preferredContactMethod })
        .from(user)
        .where(eq(user.id, userId))
        .limit(1);

    return result[0] ?? null;
}
