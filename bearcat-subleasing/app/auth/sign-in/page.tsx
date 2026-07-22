import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import AuthForm from "@/app/auth/components/AuthForm";
import { getSafeRedirectPath } from "@/app/auth/redirect";
import { getCurrentUser } from "@/lib/auth-guards";

export const metadata: Metadata = {
	title: "Sign In",
	description: "Sign in to Bearcat Subleasing to post and manage UC-area subleases.",
};

export default async function SignInPage({
	searchParams,
}: {
	searchParams: Promise<{ redirectTo?: string | string[] }>;
}) {
	const [{ redirectTo }, user] = await Promise.all([
		searchParams,
		getCurrentUser(),
	]);
	const safeRedirectTo = getSafeRedirectPath(redirectTo);

	if (user) {
		redirect(safeRedirectTo);
	}

	return (
		<main className="px-5 py-10 sm:px-8 sm:py-14">
			<div className="mx-auto flex max-w-md flex-col gap-6">
				<Link
					href="/listings"
					className="inline-flex items-center -my-2 py-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
				>
					← Back to listings
				</Link>

				<AuthForm mode="sign-in" redirectTo={safeRedirectTo} />
			</div>
		</main>
	);
}
