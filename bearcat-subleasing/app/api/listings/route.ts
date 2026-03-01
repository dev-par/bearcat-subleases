import { NextResponse } from "next/server";
import { getListings } from "@/queries/get";

export async function GET() {
    try {
        const listings = await getListings();
        return NextResponse.json(listings);
    }
    catch (error) {
        return NextResponse.json({error: 'failed to fetch listings'})
    }
}