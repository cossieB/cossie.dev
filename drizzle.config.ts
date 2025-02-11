import { defineConfig } from "drizzle-kit";

export default defineConfig({
    schema: "./src/schema/*",
    dialect: "postgresql",
    out: "./src/drizzle",
    dbCredentials: {
        url: process.env.POSTGRES_URL!
    }
})