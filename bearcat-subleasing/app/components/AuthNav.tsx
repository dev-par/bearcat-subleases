"use client";

import Link from "next/link";
import { ChevronDown, LogOut, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "@/lib/auth-client";

interface AuthNavProps {
	orientation?: "desktop" | "mobile" | "sidebar";
	onNavigate?: () => void;
}

export default function AuthNav({
	orientation = "desktop",
	onNavigate,
}: AuthNavProps) {
	const router = useRouter();
	const { data: session, isPending } = useSession();
	const isMobile = orientation === "mobile";
	const isSidebar = orientation === "sidebar";

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
						: isSidebar
							? "h-9 w-24 rounded-full bg-muted/45"
							: "h-9 w-9 rounded-full bg-muted/45 md:w-24"
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

	if (isMobile) {
		return (
			<div className="flex flex-col gap-2">
				<Link
					href="/profile"
					onClick={onNavigate}
					className="flex min-w-0 items-center gap-2 rounded-full border border-border/80 bg-card/90 px-3 py-2 text-xs font-semibold text-foreground dark:border-white/8"
				>
					<UserRound className="h-4 w-4 text-primary" />
					<span className="truncate">{session.user.name}</span>
				</Link>
				<Button
					type="button"
					variant="outline"
					size="default"
					onClick={handleSignOut}
				>
					<LogOut className="h-4 w-4" />
					Sign out
				</Button>
			</div>
		);
	}

	if (isSidebar) {
		return (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<button className="group flex min-w-0 items-center gap-2 rounded-full border border-border/80 bg-card/90 px-3 py-2 text-xs font-semibold text-foreground transition hover:bg-card data-[state=open]:border-primary/40 data-[state=open]:bg-card data-[state=open]:text-primary dark:border-white/8 dark:hover:bg-card/70 dark:data-[state=open]:border-primary/30 dark:data-[state=open]:bg-card/70">
						<UserRound className="h-4 w-4 text-primary" />
						<span className="truncate">{session.user.name}</span>
						<ChevronDown className="h-3.5 w-3.5 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
					</button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="start" className="w-44">
					<DropdownMenuItem asChild>
						<Link href="/profile" onClick={onNavigate}>My Listings</Link>
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem onClick={handleSignOut}>
						<LogOut className="h-4 w-4" />
						Sign out
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		);
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className="group flex min-w-0 items-center gap-2 rounded-full border border-border/80 bg-card/90 px-3 py-2 text-xs font-semibold text-foreground transition hover:bg-card data-[state=open]:border-primary/40 data-[state=open]:bg-card data-[state=open]:text-primary dark:border-white/8 dark:hover:bg-card/70 dark:data-[state=open]:border-primary/30 dark:data-[state=open]:bg-card/70">
					<UserRound className="h-4 w-4 text-primary" />
					<span className="hidden truncate md:inline">{session.user.name}</span>
					<ChevronDown className="h-3.5 w-3.5 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-44">
				<DropdownMenuItem asChild>
					<Link href="/profile">My Listings</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={handleSignOut}>
					<LogOut className="h-4 w-4" />
					Sign out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
