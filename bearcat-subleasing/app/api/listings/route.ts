import { NextRequest, NextResponse } from "next/server";
import { getListings  } from "@/queries/get";
import { createListing } from "@/queries/insert";

export async function GET() {
    try {
        const listings = await getListings();
        return NextResponse.json(listings);
    }
    catch (error) {
        return NextResponse.json(
            {error: 'failed to fetch listings'},
            {status: 500}
        )
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const { imageUrls, ...listingData } = body;

        const response = await createListing(listingData, imageUrls || []);

        return NextResponse.json(
            { success: true, response },
            { status: 201},
        );
    }
    catch (error) {
        console.error("Error creating listing", error)
        return NextResponse.json(
            {error: 'Failed to create listing'},
            {status: 500}
        );
    }
}