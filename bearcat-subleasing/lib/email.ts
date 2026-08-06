import { Resend } from "resend";

import { emailEnv } from "@/lib/env";

const FROM_ADDRESS = "Bearcat Subleasing <support@bearcatsubleasing.com>";

const resend = new Resend(emailEnv.RESEND_API_KEY);

interface SendEmailParams {
	to: string;
	subject: string;
	text: string;
}

export async function sendEmail({ to, subject, text }: SendEmailParams): Promise<void> {
	const { error } = await resend.emails.send({
		from: FROM_ADDRESS,
		to,
		subject,
		text,
	});

	if (error) {
		throw new Error(`Failed to send email to ${to}: ${error.message}`);
	}
}
