"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Phone, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getListingContact, type GetListingContactResult } from "@/app/actions/listings";
import { formatFirstNameLastInitial, formatPhoneNumber } from "@/lib/format";
import type { PreferredContactMethod } from "@/types/user";

type RevealState =
	| { status: "idle" }
	| { status: "loading" }
	| {
			status: "revealed";
			name: string;
			email: string;
			phone: string | null;
			preferredContactMethod: PreferredContactMethod;
	  }
	| { status: "error"; message: string };

interface Props {
	listingId: string;
	isLoggedIn: boolean;
}

export default function ContactReveal({ listingId, isLoggedIn }: Props) {
	const [state, setState] = useState<RevealState>({ status: "idle" });

	async function handleReveal() {
		setState({ status: "loading" });
		const result: GetListingContactResult = await getListingContact(listingId);
		if (result.success) {
			setState({
				status: "revealed",
				name: result.data.name,
				email: result.data.email,
				phone: result.data.phone,
				preferredContactMethod: result.data.preferredContactMethod,
			});
		} else {
			setState({ status: "error", message: result.error });
		}
	}

	if (!isLoggedIn) {
		return (
			<div className="mt-5 rounded-[1.25rem] border border-dashed border-border/70 bg-muted/30 px-5 py-4 dark:border-white/8">
				<p className="text-sm leading-6 text-muted-foreground">
					<Link
						href={`/auth/sign-in?redirectTo=/listings/${listingId}`}
						className="font-semibold text-primary underline-offset-2 hover:underline"
					>
						Sign in
					</Link>{" "}
					to see the owner&apos;s name and email address.
				</p>
			</div>
		);
	}

	if (state.status === "revealed") {
		const showPhone = state.preferredContactMethod === "phone" && state.phone;

		return (
			<div className="mt-5 space-y-2">
				<div className="flex items-center gap-3 rounded-[1.25rem] border border-border/70 bg-muted/30 px-4 py-3 dark:border-white/8">
					<User className="h-4 w-4 shrink-0 text-primary" />
					<span className="text-sm font-medium text-foreground">
						{formatFirstNameLastInitial(state.name)}
					</span>
				</div>
				{showPhone ? (
					<a
						href={`tel:+1${state.phone}`}
						className="flex items-center gap-3 rounded-[1.25rem] border border-border/70 bg-muted/30 px-4 py-3 transition hover:border-primary/30 dark:border-white/8"
					>
						<Phone className="h-4 w-4 shrink-0 text-primary" />
						<span className="text-sm font-medium text-primary">
							{formatPhoneNumber(state.phone as string)}
						</span>
					</a>
				) : (
					<a
						href={`mailto:${state.email}`}
						className="flex items-center gap-3 rounded-[1.25rem] border border-border/70 bg-muted/30 px-4 py-3 transition hover:border-primary/30 dark:border-white/8"
					>
						<Mail className="h-4 w-4 shrink-0 text-primary" />
						<span className="text-sm font-medium text-primary">{state.email}</span>
					</a>
				)}
			</div>
		);
	}

	return (
		<div className="mt-5 space-y-3">
			{state.status === "error" && (
				<p className="text-sm text-destructive">{state.message}</p>
			)}
			<Button
				className="w-full"
				onClick={handleReveal}
				disabled={state.status === "loading"}
			>
				{state.status === "loading" ? "Loading..." : "Show contact info"}
			</Button>
		</div>
	);
}
