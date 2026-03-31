import { Listing } from "@/types/listing";
import Image from "next/image";
import Link from "next/link";

interface ListingCardProps {
	listing: Listing;
}

export default function ListingCard({ listing }: ListingCardProps) {
	const imageUrl = listing.listingImages?.[0]?.url || "/house.jpg";

	return (
		<Link href={`/listings/${listing.id}`}>
			<div className="border rounded shadow hover:shadow-lg cursor-pointer transition p-3">
				<Image
					src={imageUrl}
					alt="Listing Image"
					width={400}
					height={400}
					className="w-full aspect-square object-cover rounded"
				/>
				<h1 className="text-xl font-bold mt-2 mb-1">{listing.title}</h1>
				<h2 className="text-gray-600 mb-2">{listing.description}</h2>
				<p className="text-green-600 mb-2">${listing.rent_cents / 100}</p>
			</div>
		</Link>
	);
}
