"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type ToastVariant = "default" | "destructive";

interface ToastOptions {
	title: string;
	description?: string;
	variant?: ToastVariant;
}

interface ToastItem extends Required<ToastOptions> {
	id: number;
}

type ToastListener = (toast: ToastItem) => void;

const listeners = new Set<ToastListener>();
let toastId = 0;

function showToast({
	title,
	description = "",
	variant = "default",
}: ToastOptions) {
	const nextToast = {
		id: toastId++,
		title,
		description,
		variant,
	};

	listeners.forEach((listener) => listener(nextToast));
}

export const toast = {
	message: showToast,
	error: (title: string, description?: string) =>
		showToast({ title, description, variant: "destructive" }),
};

export function Toaster() {
	const [toasts, setToasts] = useState<ToastItem[]>([]);

	useEffect(() => {
		const listener: ToastListener = (nextToast) => {
			setToasts((current) => [...current, nextToast]);

			window.setTimeout(() => {
				setToasts((current) =>
					current.filter((toast) => toast.id !== nextToast.id),
				);
			}, 5000);
		};

		listeners.add(listener);
		return () => {
			listeners.delete(listener);
		};
	}, []);

	return (
		<div className="fixed right-4 top-24 z-50 flex w-[calc(100vw-2rem)] max-w-sm flex-col gap-3 sm:right-6">
			{toasts.map((toast) => (
				<div
					key={toast.id}
					role="status"
					aria-live="polite"
					className={cn(
						"rounded-2xl border bg-card px-4 py-3 text-card-foreground shadow-soft",
						toast.variant === "destructive"
							? "border-destructive/35 bg-destructive/10 text-foreground"
							: "border-border/80",
					)}
				>
					<p className="text-sm font-semibold">{toast.title}</p>
					{toast.description ? (
						<p className="mt-1 text-sm leading-5 text-muted-foreground">
							{toast.description}
						</p>
					) : null}
				</div>
			))}
		</div>
	);
}
