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
				className="w-full mt-4 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition font-semibold disabled:opacity-50"
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
				className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition font-semibold disabled:opacity-50"
			>
				{isDeleting ? "Deleting..." : "Confirm Delete"}
			</button>
			<button
				onClick={() => setShowConfirm(false)}
				disabled={isDeleting}
				className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition font-semibold disabled:opacity-50"
			>
				Cancel
			</button>
		</div>
	);
}
