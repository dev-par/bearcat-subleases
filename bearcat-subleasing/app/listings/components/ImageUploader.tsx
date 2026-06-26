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

	const previewUrl = useMemo(
		() => (files[0] ? URL.createObjectURL(files[0]) : null),
		[files],
	);

	useEffect(() => {
		return () => {
			if (previewUrl) URL.revokeObjectURL(previewUrl);
		};
	}, [previewUrl]);

	const setFile = useCallback(
		(incoming: FileList | File[]) => {
			const first = Array.from(incoming).find((f) => f.type.startsWith("image/"));
			if (first) onFilesChange([first]);
		},
		[onFilesChange],
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
		if (e.dataTransfer.files) setFile(e.dataTransfer.files);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setFile(e.target.files);
			e.target.value = "";
		}
	};

	const existingUrl = existingUrls[0] ?? null;
	const hasImage = existingUrl !== null || previewUrl !== null;

	return (
		<div className="space-y-3">
			{!hasImage && (
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
							Drop a photo here or{" "}
							<span className="text-primary underline-offset-2 hover:underline">
								click to browse
							</span>
						</p>
						<p className="mt-0.5 text-xs text-muted-foreground">
							JPEG, PNG, or WebP · max 5 MB
						</p>
					</div>
				</button>
			)}

			<input
				ref={inputRef}
				type="file"
				accept="image/*"
				className="hidden"
				onChange={handleInputChange}
			/>

			{existingUrl && (
				<div className="group relative overflow-hidden rounded-[1.35rem] border border-border bg-card">
					<Image
						src={existingUrl}
						alt="Listing photo"
						width={800}
						height={800}
						className="aspect-square w-full object-cover"
					/>
					<div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-linear-to-t from-black/60 to-transparent px-4 pb-3 pt-8 opacity-0 transition-opacity group-hover:opacity-100">
						<button
							type="button"
							onClick={() => inputRef.current?.click()}
							className="rounded-full bg-white/20 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm hover:bg-white/30"
						>
							Replace
						</button>
						<button
							type="button"
							onClick={() => onRemoveExisting(existingUrl)}
							className="rounded-full bg-white/20 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm hover:bg-white/30"
							aria-label="Remove photo"
						>
							Remove
						</button>
					</div>
				</div>
			)}

			{previewUrl && (
				<div className="group relative overflow-hidden rounded-[1.35rem] border border-border bg-card">
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img
						src={previewUrl}
						alt="Photo preview"
						className="aspect-square w-full object-cover"
					/>
					<div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-linear-to-t from-black/60 to-transparent px-4 pb-3 pt-8 opacity-0 transition-opacity group-hover:opacity-100">
						<button
							type="button"
							onClick={() => inputRef.current?.click()}
							className="rounded-full bg-white/20 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm hover:bg-white/30"
						>
							Replace
						</button>
						<button
							type="button"
							onClick={() => onFilesChange([])}
							className="rounded-full bg-white/20 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm hover:bg-white/30"
						>
							Remove
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
