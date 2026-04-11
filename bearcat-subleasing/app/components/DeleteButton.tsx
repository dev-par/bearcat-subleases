"use client";

import { deleteListing } from "../actions/listings";
import { useState } from "react";

interface DeleteButtonProps {
	listingId: string;
}

export default function DeleteButton({ listingId }: DeleteButtonProps) {
	const [showConfirm, setShowConfirm] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);

	async function handleClick() {
		setIsDeleting(true);

		const result = await deleteListing(listingId);

		if (result?.success == false) {
			console.error("Error deleting listing:");
			alert("Failed to delete listing");
			setIsDeleting(false);
			setShowConfirm(false);
		}
	}

	if (!showConfirm) {
		return (
			<button
				type="button"
				className="mt-4 w-full rounded-full bg-destructive px-5 py-3 text-sm font-semibold text-destructive-foreground transition hover:opacity-90 disabled:opacity-50"
				onClick={() => setShowConfirm(true)}
				disabled={isDeleting}
			>
				Delete Listing
			</button>
		);
	}

	return (
		<div className="flex gap-2 mt-4">
			<button
				onClick={handleClick}
				disabled={isDeleting}
				className="flex-1 rounded-full bg-destructive px-5 py-3 text-sm font-semibold text-destructive-foreground transition hover:opacity-90 disabled:opacity-50"
			>
				{isDeleting ? "Deleting..." : "Confirm Delete"}
			</button>
			<button
				onClick={() => setShowConfirm(false)}
				disabled={isDeleting}
				className="flex-1 rounded-full border border-border bg-muted px-5 py-3 text-sm font-semibold text-foreground transition hover:border-primary/15 hover:text-primary disabled:opacity-50"
			>
				Cancel
			</button>
		</div>
	);
}
