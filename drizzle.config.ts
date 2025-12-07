import { defineConfig } from "drizzle-kit";

export default defineConfig({
    schema: "./src/drizzle/schema.ts",
    dialect: "postgresql",
    out: "./src/drizzle",
    dbCredentials: {
        url: process.env.POSTGRES_URL!
    }
})