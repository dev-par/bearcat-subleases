import { NextRequest, NextResponse } from "next/server";
import { getListingById } from "@/queries/get";

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