import { env } from 'cloudflare:workers';
import { drizzle } from 'drizzle-orm/d1';

export const db = drizzle(env.DB)

// import { drizzle } from "drizzle-orm/node-sqlite";
// import { DatabaseSync } from "node:sqlite";
// const client = new DatabaseSync(".wrangler/state/v3/d1/miniflare-D1DatabaseObject/1a66a0f2f665f0214e0c852fcd6c2cdb932cbe765d16b2ece91e6d5b9632c176.sqlite")
// export const db = drizzle({
//     client
// })