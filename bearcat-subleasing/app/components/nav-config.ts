export interface NavItem {
  href: string;
  label: string;
  match: "exact" | "prefix";
}

export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Home", match: "exact" },
  { href: "/listings", label: "Listings", match: "prefix" },
  { href: "/about", label: "About", match: "exact" },
];

export const PRIMARY_CTA = {
  href: "/listings/create",
  label: "Post a listing",
} as const;
