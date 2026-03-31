import type { ListingMutationInput, ListingSubmissionInput } from "@/types/listing";
import { InputValidationError } from "@/lib/errors";

const MAX_IMAGE_COUNT = 10;
const UUID_REGEX =
	/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function isValidUuid(value: string): boolean {
	return UUID_REGEX.test(value);
}

function normalizeOptionalString(value: unknown, maxLength: number): string | null {
	if (typeof value !== "string") {
		return null;
	}

	const trimmed = value.trim();
	if (!trimmed) {
		return null;
	}

	return trimmed.slice(0, maxLength);
}

function parseRequiredString(value: unknown, fieldName: string, maxLength: number): string {
	if (typeof value !== "string") {
		throw new InputValidationError(`${fieldName} is required`);
	}

	const trimmed = value.trim();
	if (!trimmed) {
		throw new InputValidationError(`${fieldName} is required`);
	}

	return trimmed.slice(0, maxLength);
}

function parseInteger(value: unknown, fieldName: string, min: number): number {
	if (typeof value !== "number" || !Number.isInteger(value) || value < min) {
		throw new InputValidationError(
			`${fieldName} must be an integer greater than or equal to ${min}`,
		);
	}

	return value;
}

function parseBoolean(value: unknown, fieldName: string): boolean {
	if (typeof value !== "boolean") {
		throw new InputValidationError(`${fieldName} must be true or false`);
	}

	return value;
}

function parseRoomType(value: unknown): "private" | "shared" | null {
	if (value == null || value === "") {
		return null;
	}

	if (value === "private" || value === "shared") {
		return value;
	}

	throw new InputValidationError("room_type must be private or shared");
}

function parseIsoDate(value: unknown, fieldName: string): string {
	if (typeof value !== "string") {
		throw new InputValidationError(`${fieldName} is required`);
	}

	const trimmed = value.trim();
	if (!/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
		throw new InputValidationError(`${fieldName} must be in YYYY-MM-DD format`);
	}

	return trimmed;
}

function parseImageUrls(value: unknown): string[] {
	if (!Array.isArray(value)) {
		throw new InputValidationError("imageUrls must be an array");
	}

	if (value.length > MAX_IMAGE_COUNT) {
		throw new InputValidationError(
			`No more than ${MAX_IMAGE_COUNT} images can be uploaded`,
		);
	}

	return value.map((item) => parseRequiredString(item, "image URL", 512));
}

export function parseListingMutationInput(input: unknown): ListingMutationInput {
	if (!input || typeof input !== "object") {
		throw new InputValidationError("Listing data is required");
	}

	const payload = input as Record<string, unknown>;
	const startDate = parseIsoDate(payload.start_date, "start_date");
	const endDate = parseIsoDate(payload.end_date, "end_date");

	if (startDate > endDate) {
		throw new InputValidationError("end_date must be on or after start_date");
	}

	return {
		title: parseRequiredString(payload.title, "title", 255),
		description: normalizeOptionalString(payload.description, 512),
		address: normalizeOptionalString(payload.address, 255),
		rent_cents: parseInteger(payload.rent_cents, "rent_cents", 0),
		start_date: startDate,
		end_date: endDate,
		room_type: parseRoomType(payload.room_type),
		bedrooms_in_unit: parseInteger(payload.bedrooms_in_unit, "bedrooms_in_unit", 1),
		bathrooms_in_unit_x2: parseInteger(
			payload.bathrooms_in_unit_x2,
			"bathrooms_in_unit_x2",
			0,
		),
		private_bathroom: parseBoolean(payload.private_bathroom, "private_bathroom"),
		furnished: parseBoolean(payload.furnished, "furnished"),
	};
}

export function parseListingSubmissionInput(input: unknown): ListingSubmissionInput {
	if (!input || typeof input !== "object") {
		throw new InputValidationError("Listing submission is required");
	}

	const payload = input as Record<string, unknown>;

	return {
		...parseListingMutationInput(payload),
		imageUrls: parseImageUrls(payload.imageUrls ?? []),
	};
}

export function assertValidListingId(listingId: string): void {
	if (!isValidUuid(listingId)) {
		throw new InputValidationError("Invalid listing ID format");
	}
}
