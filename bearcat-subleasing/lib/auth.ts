import { eq } from "drizzle-orm";

import { db } from "@/db/db";
import { User } from "@/db/schema";
import { devEnv } from "@/lib/env";

export class AuthorizationError extends Error {
	constructor(message = "Unauthorized") {
		super(message);
		this.name = "AuthorizationError";
	}
}

export interface AuthUser {
	id: string;
	email: string;
	name: string;
	isAdmin: boolean;
}

function isAdminUser(userId: string): boolean {
	return devEnv.DEV_ADMIN_USER_IDS.includes(userId);
}

export async function getCurrentUser(): Promise<AuthUser | null> {
	const user = await db.query.User.findFirst({
		where: eq(User.id, devEnv.DEV_SEEDED_USER_ID),
	});

	if (!user) {
		return null;
	}

	return {
		id: user.id,
		email: user.email,
		name: user.name,
		isAdmin: isAdminUser(user.id),
	};
}

export async function requireUser(): Promise<AuthUser> {
	const user = await getCurrentUser();

	if (!user) {
		throw new AuthorizationError("No current user is available");
	}

	return user;
}

export async function requireAdmin(): Promise<AuthUser> {
	const user = await requireUser();

	if (!user.isAdmin) {
		throw new AuthorizationError("Admin access is required");
	}

	return user;
}
