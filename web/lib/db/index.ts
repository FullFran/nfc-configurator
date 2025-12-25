import { drizzle } from "drizzle-orm/vercel-postgres";
import { createPool } from "@vercel/postgres";
import * as schema from "./schema";

// This allows using the POSTGRES_URL from .env even in local scripts/dev
const pool = createPool({
    connectionString: process.env.POSTGRES_URL,
});

export const db = drizzle(pool, { schema });
