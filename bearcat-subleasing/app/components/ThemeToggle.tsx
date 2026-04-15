"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";

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
		<button
			type="button"
			aria-label={label}
			title={label}
			onClick={() => setTheme(nextTheme)}
			className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full border border-border/80 bg-card/90 px-3 text-sm font-semibold text-foreground shadow-card transition hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
		>
			<span className="grid h-8 w-8 place-items-center rounded-full bg-primary/10 text-primary">
				{isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
			</span>
			<span className="hidden sm:inline">{isDark ? "Light mode" : "Dark mode"}</span>
		</button>
	);
}
