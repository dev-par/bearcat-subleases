"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { updateUser } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";

const MAX_NAME_LENGTH = 80;

interface DisplayNameFormProps {
	initialName: string;
}

export default function DisplayNameForm({ initialName }: DisplayNameFormProps) {
	const router = useRouter();
	const [name, setName] = useState(initialName);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [fieldError, setFieldError] = useState<string | undefined>();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setFieldError(undefined);

		const trimmedName = name.trim();
		if (!trimmedName) {
			setFieldError("Name is required");
			return;
		}
		if (trimmedName.length > MAX_NAME_LENGTH) {
			setFieldError(`Name must be ${MAX_NAME_LENGTH} characters or fewer`);
			return;
		}

		setIsSubmitting(true);
		try {
			const { error } = await updateUser({ name: trimmedName });

			if (error) {
				setFieldError(error.message);
				toast.error("Could not update name", error.message);
			} else {
				setName(trimmedName);
				toast.message({ title: "Name updated" });
				router.refresh();
			}
		} catch (error) {
			toast.error(
				"Could not update name",
				error instanceof Error ? error.message : "An error occurred",
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div className="grid gap-4 sm:max-w-sm">
				<Field label="Display name" htmlFor="display-name" required error={fieldError}>
					<Input
						id="display-name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						maxLength={MAX_NAME_LENGTH}
						required
					/>
				</Field>
			</div>

			<Button type="submit" disabled={isSubmitting}>
				{isSubmitting ? "Saving..." : "Save name"}
			</Button>
		</form>
	);
}
