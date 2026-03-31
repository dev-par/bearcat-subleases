import { config } from "dotenv";

config({ path: ".env" });

const DEFAULT_DEV_SEEDED_USER_ID = "9ecb2d33-5a85-40dd-8791-073afdc87154";

function requireEnv(name: string): string {
	const value = process.env[name];

	if (!value) {
		throw new Error(`Missing required environment variable: ${name}`);
	}

	return value;
}

function parseOptionalCsv(value: string | undefined): string[] {
	if (!value) {
		return [];
	}

	return value
		.split(",")
		.map((item) => item.trim())
		.filter(Boolean);
}

export const databaseEnv = {
	DATABASE_URL: requireEnv("DATABASE_URL"),
} as const;

export const awsEnv = {
	AWS_REGION: requireEnv("AWS_REGION"),
	AWS_ACCESS_KEY_ID: requireEnv("AWS_ACCESS_KEY_ID"),
	AWS_SECRET_ACCESS_KEY: requireEnv("AWS_SECRET_ACCESS_KEY"),
	AWS_S3_BUCKET: requireEnv("AWS_S3_BUCKET"),
} as const;

export const devEnv = {
	DEV_SEEDED_USER_ID:
		process.env.DEV_SEEDED_USER_ID ?? DEFAULT_DEV_SEEDED_USER_ID,
	DEV_ADMIN_USER_IDS: parseOptionalCsv(process.env.DEV_ADMIN_USER_IDS),
} as const;
