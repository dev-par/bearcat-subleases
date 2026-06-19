export type DistanceFromCampus = 'under_5' | '5_to_10' | '10_to_20' | '20_to_30' | 'over_30'

export const DISTANCE_LABELS: Record<DistanceFromCampus, string> = {
    under_5:   '< 5 min walk',
    '5_to_10': '5–10 min walk',
    '10_to_20':'10–20 min walk',
    '20_to_30':'20–30 min walk',
    over_30:   '30+ min walk',
}

export const DISTANCE_OPTIONS: { value: DistanceFromCampus; label: string }[] = [
    { value: 'under_5',   label: DISTANCE_LABELS.under_5 },
    { value: '5_to_10',  label: DISTANCE_LABELS['5_to_10'] },
    { value: '10_to_20', label: DISTANCE_LABELS['10_to_20'] },
    { value: '20_to_30', label: DISTANCE_LABELS['20_to_30'] },
    { value: 'over_30',  label: DISTANCE_LABELS.over_30 },
]

export interface ListingImage {
    id: string;
    listing_id: string;
    url: string;
    created_at: Date | null;
}

export interface Listing {
    id: string;
    title: string;
    description: string | null;
    rent_cents: number;
    start_date: string;
    end_date: string;
    room_type: 'private' | 'shared';
    bedrooms_in_unit: number;
    bathrooms_in_unit_x2: number;
    private_bathroom: boolean;
    distance_from_campus: DistanceFromCampus;
    parking_available: boolean | null;
    status: 'active' | 'inactive';
    created_at: Date | null;
    updated_at: Date | null;
    furnished: boolean;
    user_id: string | null;
    listingImages: ListingImage[];
}

export interface CreateListingInput {
    title: string;
    description: string | null;
    rent_cents: number;
    start_date: string;
    end_date: string;
    room_type: 'private' | 'shared';
    bedrooms_in_unit: number;
    bathrooms_in_unit_x2: number;
    private_bathroom: boolean;
    distance_from_campus: DistanceFromCampus;
    parking_available: boolean | null;
    furnished: boolean;
    user_id: string;
}

export interface ListingMutationInput {
    title: string;
    description: string | null;
    rent_cents: number;
    start_date: string;
    end_date: string;
    room_type: 'private' | 'shared';
    bedrooms_in_unit: number;
    bathrooms_in_unit_x2: number;
    private_bathroom: boolean;
    distance_from_campus: DistanceFromCampus;
    parking_available: boolean | null;
    furnished: boolean;
}

export interface ListingSubmissionInput extends ListingMutationInput {
    imageUrls: string[];
}
