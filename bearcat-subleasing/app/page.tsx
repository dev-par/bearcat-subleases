import { getListings } from "@/queries/get";
import ListingCard from "./components/ListingCard";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ListingsPage() {
	const listings = await getListings();

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="flex items-center justify-between mb-8">
				<h1 className="text-3xl font-bold md-8">Available Subleases</h1>
				<Link href="/listings/create">
					<button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
						Create new listing
					</button>
				</Link>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{listings.map((listing) => (
					<ListingCard key={listing.id} listing={listing} />
				))}
			</div>
		</div>
	);
}
