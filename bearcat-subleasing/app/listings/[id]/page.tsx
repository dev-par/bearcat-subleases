import { getListingById } from "@/queries/get";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import DeleteButton from "@/app/components/DeleteButton";

function isValidUUID(id: string): boolean {
	const uuidRegex =
		/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
	return uuidRegex.test(id);
}

export default async function Page({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	if (!isValidUUID(id)) {
		notFound();
	}

	const listing = await getListingById(id);

	if (!listing) {
		notFound();
	}

	const imageUrl = listing.listingImages?.[0]?.url || "/house.jpg";

	return (
		<div className="container mx-auto px-4 py-8 max-w-6xl">
			{/* Back Button */}
			<Link
				href="/"
				className="text-blue-600 hover:underline mb-6 inline-block"
			>
				← Back to listings
			</Link>

			{/* Main Content - Image Left, All Details Right */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
				{/* Left - Image */}
				<div>
					<Image
						src={imageUrl}
						alt={listing.title}
						width={600}
						height={600}
						className="w-full aspect-square object-cover rounded-lg"
					/>
				</div>

				{/* Right - All Details */}
				<div>
					<h1 className="text-4xl font-bold mb-2">{listing.title}</h1>
					<p className="text-3xl text-green-600 font-semibold mb-4">
						${listing.rent_cents / 100}/month
					</p>

					{/* Details Grid */}
					<div className="grid grid-cols-2 gap-4 mb-6">
						<div className="bg-gray-50 p-4 rounded">
							<p className="text-gray-600 text-sm">Bedrooms</p>
							<p className="font-semibold">{listing.bedrooms_in_unit}</p>
						</div>
						<div className="bg-gray-50 p-4 rounded">
							<p className="text-gray-600 text-sm">Bathrooms</p>
							<p className="font-semibold">
								{listing.bathrooms_in_unit_x2 / 2}
							</p>
						</div>
						<div className="bg-gray-50 p-4 rounded">
							<p className="text-gray-600 text-sm">Room Type</p>
							<p className="font-semibold capitalize">
								{listing.room_type || "N/A"}
							</p>
						</div>
						<div className="bg-gray-50 p-4 rounded">
							<p className="text-gray-600 text-sm">Furnished</p>
							<p className="font-semibold">
								{listing.furnished ? "Yes" : "No"}
							</p>
						</div>
					</div>

					{/* Availability */}
					<div className="mb-6">
						<h2 className="text-xl font-bold mb-2">Availability</h2>
						<p className="text-gray-700">
							{new Date(listing.start_date).toLocaleDateString()} -{" "}
							{new Date(listing.end_date).toLocaleDateString()}
						</p>
					</div>

					{/* Amenities */}
					<div className="mb-6">
						<h2 className="text-xl font-bold mb-2">Amenities</h2>
						<div className="flex flex-wrap gap-2">
							{listing.private_bathroom && (
								<span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
									Private Bathroom
								</span>
							)}
							{listing.furnished && (
								<span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
									Furnished
								</span>
							)}
						</div>
					</div>

					{/* Description */}
					<div className="mb-6">
						<h2 className="text-xl font-bold mb-2">Description</h2>
						<p className="text-gray-700">
							{listing.description || "No description provided"}
						</p>
					</div>

					{/* Location */}
					{listing.address && (
						<div className="mb-6">
							<h2 className="text-xl font-bold mb-2">Location</h2>
							<p className="text-gray-700">{listing.address}</p>
						</div>
					)}

					{/* Contact Button */}
					<button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold">
						Contact Landlord
					</button>

					<DeleteButton listingId={listing.id} />
				</div>
			</div>
		</div>
	);
}
