import type { DistanceFromCampus, GenderPreference, ListingMutationInput } from "@/types/listing";
import { InputValidationError } from "@/lib/errors";

const DISTANCE_VALUES: DistanceFromCampus[] = ['under_5', '5_to_10', '10_to_20', '20_to_30', 'over_30'];
const GENDER_PREFERENCE_VALUES: GenderPreference[] = ['any', 'female', 'male'];

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

function parseRoomType(value: unknown): "private" | "shared" {
	if (value === "private" || value === "shared") {
		return value;
	}

	throw new InputValidationError("room_type must be private or shared");
}

function parseDistanceFromCampus(value: unknown): DistanceFromCampus {
	if (typeof value === "string" && (DISTANCE_VALUES as string[]).includes(value)) {
		return value as DistanceFromCampus;
	}

	throw new InputValidationError(
		`distance_from_campus must be one of: ${DISTANCE_VALUES.join(", ")}`,
	);
}

function parseGenderPreference(value: unknown): GenderPreference {
	if (typeof value === "string" && (GENDER_PREFERENCE_VALUES as string[]).includes(value)) {
		return value as GenderPreference;
	}

	throw new InputValidationError(
		`gender_preference must be one of: ${GENDER_PREFERENCE_VALUES.join(", ")}`,
	);
}

function parseOptionalBoolean(value: unknown): boolean | null {
	if (value == null) return null;
	if (typeof value === "boolean") return value;
	throw new InputValidationError("parking_available must be true, false, or null");
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

function parseNullableString(value: unknown, fieldName: string, maxLength: number): string | null {
	if (value === null || value === undefined || value === "") {
		return null;
	}

	if (typeof value !== "string") {
		throw new InputValidationError(`${fieldName} must be a string`);
	}

	if (value.length > maxLength) {
		throw new InputValidationError(`${fieldName} must be ${maxLength} characters or fewer`);
	}

	return value;
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
		rent_cents: parseInteger(payload.rent_cents, "rent_cents", 0),
		start_date: startDate,
		end_date: endDate,
		room_type: parseRoomType(payload.room_type),
		bedrooms_in_unit: parseInteger(payload.bedrooms_in_unit, "bedrooms_in_unit", 1),
		bathrooms_in_unit_x2: parseInteger(
			payload.bathrooms_in_unit_x2,
			"bathrooms_in_unit_x2",
			1,
		),
		private_bathroom: parseBoolean(payload.private_bathroom, "private_bathroom"),
		distance_from_campus: parseDistanceFromCampus(payload.distance_from_campus),
		gender_preference: parseGenderPreference(payload.gender_preference),
		parking_available: parseOptionalBoolean(payload.parking_available),
		furnished: parseBoolean(payload.furnished, "furnished"),
		image_url: parseNullableString(payload.image_url, "image URL", 512),
		image_key: parseNullableString(payload.image_key, "image key", 512),
	};
}

export function assertValidListingId(listingId: string): void {
	if (!isValidUuid(listingId)) {
		throw new InputValidationError("Invalid listing ID format");
	}
}
