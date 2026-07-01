"use client";

import { useEffect, useState } from "react";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";

import type { DistanceFromCampus, Listing } from "@/types/listing";
import { DISTANCE_OPTIONS } from "@/types/listing";
import ListingCard from "@/app/components/ListingCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type SortKey = "newest" | "price_asc" | "price_desc" | "earliest";

interface Filters {
	minRent: string;
	maxRent: string;
	dateFrom: string;
	dateTo: string;
	roomType: "private" | "shared" | "";
	distance: DistanceFromCampus[];
	furnished: boolean;
	privateBathroom: boolean;
	parking: boolean;
}

const DEFAULT_FILTERS: Filters = {
	minRent: "",
	maxRent: "",
	dateFrom: "",
	dateTo: "",
	roomType: "",
	distance: [],
	furnished: false,
	privateBathroom: false,
	parking: false,
};

type FilterChip = { id: string; label: string; clear: () => void };

function buildChips(
	filters: Filters,
	setFilters: React.Dispatch<React.SetStateAction<Filters>>,
): FilterChip[] {
	const chips: FilterChip[] = [];

	const fmt = (s: string) => `$${Number(s).toLocaleString()}`;
	const fmtDate = (s: string) => {
		const [y, m, d] = s.split("-").map(Number);
		return new Intl.DateTimeFormat("en-US", {
			month: "short",
			day: "numeric",
		}).format(new Date(y, m - 1, d));
	};

	if (filters.minRent && filters.maxRent) {
		chips.push({
			id: "price",
			label: `${fmt(filters.minRent)} – ${fmt(filters.maxRent)}`,
			clear: () => setFilters((p) => ({ ...p, minRent: "", maxRent: "" })),
		});
	} else if (filters.minRent) {
		chips.push({
			id: "price",
			label: `From ${fmt(filters.minRent)}`,
			clear: () => setFilters((p) => ({ ...p, minRent: "" })),
		});
	} else if (filters.maxRent) {
		chips.push({
			id: "price",
			label: `Up to ${fmt(filters.maxRent)}`,
			clear: () => setFilters((p) => ({ ...p, maxRent: "" })),
		});
	}

	if (filters.dateFrom && filters.dateTo) {
		chips.push({
			id: "dates",
			label: `${fmtDate(filters.dateFrom)} – ${fmtDate(filters.dateTo)}`,
			clear: () => setFilters((p) => ({ ...p, dateFrom: "", dateTo: "" })),
		});
	} else if (filters.dateFrom) {
		chips.push({
			id: "dates",
			label: `From ${fmtDate(filters.dateFrom)}`,
			clear: () => setFilters((p) => ({ ...p, dateFrom: "" })),
		});
	} else if (filters.dateTo) {
		chips.push({
			id: "dates",
			label: `Until ${fmtDate(filters.dateTo)}`,
			clear: () => setFilters((p) => ({ ...p, dateTo: "" })),
		});
	}

	if (filters.roomType) {
		chips.push({
			id: "roomType",
			label: filters.roomType === "private" ? "Private room" : "Shared room",
			clear: () => setFilters((p) => ({ ...p, roomType: "" })),
		});
	}

	for (const d of filters.distance) {
		const option = DISTANCE_OPTIONS.find((o) => o.value === d);
		if (option) {
			chips.push({
				id: `distance-${d}`,
				label: option.label,
				clear: () =>
					setFilters((p) => ({
						...p,
						distance: p.distance.filter((x) => x !== d),
					})),
			});
		}
	}

	if (filters.furnished) {
		chips.push({
			id: "furnished",
			label: "Furnished",
			clear: () => setFilters((p) => ({ ...p, furnished: false })),
		});
	}
	if (filters.privateBathroom) {
		chips.push({
			id: "privateBathroom",
			label: "Private bathroom",
			clear: () => setFilters((p) => ({ ...p, privateBathroom: false })),
		});
	}
	if (filters.parking) {
		chips.push({
			id: "parking",
			label: "Parking",
			clear: () => setFilters((p) => ({ ...p, parking: false })),
		});
	}

	return chips;
}

