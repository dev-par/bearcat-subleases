export function formatPhoneNumber(digits: string): string {
    const cleaned = digits.replace(/\D/g, "");
    if (cleaned.length !== 10) return digits;
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
}
