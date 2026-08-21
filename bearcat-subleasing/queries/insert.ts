import { db } from "../db/db";
import { Listing, user } from "@/db/schema";
import { CreateListingInput } from "@/types/listing";
import { ContactPreferencesInput } from "@/lib/validation/user";
import { eq } from "drizzle-orm";

export async function createListing(data: CreateListingInput) {
    const [listing] = await db.insert(Listing).values(data).returning();
    return listing;
}

export async function updateUserContactPreferences(userId: string, data: ContactPreferencesInput) {
    const [updated] = await db
        .update(user)
        .set({
            phone: data.phone,
            preferredContactMethod: data.preferred_contact_method,
        })
        .where(eq(user.id, userId))
        .returning();

    return updated;
}