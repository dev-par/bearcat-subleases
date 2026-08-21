import { InputValidationError } from "@/lib/errors";
import type { PreferredContactMethod } from "@/types/user";

const US_PHONE_DIGITS = 10;

export function parsePhone(value: unknown): string | null {
    if (value == null || value === "") return null;
    if (typeof value !== "string") {
        throw new InputValidationError("phone must be a string");
    }

    const digits = value.replace(/\D/g, "").replace(/^1(?=\d{10}$)/, "");
    if (digits.length !== US_PHONE_DIGITS) {
        throw new InputValidationError("phone must be a valid 10-digit US phone number");
    }

    return digits;
}

export function parsePreferredContactMethod(value: unknown): PreferredContactMethod {
    if (value === "email" || value === "phone") {
        return value;
    }

    throw new InputValidationError("preferred_contact_method must be email or phone");
}

export interface ContactPreferencesInput {
    phone: string | null;
    preferred_contact_method: PreferredContactMethod;
}

export function parseContactPreferencesInput(input: unknown): ContactPreferencesInput {
    if (!input || typeof input !== "object") {
        throw new InputValidationError("Contact preferences are required");
    }

    const payload = input as Record<string, unknown>;
    const preferredContactMethod = parsePreferredContactMethod(payload.preferred_contact_method);
    const phone = parsePhone(payload.phone);

    if (preferredContactMethod === "phone" && !phone) {
        throw new InputValidationError("phone is required when preferred contact method is phone");
    }

    return { phone, preferred_contact_method: preferredContactMethod };
}