function countActiveFilters(f: Filters): number {
	let count = 0;
	if (f.minRent !== "") count++;
	if (f.maxRent !== "") count++;
	if (f.dateFrom !== "") count++;
	if (f.dateTo !== "") count++;
	if (f.roomType !== "") count++;
	if (f.distance.length > 0) count++;
	if (f.furnished) count++;
	if (f.privateBathroom) count++;
	if (f.parking) count++;
	return count;
}

function applyFilters(listings: Listing[], f: Filters): Listing[] {
	return listings.filter((l) => {
		if (f.minRent !== "" && l.rent_cents < Number(f.minRent) * 100) return false;
		if (f.maxRent !== "" && l.rent_cents > Number(f.maxRent) * 100) return false;
		if (f.dateFrom !== "" && l.start_date > f.dateFrom) return false;
		if (f.dateTo !== "" && l.end_date < f.dateTo) return false;
		if (f.roomType !== "" && l.room_type !== f.roomType) return false;
		if (f.distance.length > 0 && !f.distance.includes(l.distance_from_campus)) return false;
		if (f.furnished && !l.furnished) return false;
		if (f.privateBathroom && !l.private_bathroom) return false;
		if (f.parking && l.parking_available !== true) return false;
		return true;
	});
}

function applySort(listings: Listing[], sort: SortKey): Listing[] {
	const sorted = [...listings];
	switch (sort) {
		case "price_asc":
			return sorted.sort((a, b) => a.rent_cents - b.rent_cents);
		case "price_desc":
			return sorted.sort((a, b) => b.rent_cents - a.rent_cents);
		case "earliest":
			return sorted.sort((a, b) => a.start_date.localeCompare(b.start_date));
		case "newest":
		default:
			return sorted.sort(
				(a, b) =>
					(b.created_at?.getTime() ?? 0) - (a.created_at?.getTime() ?? 0),
			);
	}
}

function SectionHeader({ children }: { children: React.ReactNode }) {
	return (
		<p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
			{children}
		</p>
	);
}

function FilterDivider() {
	return <div className="border-t border-border/50" />;
}

interface FilterControlsProps {
	id: string;
	filters: Filters;
	setFilters: React.Dispatch<React.SetStateAction<Filters>>;
	draftMin: string;
	draftMax: string;
	setDraftMin: (v: string) => void;
	setDraftMax: (v: string) => void;
	toggleDistance: (value: DistanceFromCampus) => void;
	activeFilterCount: number;
	resetFilters: () => void;
}

