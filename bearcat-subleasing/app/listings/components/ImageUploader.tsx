"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface ImageUploaderProps {
	existingUrls: string[];
	onRemoveExisting: (url: string) => void;
	files: File[];
	onFilesChange: (files: File[]) => void;
}

export default function ImageUploader({
	existingUrls,
	onRemoveExisting,
	files,
	onFilesChange,
}: ImageUploaderProps) {
	const [isDragging, setIsDragging] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const dragCounterRef = useRef(0);

	// Derive preview URLs synchronously so they're available on first render.
	// The cleanup effect below revokes them when files change or on unmount.
	const previewUrls = useMemo(
		() => files.map((file) => URL.createObjectURL(file)),
		[files],
	);

	useEffect(() => {
		return () => {
			for (const url of previewUrls) {
				URL.revokeObjectURL(url);
			}
		};
	}, [previewUrls]);

	const addFiles = useCallback(
		(incoming: FileList | File[]) => {
			const imageFiles = Array.from(incoming).filter((f) =>
				f.type.startsWith("image/"),
			);
			if (imageFiles.length > 0) {
				onFilesChange([...files, ...imageFiles]);
			}
		},
		[files, onFilesChange],
	);

	const handleDragEnter = (e: React.DragEvent) => {
		e.preventDefault();
		dragCounterRef.current += 1;
		if (dragCounterRef.current === 1) setIsDragging(true);
	};

	const handleDragLeave = (e: React.DragEvent) => {
		e.preventDefault();
		dragCounterRef.current -= 1;
		if (dragCounterRef.current === 0) setIsDragging(false);
	};

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		dragCounterRef.current = 0;
		setIsDragging(false);
		if (e.dataTransfer.files) {
			addFiles(e.dataTransfer.files);
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			addFiles(e.target.files);
			e.target.value = "";
		}
	};

	const removeNewFile = (index: number) => {
		const updated = files.filter((_, i) => i !== index);
		onFilesChange(updated);
	};

	const totalCount = existingUrls.length + files.length;

	return (
		<div className="space-y-3">
			<button
				type="button"
				onClick={() => inputRef.current?.click()}
				onDragEnter={handleDragEnter}
				onDragLeave={handleDragLeave}
				onDragOver={handleDragOver}
				onDrop={handleDrop}
				className={[
					"flex w-full cursor-pointer flex-col items-center gap-2 rounded-[1.35rem] border-2 border-dashed px-6 py-8 text-center transition-colors",
					isDragging
						? "border-primary/60 bg-primary/5"
						: "border-border/60 bg-muted/20 hover:border-border hover:bg-muted/40",
				].join(" ")}
			>
				<svg
					className={[
						"h-8 w-8 transition-colors",
						isDragging ? "text-primary" : "text-muted-foreground",
					].join(" ")}
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					aria-hidden="true"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={1.5}
						d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 9.75h.008v.008H3V9.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
				<div>
					<p className="text-sm font-medium text-foreground">
						Drop photos here or{" "}
						<span className="text-primary underline-offset-2 hover:underline">
							click to browse
						</span>
					</p>
					<p className="mt-0.5 text-xs text-muted-foreground">
						JPEG, PNG, or WebP · max 5 MB each
					</p>
				</div>
			</button>

			<input
				ref={inputRef}
				type="file"
				accept="image/*"
				multiple
				className="hidden"
				onChange={handleInputChange}
			/>

			{totalCount > 0 && (
				<div className="grid grid-cols-3 gap-2.5">
					{existingUrls.map((url) => (
						<div
							key={url}
							className="group relative overflow-hidden rounded-[1rem] border border-border bg-card"
						>
							<Image
								src={url}
								alt="Listing photo"
								width={240}
								height={180}
								className="aspect-4/3 w-full object-cover"
							/>
							<button
								type="button"
								onClick={() => onRemoveExisting(url)}
								className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity hover:bg-black/80 group-hover:opacity-100"
								aria-label="Remove photo"
							>
								<svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
								</svg>
							</button>
						</div>
					))}

					{previewUrls.map((previewUrl, index) => (
						<div
							key={previewUrl}
							className="group relative overflow-hidden rounded-[1rem] border border-border bg-card"
						>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								src={previewUrl}
								alt="New photo preview"
								className="aspect-4/3 w-full object-cover"
							/>
							<button
								type="button"
								onClick={() => removeNewFile(index)}
								className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity hover:bg-black/80 group-hover:opacity-100"
								aria-label="Remove photo"
							>
								<svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
								</svg>
							</button>
							<div className="absolute bottom-1.5 left-1.5 rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-medium text-white">
								New
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
