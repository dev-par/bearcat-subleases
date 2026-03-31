import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";
import { databaseEnv } from "@/lib/env";

const sql = neon(databaseEnv.DATABASE_URL);
export const db = drizzle({ client: sql, schema });
