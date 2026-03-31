import { InputValidationError } from "@/lib/errors";

const ALLOWED_IMAGE_TYPES = [
	"image/jpeg",
	"image/jpg",
	"image/png",
	"image/webp",
];

const MAX_UPLOAD_SIZE_BYTES = 5 * 1024 * 1024;

export function validateImageFile(file: File): void {
	if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
		throw new InputValidationError("Incorrect file type");
	}

	if (file.size > MAX_UPLOAD_SIZE_BYTES) {
		throw new InputValidationError("File too large");
	}
}
