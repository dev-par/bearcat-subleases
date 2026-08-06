"use client";

import Link from "next/link";
import { AlertCircle, ArrowRight, CheckCircle2 } from "lucide-react";
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
import { resetPassword } from "@/lib/auth-client";

interface ResetPasswordFormProps {
	token: string;
}

export default function ResetPasswordForm({ token }: ResetPasswordFormProps) {
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isDone, setIsDone] = useState(false);

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setErrorMessage(null);

		if (newPassword !== confirmPassword) {
			setErrorMessage("Passwords do not match.");
			return;
		}

		setIsSubmitting(true);

		const { error } = await resetPassword({ newPassword, token });

		if (error) {
			setErrorMessage(error.message || "Could not reset password. Try again.");
			setIsSubmitting(false);
			return;
		}

		setIsSubmitting(false);
		setIsDone(true);
	}

	if (isDone) {
		return (
			<Card className="w-full">
				<CardHeader>
					<CardTitle>Password reset</CardTitle>
					<CardDescription>
						Your password has been updated. Sign in with your new password.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<Alert>
						<CheckCircle2 className="absolute right-4 top-4 h-4 w-4" />
						<AlertTitle>Success</AlertTitle>
						<AlertDescription>
							You can now sign in using your new password.
						</AlertDescription>
					</Alert>

					<Button asChild className="w-full">
						<Link href="/auth/sign-in">
							Go to sign in
							<ArrowRight className="h-4 w-4" />
						</Link>
					</Button>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>Set a new password</CardTitle>
				<CardDescription>Choose a new password for your account.</CardDescription>
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

					<Field
						label="New password"
						htmlFor="newPassword"
						required
						description="Use at least 8 characters."
					>
						<Input
							id="newPassword"
							name="newPassword"
							type="password"
							autoComplete="new-password"
							value={newPassword}
							onChange={(event) => setNewPassword(event.target.value)}
							minLength={8}
							required
						/>
					</Field>

					<Field label="Confirm password" htmlFor="confirmPassword" required>
						<Input
							id="confirmPassword"
							name="confirmPassword"
							type="password"
							autoComplete="new-password"
							value={confirmPassword}
							onChange={(event) => setConfirmPassword(event.target.value)}
							minLength={8}
							required
						/>
					</Field>

					<Button type="submit" className="w-full" disabled={isSubmitting}>
						{isSubmitting ? "Resetting..." : "Reset password"}
						{!isSubmitting ? <ArrowRight className="h-4 w-4" /> : null}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}
