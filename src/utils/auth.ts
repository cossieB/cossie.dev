import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { anonymous } from "better-auth/plugins";
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
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_SECRET
        },
        github: {
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_SECRET
        }
    },
    plugins: [
        anonymous()
    ],
    advanced: {
        ipAddress: {
            ipAddressHeaders: ["CF-Connecting-IP", "X-Real-IP"]
        }
    },
    session: {
        cookieCache: {
            enabled: true,            
        }
    }
})

export type User = typeof auth.$Infer.Session.user