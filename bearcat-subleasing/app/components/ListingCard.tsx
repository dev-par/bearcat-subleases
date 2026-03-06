import { Listing, ListingImage } from "@/types/listing"
import Image from "next/image";

interface ListingCardProps {
    listing: Listing;
}

export default function ListingCard({listing}: ListingCardProps) {

    const imageUrl = listing.listingImages?.[0].url || "/placeholder.jpg";

    return (
        <div className="border rounded shadow">
            <Image src={imageUrl} alt="Listing Image" width={400} height={300} className="w-full h-48 object-cover rounded"/>
            <h1 className="text-xl font-bold mt-2 mb-1">{listing.title}</h1>
            <h2 className="text-gray-600 mb-2">{listing.description}</h2>
            <p className="text-green-600 mb-2">${listing.rent_cents / 100}</p>
        </div>
    )
}