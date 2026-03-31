import { NextResponse } from "next/server";
import { getUsersWithListings } from "@/queries/get";

export async function GET() {
    try {
        const users = await getUsersWithListings();
        return NextResponse.json(users)
    }
    catch (error) {
        console.error("error fetching users:", error)
        return NextResponse.json({error: 'Failed to fetch users'})
    }
}
