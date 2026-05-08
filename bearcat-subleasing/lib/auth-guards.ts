import { headers } from "next/headers";

import { auth } from "@/lib/auth";

export class AuthorizationError extends Error {
	constructor(message = "Unauthorized") {
		super(message);
		this.name = "AuthorizationError";
	}
}

export async function requireUser() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		throw new AuthorizationError("No current user is available");
	}

	return session.user;
}
