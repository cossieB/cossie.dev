import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from "~/drizzle/schema"

const client = postgres(process.env.POSTGRES_URL!, {
    ssl: process.env.NODE_ENV === 'production'
});
export const db = drizzle(client, {schema});
 