function FilterControls({
	id,
	filters,
	setFilters,
	draftMin,
	draftMax,
	setDraftMin,
	setDraftMax,
	toggleDistance,
	activeFilterCount,
	resetFilters,
}: FilterControlsProps) {
	return (
		<div className="space-y-5">
			{/* Price */}
			<div className="space-y-3">
				<SectionHeader>Price / month</SectionHeader>
				<div className="grid grid-cols-2 gap-3">
					<div className="relative">
						<span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-muted-foreground">
							$
						</span>
						<Input
							type="number"
							name="min-rent"
							autoComplete="off"
							value={draftMin}
							onChange={(e) => setDraftMin(e.target.value)}
							placeholder="No min"
							min="0"
							className="pl-7"
						/>
					</div>
					<div className="relative">
						<span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-muted-foreground">
							$
						</span>
						<Input
							type="number"
							name="max-rent"
							autoComplete="off"
							value={draftMax}
							onChange={(e) => setDraftMax(e.target.value)}
							placeholder="No max"
							min="0"
							className="pl-7"
						/>
					</div>
				</div>
			</div>

			<FilterDivider />

			{/* Availability */}
			<div className="space-y-3">
				<SectionHeader>Availability</SectionHeader>
				<div className="grid grid-cols-2 gap-3">
					<div className="space-y-1">
						<label
							htmlFor={`${id}-date-from`}
							className="text-xs text-muted-foreground"
						>
							I&apos;m moving in on
						</label>
						<Input
							id={`${id}-date-from`}
							type="date"
							name="date-from"
							autoComplete="off"
							value={filters.dateFrom}
							max={filters.dateTo || undefined}
							onChange={(e) => {
								const newFrom = e.target.value;
								setFilters((prev) => ({
									...prev,
									dateFrom: newFrom,
									dateTo:
										prev.dateTo && newFrom > prev.dateTo ? "" : prev.dateTo,
								}));
							}}
						/>
					</div>
					<div className="space-y-1">
						<label
							htmlFor={`${id}-date-to`}
							className="text-xs text-muted-foreground"
						>
							I&apos;m moving out on
						</label>
						<Input
							id={`${id}-date-to`}
							type="date"
							name="date-to"
							autoComplete="off"
							value={filters.dateTo}
							min={filters.dateFrom || undefined}
							onChange={(e) => {
								const newTo = e.target.value;
								setFilters((prev) => ({
									...prev,
									dateTo: newTo,
									dateFrom:
										prev.dateFrom && newTo < prev.dateFrom
											? ""
											: prev.dateFrom,
								}));
							}}
						/>
					</div>
				</div>
			</div>

			<FilterDivider />

			{/* Room type */}
			<div className="space-y-3">
				<SectionHeader>Room type</SectionHeader>
				<div className="flex gap-2">
					{(["", "private", "shared"] as const).map((value) => {
						const label =
							value === "" ? "Any" : value === "private" ? "Private" : "Shared";
						const isActive = filters.roomType === value;
						return (
							<button
								key={value}
								type="button"
								onClick={() =>
									setFilters((prev) => ({ ...prev, roomType: value }))
								}
								className={cn(
									"rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
									isActive
										? "border-primary bg-primary text-primary-foreground"
										: "border-border/80 bg-muted/40 text-foreground hover:border-primary/30 hover:text-primary dark:border-white/8 dark:bg-white/4",
								)}
							>
								{label}
							</button>
						);
					})}
				</div>
			</div>

			<FilterDivider />

			{/* Distance from campus */}
			<div className="space-y-3">
				<SectionHeader>Distance from campus</SectionHeader>
				<div className="grid gap-2 sm:grid-cols-2">
					{DISTANCE_OPTIONS.map(({ value, label }) => (
						<label
							key={value}
							className="flex cursor-pointer items-center gap-3 rounded-[1.35rem] border border-border/70 bg-muted/35 px-4 py-3 text-foreground transition-colors hover:bg-muted/50 dark:border-white/8 dark:bg-white/3"
						>
							<Checkbox
								checked={filters.distance.includes(value)}
								onCheckedChange={() => toggleDistance(value)}
							/>
							<span className="text-sm font-medium">{label}</span>
						</label>
					))}
				</div>
			</div>

			<FilterDivider />

			{/* Amenities */}
			<div className="space-y-3">
				<SectionHeader>Amenities</SectionHeader>
				<div className="grid gap-2 sm:grid-cols-3">
					<label className="flex cursor-pointer items-center gap-3 rounded-[1.35rem] border border-border/70 bg-muted/35 px-4 py-3 text-foreground transition-colors hover:bg-muted/50 dark:border-white/8 dark:bg-white/3">
						<Checkbox
							checked={filters.furnished}
							onCheckedChange={(checked) =>
								setFilters((prev) => ({ ...prev, furnished: checked === true }))
							}
						/>
						<span className="text-sm font-medium">Furnished</span>
					</label>
					<label className="flex cursor-pointer items-center gap-3 rounded-[1.35rem] border border-border/70 bg-muted/35 px-4 py-3 text-foreground transition-colors hover:bg-muted/50 dark:border-white/8 dark:bg-white/3">
						<Checkbox
							checked={filters.privateBathroom}
							onCheckedChange={(checked) =>
								setFilters((prev) => ({
									...prev,
									privateBathroom: checked === true,
								}))
							}
						/>
						<span className="text-sm font-medium">Private bathroom</span>
					</label>
					<label className="flex cursor-pointer items-center gap-3 rounded-[1.35rem] border border-border/70 bg-muted/35 px-4 py-3 text-foreground transition-colors hover:bg-muted/50 dark:border-white/8 dark:bg-white/3">
						<Checkbox
							checked={filters.parking}
							onCheckedChange={(checked) =>
								setFilters((prev) => ({ ...prev, parking: checked === true }))
							}
						/>
						<span className="text-sm font-medium">Parking</span>
					</label>
				</div>
			</div>

			{activeFilterCount > 0 && (
				<>
					<FilterDivider />
					<div className="flex justify-end">
						<Button
							type="button"
							variant="ghost"
							size="sm"
							onClick={resetFilters}
						>
							Reset filters
						</Button>
					</div>
				</>
			)}
		</div>
	);
}

