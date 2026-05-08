"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle, ArrowRight } from "lucide-react";
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
import { signIn, signUp } from "@/lib/auth-client";

interface AuthFormProps {
	mode: "sign-in" | "sign-up";
	redirectTo: string;
}

export default function AuthForm({ mode, redirectTo }: AuthFormProps) {
	const router = useRouter();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const isSignUp = mode === "sign-up";
	const title = isSignUp ? "Create your account" : "Welcome back";
	const description = isSignUp
		? "Use your UC email to start posting and managing subleases."
		: "Sign in to post a listing or manage your existing subleases.";
	const submitLabel = isSignUp ? "Create account" : "Sign in";
	const pendingLabel = isSignUp ? "Creating account..." : "Signing in...";
	const alternateHref = isSignUp
		? `/auth/sign-in?redirectTo=${encodeURIComponent(redirectTo)}`
		: `/auth/sign-up?redirectTo=${encodeURIComponent(redirectTo)}`;

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setErrorMessage(null);
		setIsSubmitting(true);

		const authAction = isSignUp
			? signUp.email({
					email,
					password,
					name,
				})
			: signIn.email({
					email,
					password,
				});

		const { error } = await authAction;

		if (error) {
			setErrorMessage(error.message || "Authentication failed. Try again.");
			setIsSubmitting(false);
			return;
		}

		router.push(redirectTo);
		router.refresh();
	}

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
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

					{isSignUp ? (
						<Field label="Name" htmlFor="name" required>
							<Input
								id="name"
								name="name"
								autoComplete="name"
								value={name}
								onChange={(event) => setName(event.target.value)}
								required
							/>
						</Field>
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

					<Field
						label="Password"
						htmlFor="password"
						required
						description={
							isSignUp
								? "Use at least 8 characters."
								: undefined
						}
					>
						<Input
							id="password"
							name="password"
							type="password"
							autoComplete={isSignUp ? "new-password" : "current-password"}
							value={password}
							onChange={(event) => setPassword(event.target.value)}
							minLength={8}
							required
						/>
					</Field>

					<Button type="submit" className="w-full" disabled={isSubmitting}>
						{isSubmitting ? pendingLabel : submitLabel}
						{!isSubmitting ? <ArrowRight className="h-4 w-4" /> : null}
					</Button>
				</form>

				<p className="mt-6 text-center text-sm text-muted-foreground">
					{isSignUp ? "Already have an account?" : "Need an account?"}{" "}
					<Link
						href={alternateHref}
						className="font-semibold text-primary transition hover:text-[color:var(--brand-primary-hover)]"
					>
						{isSignUp ? "Sign in" : "Sign up"}
					</Link>
				</p>
			</CardContent>
		</Card>
	);
}
