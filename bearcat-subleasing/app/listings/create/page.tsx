import Link from "next/link";
import { redirect } from "next/navigation";

import ListingForm from "@/app/listings/components/ListingForm";
import { getCurrentUser } from "@/lib/auth-guards";

export default async function CreatePage() {
	const user = await getCurrentUser();

	if (!user) {
		redirect("/auth/sign-in?redirectTo=/listings/create");
	}

	return (
		<div className="mx-auto max-w-xl px-4 py-8 sm:py-10">
			<div className="mb-4">
				<Link
					href="/listings"
					className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
				>
					← Back to listings
				</Link>
			</div>
			<h1 className="font-heading text-4xl font-semibold text-foreground">
				Create Listing
			</h1>
			<p className="mt-2 text-sm leading-6 text-muted-foreground">
				Add the core housing facts first. The listing dashboard is designed to
				surface these details clearly.
			</p>

			<ListingForm
				mode="create"
				submitUrl="/api/listings"
				submitMethod="POST"
				successRedirectUrl="/listings"
			/>
		</div>
	);
}
