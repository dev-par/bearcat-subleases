import { defineConfig } from "drizzle-kit";
import { databaseEnv } from "./lib/env";

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: databaseEnv.DATABASE_URL,
  },
});
