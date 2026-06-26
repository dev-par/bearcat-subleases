"use client";

import { useState } from "react";
import { ChevronDown, SlidersHorizontal } from "lucide-react";

import type { DistanceFromCampus, Listing } from "@/types/listing";
import { DISTANCE_OPTIONS } from "@/types/listing";
import ListingCard from "@/app/components/ListingCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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

interface Props {
	listings: Listing[];
}

export default function ListingsBrowser({ listings }: Props) {
	const [isOpen, setIsOpen] = useState(false);
	const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
	const [sort, setSort] = useState<SortKey>("newest");

	const activeFilterCount = countActiveFilters(filters);
	const filtered = applyFilters(listings, filters);
	const sorted = applySort(filtered, sort);

	function resetFilters() {
		setFilters(DEFAULT_FILTERS);
	}

	function toggleDistance(value: DistanceFromCampus) {
		setFilters((prev) => ({
			...prev,
			distance: prev.distance.includes(value)
				? prev.distance.filter((d) => d !== value)
				: [...prev.distance, value],
		}));
	}

	return (
		<div>
			{/* Toolbar */}
			<div className="flex flex-wrap items-center gap-3">
				<button
					type="button"
					onClick={() => setIsOpen((o) => !o)}
					className={cn(
						"inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all",
						isOpen
							? "border-primary/40 bg-primary/8 text-primary dark:bg-primary/12"
							: "border-border/80 bg-card/90 text-foreground shadow-card hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary dark:border-white/8 dark:bg-card/92",
					)}
				>
					<SlidersHorizontal className="h-4 w-4" />
					Filters
					{activeFilterCount > 0 && (
						<Badge className="px-1.5 py-0 text-[10px] leading-4">
							{activeFilterCount}
						</Badge>
					)}
					<ChevronDown
						className={cn(
							"h-4 w-4 transition-transform duration-200",
							isOpen && "rotate-180",
						)}
					/>
				</button>

				<div className="ml-auto flex items-center gap-2">
					<span className="text-sm text-muted-foreground">Sort</span>
					<Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
						<SelectTrigger className="h-9 w-48 rounded-full text-sm">
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

			{/* Expandable filter panel */}
			{isOpen && (
				<div className="mt-3 space-y-5 rounded-[1.75rem] border border-border/70 bg-card/55 p-5 dark:border-white/8 dark:bg-card/35 sm:p-6">

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
									value={filters.minRent}
									onChange={(e) =>
										setFilters((prev) => ({ ...prev, minRent: e.target.value }))
									}
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
									value={filters.maxRent}
									onChange={(e) =>
										setFilters((prev) => ({ ...prev, maxRent: e.target.value }))
									}
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
								<p className="text-xs text-muted-foreground">I'm moving in on</p>
								<Input
									type="date"
									value={filters.dateFrom}
									onChange={(e) =>
										setFilters((prev) => ({ ...prev, dateFrom: e.target.value }))
									}
								/>
							</div>
							<div className="space-y-1">
								<p className="text-xs text-muted-foreground">I'm moving out on</p>
								<Input
									type="date"
									value={filters.dateTo}
									onChange={(e) =>
										setFilters((prev) => ({ ...prev, dateTo: e.target.value }))
									}
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
										setFilters((prev) => ({
											...prev,
											furnished: checked === true,
										}))
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
										setFilters((prev) => ({
											...prev,
											parking: checked === true,
										}))
									}
								/>
								<span className="text-sm font-medium">Parking</span>
							</label>
						</div>
					</div>

					{/* Reset */}
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
			)}

			{/* Result count */}
			<p className="mt-4 text-sm text-muted-foreground">
				{sorted.length} {sorted.length === 1 ? "listing" : "listings"}
				{activeFilterCount > 0 && " matching your filters"}
			</p>

			{/* Grid or empty state */}
			{sorted.length === 0 ? (
				<div className="mt-4 rounded-[1.75rem] border border-dashed border-border bg-muted/35 px-6 py-12 text-center dark:border-white/10 dark:bg-white/3">
					<p className="text-sm font-semibold text-foreground">No listings match your filters.</p>
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
