import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

import { db } from "@/db/db";
import { Listing } from "@/db/schema";
import { getListingById } from "@/queries/get";
import { AuthorizationError, requireUser } from "@/lib/auth-guards";
import { InputValidationError } from "@/lib/errors";
import {
    assertValidListingId,
    parseListingMutationInput,
} from "@/lib/validation/listing";
import { deleteS3Objects } from "@/lib/s3";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {

    try {
        const { id } = await params;
        const listing = await getListingById(id);

        if (!listing) {
            return NextResponse.json(
                { error: 'Listing not found' },
                { status: 404 },
            )
        }

        return NextResponse.json(listing)
    }
    catch (error) {
        console.error("Error fetching listing:", error);
        return NextResponse.json(
            { error: "Failed to fetch listing" },
            { status: 500 },
        )
    }
}

export async function PUT(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const user = await requireUser();
		const { id } = await params;
		assertValidListingId(id);

		const listing = await getListingById(id);

		if (!listing) {
			return NextResponse.json(
				{ error: "Listing not found" },
				{ status: 404 },
			);
		}

		if (!user.isAdmin && listing.user_id !== user.id) {
			return NextResponse.json(
				{ error: "You do not have access to update this listing" },
				{ status: 403 },
			);
		}

		const body = await request.json();
		const listingData = parseListingMutationInput(body);
		const oldImageKey = listing.image_key;
		const imageChanged = oldImageKey !== null && oldImageKey !== listingData.image_key;

		const [updatedListing] = await db
			.update(Listing)
			.set({
				...listingData,
				updated_at: new Date(),
			})
			.where(eq(Listing.id, id))
			.returning();

		revalidatePath("/listings");
		revalidatePath(`/listings/${id}`);

		if (oldImageKey !== null && oldImageKey !== listingData.image_key) {
			await deleteS3Objects([oldImageKey]);
		}

		console.log(`[listing:update] listingId=${id} userId=${user.id} imageReplacedOrRemoved=${imageChanged}`);
		return NextResponse.json(
			{ success: true, response: updatedListing },
			{ status: 200 },
		);
	} catch (error) {
		if (error instanceof AuthorizationError) {
			return NextResponse.json({ error: error.message }, { status: 401 });
		}

		if (error instanceof InputValidationError) {
			return NextResponse.json({ error: error.message }, { status: 400 });
		}

		console.error("Error updating listing", error);
		return NextResponse.json(
			{ error: "Failed to update listing" },
			{ status: 500 },
		);
	}
}
