"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import type { ListingMutationInput } from "@/types/listing";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export interface ListingFormInitialValues extends ListingMutationInput {
	imageUrls: string[];
}

interface ListingFormProps {
	mode: "create" | "edit";
	initialValues?: ListingFormInitialValues;
	submitUrl: string;
	submitMethod: "POST" | "PUT";
	successRedirectUrl: string;
}

const defaultValues: ListingFormInitialValues = {
	title: "",
	description: null,
	address: null,
	rent_cents: 0,
	start_date: "",
	end_date: "",
	room_type: "private",
	bedrooms_in_unit: 1,
	bathrooms_in_unit_x2: 2,
	private_bathroom: false,
	furnished: false,
	imageUrls: [],
};

export default function ListingForm({
	mode,
	initialValues = defaultValues,
	submitUrl,
	submitMethod,
	successRedirectUrl,
}: ListingFormProps) {
	const router = useRouter();
	const [title, setTitle] = useState(initialValues.title);
	const [description, setDescription] = useState(initialValues.description ?? "");
	const [address, setAddress] = useState(initialValues.address ?? "");
	const [rent, setRent] = useState(
		initialValues.rent_cents ? String(initialValues.rent_cents / 100) : "",
	);
	const [startDate, setStartDate] = useState(initialValues.start_date);
	const [endDate, setEndDate] = useState(initialValues.end_date);
	const [roomType, setRoomType] = useState<"private" | "shared">(
		initialValues.room_type ?? "private",
	);
	const [bedroomsInUnit, setBedroomsInUnit] = useState(
		initialValues.bedrooms_in_unit,
	);
	const [bathroomsInUnit, setBathroomsInUnit] = useState(
		initialValues.bathrooms_in_unit_x2 / 2,
	);
	const [privateBathroom, setPrivateBathroom] = useState(
		initialValues.private_bathroom,
	);
	const [furnished, setFurnished] = useState(initialValues.furnished);
	const [existingImageUrls, setExistingImageUrls] = useState(
		initialValues.imageUrls,
	);
	const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const isEditMode = mode === "edit";

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setErrorMessage(null);

		try {
			const uploadedImageUrls: string[] = [];
			for (const file of selectedFiles) {
				const formData = new FormData();
				formData.append("file", file);

				const uploadRes = await fetch("/api/upload/listing_photo", {
					method: "POST",
					body: formData,
				});

				const uploadData = await uploadRes.json();
				if (uploadData.success) {
					uploadedImageUrls.push(uploadData.url);
				} else {
					throw new Error(uploadData.error || "Failed to upload image");
				}
			}

			const listingData: ListingMutationInput = {
				title,
				description: description || null,
				address: address || null,
				rent_cents: Number(rent) * 100,
				start_date: startDate,
				end_date: endDate,
				room_type: roomType,
				bedrooms_in_unit: bedroomsInUnit,
				bathrooms_in_unit_x2: bathroomsInUnit * 2,
				private_bathroom: privateBathroom,
				furnished,
			};

			const res = await fetch(submitUrl, {
				method: submitMethod,
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					...listingData,
					imageUrls: [...existingImageUrls, ...uploadedImageUrls],
				}),
			});
			const data = await res.json();

			if (data.success) {
				router.push(successRedirectUrl);
				router.refresh();
			} else {
				setErrorMessage(
					data.error || `Failed to ${isEditMode ? "update" : "create"} listing`,
				);
			}
		} catch (error) {
			console.error("Error:", error);
			setErrorMessage(
				error instanceof Error ? error.message : "An error occurred",
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Card className="mt-8 border-border/70">
			<CardContent className="p-6 sm:p-7">
				<form onSubmit={handleSubmit} className="space-y-5">
					{errorMessage ? (
						<Alert variant="destructive">
							<AlertTitle>
								Could not {isEditMode ? "update" : "create"} listing
							</AlertTitle>
							<AlertDescription>{errorMessage}</AlertDescription>
						</Alert>
					) : null}

					<Field label="Title" htmlFor="title" required>
						<Input
							id="title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							required
						/>
					</Field>

					<Field
						label="Description"
						htmlFor="description"
						description="Describe the setup, roommate situation, and any useful context a student would want to know early."
						required
					>
						<Textarea
							id="description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							required
						/>
					</Field>

					<Field label="Address" htmlFor="address">
						<Input
							id="address"
							value={address}
							onChange={(e) => setAddress(e.target.value)}
						/>
					</Field>

					<Field label="Rent ($/month)" htmlFor="rent" required>
						<Input
							id="rent"
							type="number"
							value={rent}
							onChange={(e) => setRent(e.target.value)}
							min="0"
							required
						/>
					</Field>

					<div className="grid gap-4 sm:grid-cols-2">
						<Field label="Start Date" htmlFor="start-date" required>
							<Input
								id="start-date"
								type="date"
								value={startDate}
								onChange={(e) => setStartDate(e.target.value)}
								required
							/>
						</Field>

						<Field label="End Date" htmlFor="end-date" required>
							<Input
								id="end-date"
								type="date"
								value={endDate}
								onChange={(e) => setEndDate(e.target.value)}
								required
							/>
						</Field>
					</div>

					<Field label="Room Type" required>
						<Select
							value={roomType}
							onValueChange={(value) =>
								setRoomType(value as "private" | "shared")
							}
						>
							<SelectTrigger>
								<SelectValue placeholder="Choose room type" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="private">Private</SelectItem>
								<SelectItem value="shared">Shared</SelectItem>
							</SelectContent>
						</Select>
					</Field>

					<div className="grid gap-4 sm:grid-cols-2">
						<Field label="Bedrooms" htmlFor="bedrooms" required>
							<Input
								id="bedrooms"
								type="number"
								value={bedroomsInUnit}
								onChange={(e) => setBedroomsInUnit(Number(e.target.value))}
								min="1"
								required
							/>
						</Field>
						<Field label="Bathrooms" htmlFor="bathrooms" required>
							<Input
								id="bathrooms"
								type="number"
								value={bathroomsInUnit}
								onChange={(e) => setBathroomsInUnit(Number(e.target.value))}
								min="0"
								step="0.5"
								required
							/>
						</Field>
					</div>

					<div className="grid gap-3 sm:grid-cols-2">
						<label className="flex items-center gap-3 rounded-[1.35rem] border border-border/70 bg-muted/35 px-4 py-3 text-foreground dark:border-white/8 dark:bg-white/3">
							<Checkbox
								checked={privateBathroom}
								onCheckedChange={(checked) =>
									setPrivateBathroom(checked === true)
								}
							/>
							<div>
								<p className="text-sm font-semibold">Private Bathroom</p>
								<p className="text-xs text-muted-foreground">
									Highlight stronger privacy for renters.
								</p>
							</div>
						</label>
						<label className="flex items-center gap-3 rounded-[1.35rem] border border-border/70 bg-muted/35 px-4 py-3 text-foreground dark:border-white/8 dark:bg-white/3">
							<Checkbox
								checked={furnished}
								onCheckedChange={(checked) => setFurnished(checked === true)}
							/>
							<div>
								<p className="text-sm font-semibold">Furnished</p>
								<p className="text-xs text-muted-foreground">
									Let students know if move-in is easier.
								</p>
							</div>
						</label>
					</div>

					<Field
						label="Images"
						htmlFor="images"
						description={
							isEditMode
								? "Keep existing photos, remove any that should no longer appear, or add new ones."
								: "Upload one or more photos to help the listing feel credible at a glance."
						}
					>
						{existingImageUrls.length > 0 ? (
							<div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
								{existingImageUrls.map((url) => (
									<div
										key={url}
										className="overflow-hidden rounded-[1rem] border border-border bg-card"
									>
										<Image
											src={url}
											alt="Existing listing photo"
											width={240}
											height={180}
											className="aspect-[4/3] w-full object-cover"
										/>
										<Button
											type="button"
											variant="ghost"
											className="h-9 w-full rounded-none text-xs"
											onClick={() =>
												setExistingImageUrls((current) =>
													current.filter((item) => item !== url),
												)
											}
										>
											Remove
										</Button>
									</div>
								))}
							</div>
						) : null}
						<Input
							id="images"
							type="file"
							accept="image/*"
							multiple
							onChange={(e) => {
								const files = e.target.files;
								if (files) {
									setSelectedFiles(Array.from(files));
								}
							}}
						/>
						{selectedFiles.length > 0 ? (
							<p className="text-sm text-muted-foreground">
								{selectedFiles.length} file(s) selected
							</p>
						) : null}
					</Field>

					<Button type="submit" disabled={isSubmitting} className="w-full">
						{isSubmitting
							? isEditMode
								? "Saving..."
								: "Creating..."
							: isEditMode
								? "Save Changes"
								: "Create Listing"}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}
