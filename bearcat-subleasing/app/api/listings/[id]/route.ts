import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { db } from "@/db/db";
import { Listing, ListingImage } from "@/db/schema";
import { getListingById } from "@/queries/get";
import { AuthorizationError, requireUser } from "@/lib/auth-guards";
import { InputValidationError } from "@/lib/errors";
import {
	assertValidListingId,
	parseListingSubmissionInput,
} from "@/lib/validation/listing";

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
		const submission = parseListingSubmissionInput(body);
		const { imageUrls, ...listingData } = submission;

		const [updatedListing] = await db
			.update(Listing)
			.set({
				...listingData,
				updated_at: new Date(),
			})
			.where(eq(Listing.id, id))
			.returning();

		await db.delete(ListingImage).where(eq(ListingImage.listing_id, id));

		if (imageUrls.length > 0) {
			await db.insert(ListingImage).values(
				imageUrls.map((url) => ({
					listing_id: id,
					url,
				})),
			);
		}

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
