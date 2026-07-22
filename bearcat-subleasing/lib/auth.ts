import { db } from "@/db/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg", // or "mysql", "sqlite"
    }),
	emailAndPassword: {
		enabled: true,
	},
	trustedOrigins: [
		"https://www.bearcatsubleasing.com",
		"https://bearcatsubleasing.com",
		"https://bearcat-subleasing.vercel.app",
		"https://bearcat-subleases.vercel.app",
		"https://*-dev-pars-projects.vercel.app",
	],
});