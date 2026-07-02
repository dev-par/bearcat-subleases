"use client";

import Image from "next/image";
import Link from "next/link";
import { LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import NavLinks from "./NavLinks";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetTrigger,
} from "@/components/ui/sheet";
import { signOut, useSession } from "@/lib/auth-client";
import { PRIMARY_CTA } from "./nav-config";

function getInitials(name: string): string {
	return name
		.split(" ")
		.map((n) => n[0])
		.join("")
		.toUpperCase()
		.slice(0, 2);
}

export default function MobileNav() {
	const [open, setOpen] = useState(false);
	const { data: session, isPending } = useSession();
	const router = useRouter();
	const user = session?.user;

	async function handleSignOut() {
		await signOut();
		setOpen(false);
		router.push("/");
		router.refresh();
	}

	return (
		<div className="md:hidden">
			<Sheet open={open} onOpenChange={setOpen}>
				<SheetTrigger asChild>
					<Button
						aria-label={open ? "Close navigation menu" : "Open navigation menu"}
						variant="ghost"
						size="icon"
					>
						<Menu className="h-5 w-5" />
					</Button>
				</SheetTrigger>
				<SheetContent
					side="right"
					showCloseButton={false}
					className="flex flex-col border-border/80 bg-background/98 px-5 pb-6 pt-[env(safe-area-inset-top)] backdrop-blur-xl sm:px-8"
				>
					{/* Header */}
					<div className="flex items-center justify-between py-3">
						<Link
							href="/"
							onClick={() => setOpen(false)}
							className="flex items-center gap-2"
						>
							<Image
								src="/BC_LOGO.png"
								alt="Bearcat Subleasing"
								width={36}
								height={36}
								className="shrink-0 rounded-lg"
							/>
							<span className="text-sm font-semibold text-foreground">
								Bearcat Subleasing
							</span>
						</Link>
						<SheetClose asChild>
							<Button
								variant="ghost"
								size="icon"
								aria-label="Close navigation menu"
							>
								<X className="h-5 w-5" />
							</Button>
						</SheetClose>
					</div>

					{/* Auth section */}
					{isPending ? (
						<div className="h-16 animate-pulse rounded-lg bg-muted" />
					) : user ? (
						<div className="flex items-center gap-3 border-b border-border py-4">
							<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
								{getInitials(user.name ?? user.email)}
							</div>
							<div className="min-w-0">
								<p className="truncate text-sm font-semibold text-foreground">
									{user.name}
								</p>
								<p className="truncate text-xs text-muted-foreground">
									{user.email}
								</p>
							</div>
						</div>
					) : (
						<div className="grid grid-cols-2 gap-2 border-b border-border pb-4">
							<Button variant="outline" asChild>
								<Link href="/auth/sign-in" onClick={() => setOpen(false)}>
									Sign in
								</Link>
							</Button>
							<Button asChild>
								<Link href="/auth/sign-up" onClick={() => setOpen(false)}>
									Sign up
								</Link>
							</Button>
						</div>
					)}

					{/* Nav links */}
					<nav className="flex flex-col py-2">
						<NavLinks orientation="mobile" onNavigate={() => setOpen(false)} />
						<Link
							href={PRIMARY_CTA.href}
							onClick={() => setOpen(false)}
							className="w-full py-3 text-base font-medium text-foreground transition-colors hover:text-primary"
						>
							{PRIMARY_CTA.label}
						</Link>
					</nav>

					{/* Sign out */}
					{user && (
						<div className="mt-auto border-t border-border pt-4">
							<button
								onClick={handleSignOut}
								className="flex w-full items-center gap-2 py-3 text-base font-medium text-destructive transition-colors hover:text-destructive/80"
							>
								<LogOut className="h-4 w-4" aria-hidden />
								Sign out
							</button>
						</div>
					)}
				</SheetContent>
			</Sheet>
		</div>
	);
}
