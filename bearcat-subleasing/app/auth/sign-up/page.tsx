import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import AuthForm from "@/app/auth/components/AuthForm";
import { getSafeRedirectPath } from "@/app/auth/redirect";
import { getCurrentUser } from "@/lib/auth-guards";

export const metadata: Metadata = {
	title: "Sign Up",
	description: "Create a Bearcat Subleasing account to post and manage UC-area subleases.",
};

export default async function SignUpPage({
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
			<div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[0.9fr_1fr] lg:items-center">
				<section>
					<Link
						href="/listings"
						className="inline-flex items-center -my-2 py-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
					>
						← Back to listings
					</Link>
				</section>

				<AuthForm mode="sign-up" redirectTo={safeRedirectTo} />
			</div>
		</main>
	);
}
