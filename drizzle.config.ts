import {defineConfig} from "drizzle-kit"

export default defineConfig({
    dialect: "sqlite",
    schema: "src/drizzle/schema/index.ts",
    dbCredentials: {
        url: ".wrangler/state/v3/d1/miniflare-D1DatabaseObject/1a66a0f2f665f0214e0c852fcd6c2cdb932cbe765d16b2ece91e6d5b9632c176.sqlite"
    }
})