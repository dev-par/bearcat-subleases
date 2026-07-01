"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import NavLinks from "./NavLinks";
import ThemeToggle from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetTrigger,
} from "@/components/ui/sheet";

export default function MobileNav() {
	const [open, setOpen] = useState(false);

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

					<nav className="flex flex-col gap-1">
						<NavLinks orientation="mobile" onNavigate={() => setOpen(false)} />
					</nav>

					<div className="mt-auto flex justify-end pt-6">
						<ThemeToggle />
					</div>
				</SheetContent>
			</Sheet>
		</div>
	);
}
