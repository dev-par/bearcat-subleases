import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { devEnv } from "@/lib/env";

type Session = NonNullable<Awaited<ReturnType<typeof auth.api.getSession>>>;
type SessionUser = Session["user"];

export type CurrentUser = SessionUser & {
	isAdmin: boolean;
};

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

	return withAdminStatus(session.user);
}

export async function getCurrentUser(): Promise<CurrentUser | null> {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		return null;
	}

	return withAdminStatus(session.user);
}

function withAdminStatus(user: SessionUser): CurrentUser {
	return {
		...user,
		isAdmin: devEnv.DEV_ADMIN_USER_IDS.includes(user.id),
	};
}
