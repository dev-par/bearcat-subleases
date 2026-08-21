import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { AuthorizationError, requireUser } from "@/lib/auth-guards";
import { InputValidationError } from "@/lib/errors";
import { parseContactPreferencesInput } from "@/lib/validation/user";
import { updateUserContactPreferences } from "@/queries/insert";

export async function PUT(request: NextRequest) {
	try {
		const user = await requireUser();
		const body = await request.json();
		const input = parseContactPreferencesInput(body);

		const updated = await updateUserContactPreferences(user.id, input);

		revalidatePath("/profile");
		return NextResponse.json(
			{ success: true, response: updated },
			{ status: 200 },
		);
	} catch (error) {
		if (error instanceof AuthorizationError) {
			return NextResponse.json({ error: error.message }, { status: 401 });
		}

		if (error instanceof InputValidationError) {
			return NextResponse.json({ error: error.message }, { status: 400 });
		}

		console.error("Error updating contact preferences", error);
		return NextResponse.json(
			{ error: "Failed to update contact preferences" },
			{ status: 500 },
		);
	}
}
