import Image from "next/image";
import Link from "next/link";

import AuthNav from "./AuthNav";
import MobileNav from "./MobileNav";
import NavLinks from "./NavLinks";
import ThemeToggle from "./ThemeToggle";
import { PRIMARY_CTA } from "./nav-config";
import { Button } from "@/components/ui/button";

export default function Navbar() {
	return (
		<header className="sticky top-0 z-40 border-b border-border/70 bg-background/78 pt-[env(safe-area-inset-top)] backdrop-blur-xl supports-backdrop-filter:bg-background/70">
			<div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-4 sm:px-8 md:grid md:grid-cols-[1fr_auto_1fr] md:gap-4">
				<Link href="/" className="flex items-center gap-.5">
					<Image
						src="/BC_LOGO.png"
						alt="Bearcat Subleasing"
						width={44}
						height={44}
						className="shrink-0 rounded-lg"
					/>
					<span className="hidden text-base font-semibold tracking-tight text-foreground sm:block">
						Bearcat Subleasing
					</span>
				</Link>

				<NavLinks />

				<div className="flex items-center justify-end gap-3">
					<ThemeToggle />
					<div className="hidden md:flex">
						<AuthNav />
					</div>
					<div className="hidden items-center gap-3 md:flex">
						<Button asChild>
							<Link href={PRIMARY_CTA.href}>{PRIMARY_CTA.label}</Link>
						</Button>
					</div>
					<MobileNav />
				</div>
			</div>
		</header>
	);
}
