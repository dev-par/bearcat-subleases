import { after } from "next/server";

import { db } from "@/db/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { sendEmail } from "@/lib/email";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg", // or "mysql", "sqlite"
    }),
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: true,
		sendResetPassword: async ({ user, url }) => {
			await sendEmail({
				to: user.email,
				subject: "Reset your password",
				text: `Click the link to reset your password: ${url}`,
			});
		},
		revokeSessionsOnPasswordReset: true,
	},
	emailVerification: {
		sendVerificationEmail: async ({ user, url }) => {
			await sendEmail({
				to: user.email,
				subject: "Verify your email address",
				text: `Click the link to verify your email: ${url}`,
			});
		},
		sendOnSignUp: true,
		autoSignInAfterVerification: true,
		sendOnSignIn: true,
	},
	advanced: {
		backgroundTasks: {
			handler: (promise) => {
				after(promise);
			},
		},
	},
	trustedOrigins: [
		"https://www.bearcatsubleasing.com",
		"https://bearcatsubleasing.com",
		"https://bearcat-subleasing.vercel.app",
		"https://bearcat-subleases.vercel.app",
		"https://*-dev-pars-projects.vercel.app",
	],
});