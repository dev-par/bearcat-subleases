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
					<p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
						New account
					</p>
					<h1 className="font-heading mt-3 text-3xl font-semibold leading-tight text-foreground sm:text-5xl">
						Start with an account built for UC subleases.
					</h1>
					<p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
						Create an account to post listings, add photos, and return later to
						keep your sublease details current.
					</p>
				</section>

				<AuthForm mode="sign-up" redirectTo={safeRedirectTo} />
			</div>
		</main>
	);
}
