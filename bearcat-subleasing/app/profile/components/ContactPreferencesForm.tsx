"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import type { PreferredContactMethod } from "@/types/user";
import { PREFERRED_CONTACT_METHOD_OPTIONS } from "@/types/user";
import { formatPhoneNumber } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/toast";

interface ContactPreferencesFormProps {
	email: string;
	initialPhone: string | null;
	initialPreferredContactMethod: PreferredContactMethod;
}

export default function ContactPreferencesForm({
	email,
	initialPhone,
	initialPreferredContactMethod,
}: ContactPreferencesFormProps) {
	const router = useRouter();
	const [phone, setPhone] = useState(
		initialPhone ? formatPhoneNumber(initialPhone) : "",
	);
	const [preferredContactMethod, setPreferredContactMethod] =
		useState<PreferredContactMethod>(initialPreferredContactMethod);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [fieldError, setFieldError] = useState<string | undefined>();

	const phoneRequired = preferredContactMethod === "phone";

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setFieldError(undefined);

		try {
			const res = await fetch("/api/profile/contact", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					phone: phone || null,
					preferred_contact_method: preferredContactMethod,
				}),
			});
			const data = await res.json();

			if (data.success) {
				toast.message({ title: "Contact preferences saved" });
				setPhone(data.response.phone ? formatPhoneNumber(data.response.phone) : "");
				router.refresh();
			} else {
				setFieldError(data.error);
				toast.error("Could not save contact preferences", data.error);
			}
		} catch (error) {
			toast.error(
				"Could not save contact preferences",
				error instanceof Error ? error.message : "An error occurred",
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div className="grid gap-4 sm:grid-cols-2">
				<Field label="Preferred contact method" htmlFor="preferred-contact-method" required>
					<Select
						value={preferredContactMethod}
						onValueChange={(value) =>
							setPreferredContactMethod(value as PreferredContactMethod)
						}
					>
						<SelectTrigger id="preferred-contact-method">
							<SelectValue placeholder="Choose contact method" />
						</SelectTrigger>
						<SelectContent>
							{PREFERRED_CONTACT_METHOD_OPTIONS.map(({ value, label }) => (
								<SelectItem key={value} value={value}>{label}</SelectItem>
							))}
						</SelectContent>
					</Select>
				</Field>

				{phoneRequired ? (
					<Field
						label="Phone number"
						htmlFor="phone"
						required
						error={fieldError}
					>
						<Input
							id="phone"
							type="tel"
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
							placeholder="(513) 555-0100"
							required
						/>
					</Field>
				) : (
					<Field label="Email" htmlFor="email">
						<Input id="email" type="email" value={email} disabled />
					</Field>
				)}
			</div>

			<Button type="submit" disabled={isSubmitting}>
				{isSubmitting ? "Saving..." : "Save contact preferences"}
			</Button>
		</form>
	);
}
