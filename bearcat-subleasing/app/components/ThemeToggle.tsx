"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export default function ThemeToggle() {
	const mounted = useSyncExternalStore(
		() => () => {},
		() => true,
		() => false,
	);
	const { resolvedTheme, setTheme } = useTheme();
	const isDark = resolvedTheme === "dark";
	const nextTheme = isDark ? "light" : "dark";
	const label = `Switch to ${nextTheme} mode`;

	if (!mounted) {
		return (
			<span
				aria-hidden="true"
				className="inline-flex h-11 w-11 shrink-0 rounded-full border border-border/70 bg-card/80"
			/>
		);
	}

	return (
		<Button
			aria-label={label}
			title={label}
			variant="outline"
			onClick={() => setTheme(nextTheme)}
			className="h-11 px-3"
		>
			<span className="grid h-8 w-8 place-items-center rounded-full bg-primary/10 text-primary">
				{isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
			</span>
			<span className="hidden sm:inline">{isDark ? "Light mode" : "Dark mode"}</span>
		</Button>
	);
}
