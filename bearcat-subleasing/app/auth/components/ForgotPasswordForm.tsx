"use client";

import Link from "next/link";
import { AlertCircle, ArrowRight, MailCheck } from "lucide-react";
import { useState } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { requestPasswordReset } from "@/lib/auth-client";

export default function ForgotPasswordForm() {
	const [email, setEmail] = useState("");
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSent, setIsSent] = useState(false);

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setErrorMessage(null);
		setIsSubmitting(true);

		const { error } = await requestPasswordReset({
			email,
			redirectTo: "/auth/reset-password",
		});

		if (error) {
			setErrorMessage(error.message || "Could not send reset email. Try again.");
			setIsSubmitting(false);
			return;
		}

		setIsSubmitting(false);
		setIsSent(true);
	}

	if (isSent) {
		return (
			<Card className="w-full">
				<CardHeader>
					<CardTitle>Check your email</CardTitle>
					<CardDescription>
						If an account exists for {email}, we sent a link to reset your
						password.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<Alert>
						<MailCheck className="absolute right-4 top-4 h-4 w-4" />
						<AlertTitle>Almost there</AlertTitle>
						<AlertDescription>
							Didn&apos;t get it? Check your spam folder, or{" "}
							<Link
								href="/auth/sign-in"
								className="font-semibold text-primary transition hover:text-[color:var(--brand-primary-hover)]"
							>
								back to sign in
							</Link>
							.
						</AlertDescription>
					</Alert>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>Forgot your password?</CardTitle>
				<CardDescription>
					Enter your email and we&apos;ll send you a link to reset it.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form className="space-y-5" onSubmit={handleSubmit}>
					{errorMessage ? (
						<Alert variant="destructive">
							<AlertCircle className="absolute right-4 top-4 h-4 w-4" />
							<AlertTitle>Could not continue</AlertTitle>
							<AlertDescription>{errorMessage}</AlertDescription>
						</Alert>
					) : null}

					<Field label="Email" htmlFor="email" required>
						<Input
							id="email"
							name="email"
							type="email"
							autoComplete="email"
							value={email}
							onChange={(event) => setEmail(event.target.value)}
							required
						/>
					</Field>

					<Button type="submit" className="w-full" disabled={isSubmitting}>
						{isSubmitting ? "Sending..." : "Send reset link"}
						{!isSubmitting ? <ArrowRight className="h-4 w-4" /> : null}
					</Button>
				</form>

				<p className="mt-6 text-center text-sm text-muted-foreground">
					Remembered your password?{" "}
					<Link
						href="/auth/sign-in"
						className="font-semibold text-primary transition hover:text-[color:var(--brand-primary-hover)]"
					>
						Sign in
					</Link>
				</p>
			</CardContent>
		</Card>
	);
}
