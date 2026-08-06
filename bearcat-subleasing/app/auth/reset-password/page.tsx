import type { Metadata } from "next";
import Link from "next/link";
import { AlertCircle } from "lucide-react";

import ResetPasswordForm from "@/app/auth/components/ResetPasswordForm";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
	title: "Reset Password",
	description: "Set a new password for your Bearcat Subleasing account.",
};

export default async function ResetPasswordPage({
	searchParams,
}: {
	searchParams: Promise<{ token?: string | string[]; error?: string | string[] }>;
}) {
	const { token: rawToken, error } = await searchParams;
	const token = Array.isArray(rawToken) ? rawToken[0] : rawToken;

	return (
		<main className="px-5 py-10 sm:px-8 sm:py-14">
			<div className="mx-auto flex max-w-md flex-col gap-6">
				<Link
					href="/listings"
					className="inline-flex items-center -my-2 py-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
				>
					← Back to listings
				</Link>

				{token && !error ? (
					<ResetPasswordForm token={token} />
				) : (
					<Card className="w-full">
						<CardHeader>
							<CardTitle>Link expired or invalid</CardTitle>
							<CardDescription>
								This password reset link is no longer valid. Request a new
								one.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<Alert variant="destructive">
								<AlertCircle className="absolute right-4 top-4 h-4 w-4" />
								<AlertTitle>Could not continue</AlertTitle>
								<AlertDescription>
									The link may have expired, already been used, or was
									copied incorrectly.
								</AlertDescription>
							</Alert>

							<Button asChild className="w-full">
								<Link href="/auth/forgot-password">Request new link</Link>
							</Button>
						</CardContent>
					</Card>
				)}
			</div>
		</main>
	);
}
