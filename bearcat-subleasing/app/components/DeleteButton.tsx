"use client";

import { deleteListing } from "../actions/listings";
import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface DeleteButtonProps {
	listingId: string;
}

export default function DeleteButton({ listingId }: DeleteButtonProps) {
	const [open, setOpen] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	async function handleClick() {
		setIsDeleting(true);
		setErrorMessage(null);

		const result = await deleteListing(listingId);

		if (result?.success == false) {
			console.error("Error deleting listing:", result.error);
			setErrorMessage(result.error || "Failed to delete listing");
			setIsDeleting(false);
			return;
		}
	}

	return (
		<div className="mt-6 space-y-3">
			{errorMessage ? (
				<Alert variant="destructive">
					<AlertTitle>Delete failed</AlertTitle>
					<AlertDescription>{errorMessage}</AlertDescription>
				</Alert>
			) : null}

			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button variant="destructive" className="w-full">
						Delete Listing
					</Button>
				</DialogTrigger>
				<DialogContent showClose={!isDeleting}>
					<DialogHeader>
						<DialogTitle>Delete this listing?</DialogTitle>
						<DialogDescription>
							This removes the listing and its uploaded images. Use this only if you are sure the listing should no longer be available.
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Button
							type="button"
							variant="outline"
							onClick={() => setOpen(false)}
							disabled={isDeleting}
						>
							Cancel
						</Button>
						<Button
							type="button"
							variant="destructive"
							onClick={handleClick}
							disabled={isDeleting}
						>
							{isDeleting ? "Deleting..." : "Confirm Delete"}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
