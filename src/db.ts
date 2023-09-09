import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from "~/drizzle/schema"

const client = postgres(process.env.POSTGRES_URL!, {
    ssl: true
});
export const db = drizzle(client, {schema});
 
