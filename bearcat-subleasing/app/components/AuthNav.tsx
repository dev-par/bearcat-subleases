"use client";

import Link from "next/link";
import { LogOut, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { signOut, useSession } from "@/lib/auth-client";

interface AuthNavProps {
	orientation?: "desktop" | "mobile";
	onNavigate?: () => void;
}

export default function AuthNav({
	orientation = "desktop",
	onNavigate,
}: AuthNavProps) {
	const router = useRouter();
	const { data: session, isPending } = useSession();
	const isMobile = orientation === "mobile";

	async function handleSignOut() {
		await signOut();
		onNavigate?.();
		router.push("/");
		router.refresh();
	}

	if (isPending) {
		return (
			<div
				className={
					isMobile
						? "h-11 rounded-2xl bg-muted/45"
						: "hidden h-9 w-24 rounded-full bg-muted/45 md:block"
				}
				aria-hidden="true"
			/>
		);
	}

	if (!session) {
		if (isMobile) {
			return (
				<div className="grid grid-cols-2 gap-2">
					<Button asChild variant="outline">
						<Link href="/auth/sign-in" onClick={onNavigate}>Sign in</Link>
					</Button>
					<Button asChild>
						<Link href="/auth/sign-up" onClick={onNavigate}>Sign up</Link>
					</Button>
				</div>
			);
		}
		return (
			<Button asChild variant="ghost" size="sm">
				<Link href="/auth/sign-in">Sign in</Link>
			</Button>
		);
	}

	return (
		<div className={isMobile ? "flex flex-col gap-2" : "hidden items-center gap-2 md:flex"}>
			<div className="flex min-w-0 items-center gap-2 rounded-full border border-border/80 bg-card/90 px-3 py-2 text-xs font-semibold text-foreground dark:border-white/8">
				<UserRound className="h-4 w-4 text-primary" />
				<span className="truncate">{session.user.name}</span>
			</div>
			<Button
				type="button"
				variant="outline"
				size={isMobile ? "default" : "sm"}
				onClick={handleSignOut}
			>
				<LogOut className="h-4 w-4" />
				Sign out
			</Button>
		</div>
	);
}
