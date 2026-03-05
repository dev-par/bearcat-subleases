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
    address: string | null;
    rent_cents: number;
    start_date: string;
    end_date: string;
    room_type: 'private' | 'shared' | null;
    bedrooms_in_unit: number;
    bathrooms_in_unit_x2: number;
    private_bathroom: boolean;
    status: 'active' | 'inactive';
    created_at: Date | null;
    updated_at: Date | null;
    furnished: boolean;
    user_id: string | null;
    listingImages: ListingImage[];
}