import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json(
        { error: "Users are now managed by Better Auth." },
        { status: 501 },
    );
}
