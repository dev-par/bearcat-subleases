import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import ForgotPasswordForm from "@/app/auth/components/ForgotPasswordForm";
import { getCurrentUser } from "@/lib/auth-guards";

export const metadata: Metadata = {
	title: "Forgot Password",
	description: "Reset your Bearcat Subleasing password.",
};

export default async function ForgotPasswordPage() {
	const user = await getCurrentUser();

	if (user) {
		redirect("/listings");
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

				<ForgotPasswordForm />
			</div>
		</main>
	);
}
