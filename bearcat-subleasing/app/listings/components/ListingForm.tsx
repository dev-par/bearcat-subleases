"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

import type { DistanceFromCampus, ListingMutationInput } from "@/types/listing";
import { DISTANCE_OPTIONS } from "@/types/listing";
import ImageUploader from "@/app/listings/components/ImageUploader";
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
import { toast } from "@/components/ui/toast";

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
	rent_cents: 0,
	start_date: "",
	end_date: "",
	room_type: "private",
	bedrooms_in_unit: 0,
	bathrooms_in_unit_x2: 0,
	private_bathroom: false,
	distance_from_campus: "under_5",
	parking_available: null,
	furnished: false,
	imageUrls: [],
};

function SectionHeader({ children }: { children: React.ReactNode }) {
	return (
		<p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
			{children}
		</p>
	);
}

function SectionDivider() {
	return <div className="border-t border-border/50" />;
}

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
	const [rent, setRent] = useState(
		initialValues.rent_cents ? String(initialValues.rent_cents / 100) : "",
	);
	const [startDate, setStartDate] = useState(initialValues.start_date);
	const [endDate, setEndDate] = useState(initialValues.end_date);
	const [roomType, setRoomType] = useState<"private" | "shared">(
		initialValues.room_type ?? "private",
	);
	const [bedroomsInUnit, setBedroomsInUnit] = useState(
		initialValues.bedrooms_in_unit ? String(initialValues.bedrooms_in_unit) : "",
	);
	const [bathroomsDisplay, setBathroomsDisplay] = useState(
		initialValues.bathrooms_in_unit_x2 ? String(initialValues.bathrooms_in_unit_x2 / 2) : "",
	);
	const [privateBathroom, setPrivateBathroom] = useState(
		initialValues.private_bathroom,
	);
	const [distanceFromCampus, setDistanceFromCampus] = useState<DistanceFromCampus>(
		initialValues.distance_from_campus,
	);
	const [parkingAvailable, setParkingAvailable] = useState<boolean | null>(
		initialValues.parking_available,
	);
	const [furnished, setFurnished] = useState(initialValues.furnished);
	const [existingImageUrls, setExistingImageUrls] = useState(
		initialValues.imageUrls,
	);
	const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
	const hasShownValidationToast = useRef(false);

	const isEditMode = mode === "edit";
	const failureTitle = `Could not ${isEditMode ? "update" : "create"} listing`;

	const getFieldLabel = (
		field: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
	) => {
		if (!field.id) {
			return "this field";
		}
		const label = document.querySelector(`label[for="${field.id}"]`);
		return label?.textContent?.replace("*", "").trim() || "this field";
	};

	const getValidationMessage = (
		field: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
	) => {
		const label = getFieldLabel(field);
		if (field.validity.valueMissing) {
			return `Please fill out ${label}.`;
		}
		return `${label}: ${field.validationMessage}`;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		hasShownValidationToast.current = false;
		setFieldErrors({});

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
				rent_cents: Number(rent) * 100,
				start_date: startDate,
				end_date: endDate,
				room_type: roomType,
				bedrooms_in_unit: Math.round(Number(bedroomsInUnit)),
				bathrooms_in_unit_x2: Math.round(Number(bathroomsDisplay) * 2),
				private_bathroom: privateBathroom,
				distance_from_campus: distanceFromCampus,
				parking_available: parkingAvailable,
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
				toast.error(
					failureTitle,
					data.error || `Failed to ${isEditMode ? "update" : "create"} listing`,
				);
			}
		} catch (error) {
			console.error("Error:", error);
			toast.error(
				failureTitle,
				error instanceof Error ? error.message : "An error occurred",
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleInvalid = (e: React.InvalidEvent<HTMLFormElement>) => {
		e.preventDefault();

		const field = e.target as HTMLInputElement | HTMLTextAreaElement;
		const fieldKey = field.id || field.name;
		const message = getValidationMessage(field);

		if (fieldKey) {
			setFieldErrors((current) => ({
				...current,
				[fieldKey]: message,
			}));
		}

		if (hasShownValidationToast.current) {
			return;
		}

		hasShownValidationToast.current = true;
		field.closest("[data-slot='field']")?.scrollIntoView({
			behavior: "smooth",
			block: "center",
		});
		field.focus({ preventScroll: true });
		toast.error(failureTitle, message);

		window.setTimeout(() => {
			hasShownValidationToast.current = false;
		}, 250);
	};

	const handleInput = (e: React.FormEvent<HTMLFormElement>) => {
		const field = e.target as HTMLInputElement | HTMLTextAreaElement;
		const fieldKey = field.id || field.name;

		if (!fieldKey || !fieldErrors[fieldKey]) {
			return;
		}

		setFieldErrors((current) => {
			const nextErrors = { ...current };
			delete nextErrors[fieldKey];
			return nextErrors;
		});
	};

	return (
		<Card className="mt-8 border-border/70">
			<CardContent className="p-6 sm:p-7">
				<form
					onSubmit={handleSubmit}
					onInvalid={handleInvalid}
					onInput={handleInput}
					className="space-y-6"
				>
					{/* BASICS */}
					<div className="space-y-4">
						<SectionHeader>Basics</SectionHeader>

						<Field
							label="Title"
							htmlFor="title"
							required
							error={fieldErrors.title}
						>
							<Input
								id="title"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								placeholder="e.g. Private room near UC campus"
								required
							/>
						</Field>

						<Field
							label="Description"
							htmlFor="description"
							description="Describe the setup, roommate situation, and anything a student would want to know before reaching out."
							error={fieldErrors.description}
						>
							<Textarea
								id="description"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								maxLength={512}
								rows={4}
							/>
							<p className="mt-1 text-right text-xs text-muted-foreground">
								{description.length}/512
							</p>
						</Field>

						<Field label="Distance from Campus" htmlFor="distance-from-campus" required>
							<Select
								value={distanceFromCampus}
								onValueChange={(value) => setDistanceFromCampus(value as DistanceFromCampus)}
							>
								<SelectTrigger id="distance-from-campus">
									<SelectValue placeholder="Select walking distance" />
								</SelectTrigger>
								<SelectContent>
									{DISTANCE_OPTIONS.map(({ value, label }) => (
										<SelectItem key={value} value={value}>{label}</SelectItem>
									))}
								</SelectContent>
							</Select>
						</Field>
					</div>

					<SectionDivider />

					{/* AVAILABILITY */}
					<div className="space-y-4">
						<SectionHeader>Availability</SectionHeader>

						<div className="grid gap-4 sm:grid-cols-2">
							<Field
								label="Start Date"
								htmlFor="start-date"
								required
								error={fieldErrors["start-date"]}
							>
								<Input
									id="start-date"
									type="date"
									value={startDate}
									onChange={(e) => setStartDate(e.target.value)}
									required
								/>
							</Field>

							<Field
								label="End Date"
								htmlFor="end-date"
								required
								error={fieldErrors["end-date"]}
							>
								<Input
									id="end-date"
									type="date"
									value={endDate}
									onChange={(e) => setEndDate(e.target.value)}
									required
								/>
							</Field>
						</div>

						<Field
							label="Rent (per month)"
							htmlFor="rent"
							required
							error={fieldErrors.rent}
						>
							<div className="relative">
								<span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-muted-foreground">
									$
								</span>
								<Input
									id="rent"
									type="number"
									value={rent}
									onChange={(e) => setRent(e.target.value)}
									min="0"
									required
									className="pl-7"
									placeholder="0"
								/>
							</div>
						</Field>
					</div>

					<SectionDivider />

					{/* DETAILS */}
					<div className="space-y-4">
						<SectionHeader>Details</SectionHeader>

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
									<SelectItem value="private">Private room</SelectItem>
									<SelectItem value="shared">Shared room</SelectItem>
								</SelectContent>
							</Select>
						</Field>

						<div className="grid gap-4 sm:grid-cols-2">
							<Field
								label="Bedrooms in unit"
								htmlFor="bedrooms"
								required
								error={fieldErrors.bedrooms}
							>
								<Input
									id="bedrooms"
									type="number"
									value={bedroomsInUnit}
									onChange={(e) => setBedroomsInUnit(e.target.value)}
									min="1"
									step="0.5"
									required
									placeholder="0"
								/>
							</Field>

							<Field
								label="Bathrooms in unit"
								htmlFor="bathrooms"
								required
								error={fieldErrors.bathrooms}
							>
								<Input
									id="bathrooms"
									type="number"
									value={bathroomsDisplay}
									onChange={(e) => setBathroomsDisplay(e.target.value)}
									min="0.5"
									step="0.5"
									required
									placeholder="0"
								/>
							</Field>
						</div>

						<div className="grid gap-3 sm:grid-cols-3">
							<label className="flex cursor-pointer items-center gap-3 rounded-[1.35rem] border border-border/70 bg-muted/35 px-4 py-3 text-foreground transition-colors hover:bg-muted/50 dark:border-white/8 dark:bg-white/3">
								<Checkbox
									checked={privateBathroom}
									onCheckedChange={(checked) =>
										setPrivateBathroom(checked === true)
									}
								/>
								<div>
									<p className="text-sm font-semibold">Private Bathroom</p>
									<p className="text-xs text-muted-foreground">
										Exclusive bathroom access.
									</p>
								</div>
							</label>
							<label className="flex cursor-pointer items-center gap-3 rounded-[1.35rem] border border-border/70 bg-muted/35 px-4 py-3 text-foreground transition-colors hover:bg-muted/50 dark:border-white/8 dark:bg-white/3">
								<Checkbox
									checked={furnished}
									onCheckedChange={(checked) => setFurnished(checked === true)}
								/>
								<div>
									<p className="text-sm font-semibold">Furnished</p>
									<p className="text-xs text-muted-foreground">
										Move-in ready.
									</p>
								</div>
							</label>
							<label className="flex cursor-pointer items-center gap-3 rounded-[1.35rem] border border-border/70 bg-muted/35 px-4 py-3 text-foreground transition-colors hover:bg-muted/50 dark:border-white/8 dark:bg-white/3">
								<Checkbox
									checked={parkingAvailable === true}
									onCheckedChange={(checked) =>
										setParkingAvailable(checked === true ? true : null)
									}
								/>
								<div>
									<p className="text-sm font-semibold">Parking Available</p>
									<p className="text-xs text-muted-foreground">
										On-site or nearby.
									</p>
								</div>
							</label>
						</div>
					</div>

					<SectionDivider />

					{/* PHOTOS */}
					<div className="space-y-3">
						<div>
							<SectionHeader>Photos</SectionHeader>
							<p className="mt-1 text-xs text-muted-foreground">
								{isEditMode
									? "Keep existing photos, remove any that no longer apply, or add new ones."
									: "Upload one or more photos to help the listing feel credible at a glance."}
							</p>
						</div>
						<ImageUploader
							existingUrls={existingImageUrls}
							onRemoveExisting={(url) =>
								setExistingImageUrls((current) =>
									current.filter((item) => item !== url),
								)
							}
							files={selectedFiles}
							onFilesChange={setSelectedFiles}
						/>
					</div>

					<SectionDivider />

					<div className="flex gap-3">
						<Button
							type="button"
							variant="ghost"
							className="flex-1"
							onClick={() => router.back()}
						>
							Cancel
						</Button>
						<Button type="submit" disabled={isSubmitting} className="flex-1">
							{isSubmitting
								? isEditMode
									? "Saving..."
									: "Creating..."
								: isEditMode
									? "Save Changes"
									: "Create Listing"}
						</Button>
					</div>
				</form>
			</CardContent>
		</Card>
	);
}