interface Props {
	listings: Listing[];
}

export default function ListingsBrowser({ listings }: Props) {
	const [isOpen, setIsOpen] = useState(false);
	const [mobileSheetOpen, setMobileSheetOpen] = useState(false);
	const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
	const [sort, setSort] = useState<SortKey>("newest");

	// Draft price state — committed to filters after 250ms debounce
	const [draftMin, setDraftMin] = useState("");
	const [draftMax, setDraftMax] = useState("");

	useEffect(() => {
		const t = setTimeout(() => {
			setFilters((prev) => ({ ...prev, minRent: draftMin, maxRent: draftMax }));
		}, 250);
		return () => clearTimeout(t);
	}, [draftMin, draftMax]);

	const activeFilterCount = countActiveFilters(filters);
	const chips = buildChips(filters, setFilters);
	const filtered = applyFilters(listings, filters);
	const sorted = applySort(filtered, sort);

	function resetFilters() {
		setFilters(DEFAULT_FILTERS);
		setDraftMin("");
		setDraftMax("");
	}

	function toggleDistance(value: DistanceFromCampus) {
		setFilters((prev) => ({
			...prev,
			distance: prev.distance.includes(value)
				? prev.distance.filter((d) => d !== value)
				: [...prev.distance, value],
		}));
	}

	const sharedFilterProps: Omit<FilterControlsProps, "id"> = {
		filters,
		setFilters,
		draftMin,
		draftMax,
		setDraftMin,
		setDraftMax,
		toggleDistance,
		activeFilterCount,
		resetFilters,
	};

	return (
		<div>
			{/* Toolbar */}
			<div className="flex flex-wrap items-center gap-3">

				{/* Mobile: Filters button → bottom sheet Dialog */}
				<Dialog open={mobileSheetOpen} onOpenChange={setMobileSheetOpen}>
					<DialogTrigger asChild>
						<button
							type="button"
							className={cn(
								"inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all md:hidden",
								mobileSheetOpen
									? "border-primary/40 bg-primary/8 text-primary dark:bg-primary/12"
									: "border-border/80 bg-card/90 text-foreground shadow-card hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary dark:border-white/8 dark:bg-card/92",
							)}
						>
							<SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
							Filters
							{activeFilterCount > 0 && (
								<Badge className="px-1.5 py-0 text-[10px] leading-4">
									{activeFilterCount}
								</Badge>
							)}
						</button>
					</DialogTrigger>
					<DialogContent
						className="inset-x-0 bottom-0 top-auto left-0 w-full max-h-[85dvh] translate-x-0 translate-y-0 flex flex-col gap-0 overflow-hidden rounded-t-[1.75rem] rounded-b-none p-0 sm:max-w-none sm:p-0 data-[state=open]:slide-in-from-bottom-8 data-[state=closed]:slide-out-to-bottom-8"
						showClose={false}
						aria-describedby={undefined}
					>
						<DialogHeader className="flex-none border-b border-border/50 px-5 py-4">
							<div className="flex items-center justify-between">
								<DialogTitle>Filters</DialogTitle>
								<DialogClose asChild>
									<button
										type="button"
										className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
										aria-label="Close filters"
									>
										<X className="h-4 w-4" />
									</button>
								</DialogClose>
							</div>
						</DialogHeader>
						<div className="flex-1 overflow-y-auto overscroll-contain px-5 py-5">
							<FilterControls id="mobile" {...sharedFilterProps} />
						</div>
						<DialogFooter className="flex-none border-t border-border/50 px-5 py-4">
							<DialogClose asChild>
								<Button className="w-full">Done</Button>
							</DialogClose>
						</DialogFooter>
					</DialogContent>
				</Dialog>

				{/* Desktop: Filters button toggles inline panel */}
				<button
					type="button"
					onClick={() => setIsOpen((o) => !o)}
					className={cn(
						"hidden items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all md:inline-flex",
						isOpen
							? "border-primary/40 bg-primary/8 text-primary dark:bg-primary/12"
							: "border-border/80 bg-card/90 text-foreground shadow-card hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary dark:border-white/8 dark:bg-card/92",
					)}
				>
					<SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
					Filters
					{activeFilterCount > 0 && (
						<Badge className="px-1.5 py-0 text-[10px] leading-4">
							{activeFilterCount}
						</Badge>
					)}
					<ChevronDown
						aria-hidden="true"
						className={cn(
							"h-4 w-4 transition-transform duration-200",
							isOpen && "rotate-180",
						)}
					/>
				</button>

				<div className="ml-auto flex items-center gap-2">
					<span className="hidden text-sm text-muted-foreground sm:inline">Sort</span>
					<Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
						<SelectTrigger className="h-9 w-36 rounded-full text-sm sm:w-48">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="newest">Newest</SelectItem>
							<SelectItem value="price_asc">Price: Low → High</SelectItem>
							<SelectItem value="price_desc">Price: High → Low</SelectItem>
							<SelectItem value="earliest">Earliest availability</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>

			{/* Active filter chips */}
			{chips.length > 0 && (
				<div className="mt-3 flex flex-wrap items-center gap-2">
					{chips.map((chip) => (
						<button
							key={chip.id}
							type="button"
							onClick={chip.clear}
							className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/8 px-3 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/15 dark:bg-primary/12 dark:hover:bg-primary/20"
						>
							{chip.label}
							<X className="h-3 w-3" aria-hidden="true" />
						</button>
					))}
					<button
						type="button"
						onClick={resetFilters}
						className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
					>
						Clear all
					</button>
				</div>
			)}

			{/* Desktop: expandable inline filter panel */}
			<div className="hidden md:block">
				<div
					className={cn(
						"grid transition-[grid-template-rows]",
						isOpen
							? "duration-300 grid-rows-[1fr]"
							: "duration-200 grid-rows-[0fr]",
					)}
				>
					<div className="min-h-0 overflow-hidden">
						<div className="mt-3 space-y-5 rounded-[1.75rem] border border-border/70 bg-card/55 p-5 dark:border-white/8 dark:bg-card/35 sm:p-6">
							<FilterControls id="desktop" {...sharedFilterProps} />
						</div>
					</div>
				</div>
			</div>

			{/* Result count */}
			<p className="mt-4 text-sm text-muted-foreground">
				{sorted.length} {sorted.length === 1 ? "listing" : "listings"}
				{activeFilterCount > 0 && " matching your filters"}
			</p>

			{/* Grid or empty state */}
			{sorted.length === 0 ? (
				<div className="mt-4 rounded-[1.75rem] border border-dashed border-border bg-muted/35 px-6 py-12 text-center dark:border-white/10 dark:bg-white/3">
					<p className="text-sm font-semibold text-foreground">
						No listings match your filters.
					</p>
					<p className="mt-1 text-sm text-muted-foreground">
						Try adjusting your criteria or{" "}
						<button
							type="button"
							onClick={resetFilters}
							className="font-medium text-primary underline-offset-2 hover:underline"
						>
							reset all filters
						</button>
						.
					</p>
				</div>
			) : (
				<div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
					{sorted.map((listing) => (
						<ListingCard key={listing.id} listing={listing} />
					))}
				</div>
			)}
		</div>
	);
}
