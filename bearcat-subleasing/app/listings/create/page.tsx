"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { CreateListingInput } from "@/types/listing";
import Link from "next/link";

export default function CreatePage() {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");
    const [rent, setRent] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [roomType, setRoomType] = useState<"private" | "shared">("private")
    const [bedroomsInUnit, setBedroomsInUnit] = useState(1)
    const [bathroomsInUnit, setBathroomsInUnit] = useState(1)
    const [privateBathroom, setPrivateBathroom] = useState(false)
    const [furnished, setFurnished] = useState(false)
    const [selectedFiles, setSelectedFiles] = useState<File[]>([])
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true)

        try {
            const imageUrls: string[] = []
            for (const file of selectedFiles) {
                const formData = new FormData();
                formData.append('file', file);

                const uploadRes = await fetch('/api/upload/listing_photo', {
                    method: 'POST',
                    body: formData,
                })

                const uploadData = await uploadRes.json()
                if (uploadData.success) {
                    imageUrls.push(uploadData.url)
                }
            }

                const listingData: CreateListingInput = {
                    title,
                    description: description || null,
                    address: address || null,
                    rent_cents: Number(rent) * 100,
                    start_date: startDate,
                    end_date: endDate,
                    room_type: roomType,
                    bedrooms_in_unit: bedroomsInUnit,
                    bathrooms_in_unit_x2: bathroomsInUnit * 2,
                    private_bathroom: privateBathroom,
                    furnished: furnished,
                    user_id: "9ecb2d33-5a85-40dd-8791-073afdc87154",
                }

                
                const res = await fetch('/api/listings', {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...listingData, imageUrls }),
                })

                const data = await res.json();

                if (data.success) {
                    router.push('/')
                }
                else {
                    alert("Failed to create listing")
                }
        }
        catch (error) {
            console.error("Error:", error)
            alert("An error occured")
        }
        finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="max-w-lg mx-auto py-8 px-4">
            <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">
                ← Back to listings
            </Link>
            <h1>Create Listing</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <label className="block">
                    <span className="text-sm font-semibold">Title</span>
                    <input
                        type="text"
                        className="border rounded w-full p-2 mt-1"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </label>

                <label className="block">
                    <span className="text-sm font-semibold">Description</span>
                    <input
                        type="text"
                        className="border rounded w-full p-2 mt-1"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </label>

               {/* Address */}
                <label className="block">
                    <span className="text-sm font-semibold">Address</span>
                    <input
                        type="text"
                        className="border rounded w-full p-2 mt-1"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </label>

                {/* Rent */}
                <label className="block">
                    <span className="text-sm font-semibold">Rent ($/month)</span>
                    <input
                        type="number"
                        className="border rounded w-full p-2 mt-1"
                        value={rent}
                        onChange={(e) => setRent(e.target.value)}
                        min="0"
                        required
                    />
                </label>

                {/* Dates */}
                <div className="flex gap-4">
                    <label className="block flex-1">
                        <span className="text-sm font-semibold">Start Date</span>
                        <input
                            type="date"
                            className="border rounded w-full p-2 mt-1"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            required
                        />
                    </label>

                    <label className="block flex-1">
                        <span className="text-sm font-semibold">End Date</span>
                        <input
                            type="date"
                            className="border rounded w-full p-2 mt-1"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            required
                        />
                    </label>
                </div>

                {/* Room Type */}
                <label className="block">
                    <span className="text-sm font-semibold">Room Type</span>
                    <select
                        className="border rounded w-full p-2 mt-1"
                        value={roomType}
                        onChange={(e) => setRoomType(e.target.value as "private" | "shared")}
                    >
                        <option value="private">Private</option>
                        <option value="shared">Shared</option>
                    </select>
                </label>

                {/* Bedrooms & Bathrooms */}
                <div className="flex gap-4">
                    <label className="block flex-1">
                        <span className="text-sm font-semibold">Bedrooms</span>
                        <input
                            type="number"
                            className="border rounded w-full p-2 mt-1"
                            value={bedroomsInUnit}
                            onChange={(e) => setBedroomsInUnit(Number(e.target.value))}
                            min="1"
                            required
                        />
                    </label>
                     <label className="block flex-1">
                        <span className="text-sm font-semibold">Bathrooms</span>
                        <input
                            type="number"
                            className="border rounded w-full p-2 mt-1"
                            value={bathroomsInUnit}
                            onChange={(e) => setBathroomsInUnit(Number(e.target.value))}
                            min="0"
                            step="0.5"
                            required
                        />
                    </label>
                </div>

                {/* Checkboxes */}
                <div className="flex gap-6">
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={privateBathroom}
                            onChange={(e) => setPrivateBathroom(e.target.checked)}
                        />
                        <span className="text-sm font-semibold">Private Bathroom</span>
                    </label>

                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={furnished}
                            onChange={(e) => setFurnished(e.target.checked)}
                        />
                        <span className="text-sm font-semibold">Furnished</span>
                    </label>
                </div>    

                {/* File Upload */}
                <label className="block">
                    <span className="text-sm font-semibold">Images</span>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="border rounded w-full p-2 mt-1"
                        onChange={(e) => {
                            const files = e.target.files;
                            if (files) {
                                setSelectedFiles(Array.from(files))
                            }
                        }}
                    />
                    {selectedFiles.length > 0 && (
                        <p className="text-sm text-gray-600 mt-1">
                            {selectedFiles.length} file(s) selected
                        </p>
                    )}
                </label>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition w-full disabled:bg-gray-400"
                >
                    {isSubmitting ? 'Creating...' : 'Create Listing'}
                </button>
            </form>
        </div>
    )
}