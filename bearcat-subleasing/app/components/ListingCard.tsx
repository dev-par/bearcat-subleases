import { Listing, ListingImage } from "@/types/listing"
import Image from "next/image";

interface ListingCardProps {
    listing: Listing;
}

export default function ListingCard({listing}: ListingCardProps) {

    const imageUrl = listing.listingImages?.[0].url || "/placeholder.jpg";

    return (
        <div>
            <h1>{listing.title}</h1>
            <h2>{listing.description}</h2>
            <p>{listing.rent_cents / 100}</p>
            <Image src={imageUrl} alt="Listing Image" width={400} height={300}/>
        </div>
    )
}