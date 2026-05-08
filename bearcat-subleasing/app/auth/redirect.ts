export function getSafeRedirectPath(value: string | string[] | undefined) {
	const redirectTo = Array.isArray(value) ? value[0] : value;

	if (!redirectTo || !redirectTo.startsWith("/") || redirectTo.startsWith("//")) {
		return "/listings";
	}

	return redirectTo;
}
