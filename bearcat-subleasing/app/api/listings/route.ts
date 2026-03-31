import { NextRequest, NextResponse } from "next/server";
import { getListings } from "@/queries/get";
import { createListing } from "@/queries/insert";
import { AuthorizationError, requireUser } from "@/lib/auth";
import { InputValidationError } from "@/lib/errors";
import { parseListingSubmissionInput } from "@/lib/validation/listing";

export async function GET() {
	try {
		const listings = await getListings();
		return NextResponse.json(listings);
	} catch {
		return NextResponse.json(
			{ error: "failed to fetch listings" },
			{ status: 500 },
		);
	}
}

export async function POST(request: NextRequest) {
	try {
		const user = await requireUser();
		const body = await request.json();
		const submission = parseListingSubmissionInput(body);
		const { imageUrls, ...listingData } = submission;

		const response = await createListing(
			{
				...listingData,
				user_id: user.id,
			},
			imageUrls,
		);

		return NextResponse.json({ success: true, response }, { status: 201 });
	} catch (error) {
		if (error instanceof AuthorizationError) {
			return NextResponse.json({ error: error.message }, { status: 401 });
		}

		if (error instanceof InputValidationError) {
			return NextResponse.json({ error: error.message }, { status: 400 });
		}

		console.error("Error creating listing", error);
		return NextResponse.json(
			{ error: "Failed to create listing" },
			{ status: 500 },
		);
	}
}
