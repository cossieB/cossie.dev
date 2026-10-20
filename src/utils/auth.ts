import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { anonymous } from "better-auth/plugins";
import { env } from "cloudflare:workers";
import { db } from "~/drizzle/db";
import * as schema from "~/drizzle/schema/index"

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "sqlite",
        usePlural: true,
        schema
    }),
    socialProviders: {
        google: {
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_SECRET
        },
        github: {
            clientId: env.GITHUB_CLIENT_ID,
            clientSecret: env.GITHUB_SECRET
        }
    },
    plugins: [
        anonymous()
    ],
    advanced: {
        ipAddress: {
            ipAddressHeaders: ["CF-Connecting-IP", "X-Real-IP"]
        }
    }
})