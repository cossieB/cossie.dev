import { sql } from '@vercel/postgres';
import postgres from 'postgres';
import * as schema from "~/drizzle/schema"
import { drizzle } from 'drizzle-orm/vercel-postgres';

const client = postgres(process.env.POSTGRES_URL!);
export const db = drizzle(sql, {schema});
 
