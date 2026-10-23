import { randomBytes } from "node:crypto";
import * as v from 'valibot';
import { db } from "~/drizzle/db";
import { urlLinks } from "~/drizzle/schema/shrnkr";
import { auth } from "~/utils/auth";
import { getRequestEvent, markSafeError, respond } from "@solidjs/web";
import { and, count, eq, gte } from "drizzle-orm";

export const LinkCategorySchema = v.union([
    v.literal('general'),
    v.literal('marketing'),
    v.literal('personal'),
    v.literal('work'),
    v.literal('social-media'),
]);

export type LinkCategory = v.InferOutput<typeof LinkCategorySchema>;

export const InputSchema = v.object({
    url: v.pipe(v.string(), v.url()),
    customBackHalf: v.optional(
        v.union([
            v.pipe(v.string(), v.length(0)),
            v.pipe(
                v.string(),
                v.minLength(5),
                v.regex(/^\w[\w-]+$/, "Custom back-half must be alphanumeric only.")
            ),
        ])
    ),
    category: LinkCategorySchema,
    campaignSource: v.string(),
    campaignName: v.string(),
    campaignMedium: v.string(),
    campaignTerm: v.string(),
    expiryDate: v.string()
});

const isDuplicate = (error: unknown) => error instanceof Error && error.cause instanceof Error && error.cause.message.toUpperCase().includes("SQLITE_CONSTRAINT_UNIQUE")

export type Input = v.InferOutput<typeof InputSchema>;

export async function createShortUrl(input: unknown) {
    'use server';

    const headers = getRequestEvent()?.request.headers;
    if (!headers) return respond(new Error("Something went wrong. Please try again later."), {
        status: 500
    })

    const user = await auth.api.getSession({
        headers
    });

    if (!user) return respond(new Error("Please login first."), {
        status: 401
    })

    const parseResult = v.safeParse(InputSchema, input);

    if (!parseResult.success) {
        const flatErrors = v.flatten<typeof InputSchema>(parseResult.issues);
        return respond(new Error(JSON.stringify(flatErrors.nested)), {
            status: 400
        })
    }
    const data = parseResult.output

    const twentyEightDaysAgo = new Date(Date.now() - 28 * 24 * 60 * 60 * 1000);
    const [{ count: linkCount }] = await db
        .select({ count: count() })
        .from(urlLinks)
        .where(
            and(
                eq(urlLinks.userId, user.user.id),
                gte(urlLinks.createdAt, twentyEightDaysAgo)
            )
        );

    const linkLimit = user.user.isAnonymous ? 5 : 20;

    if (linkCount >= linkLimit) 
        return respond(new Error(`You have reached your limit of ${linkLimit} links created in the past 28 days.`), {
            status: 429
        });    

    const url = new URL(data.url)

    if (url.protocol !== "https:") return respond(new Error("Invalid URL. Only secure urls starting with https are allowed"), {
        status: 400
    })
    if (data.campaignSource) url.searchParams.set("utm_source", data.campaignSource);
    if (data.campaignMedium) url.searchParams.set("utm_medium", data.campaignMedium);
    if (data.campaignName) url.searchParams.set("utm_campaign", data.campaignName);
    if (data.campaignTerm) url.searchParams.set("utm_term", data.campaignTerm);

    const longUrl = url.toString()

    if (data.customBackHalf) {
        if (user.user.isAnonymous) return respond(new Error("Anonymous users cannot use the custom back-half feature"), {
            status: 400
        })
        try {
            const [inserted] = await db.insert(urlLinks).values({
                longUrl,
                shortCode: data.customBackHalf,
                userId: user.user.id,
                category: data.category,
                isCustomAlias: true,
            })
                .returning()
            return inserted
        }
        catch (error) {
            if (error instanceof Error && error.cause instanceof Error && error.cause.message.toUpperCase().includes("SQLITE_CONSTRAINT_UNIQUE"))
                return respond(new Error("That short link is not available"), {
                    status: 400
                })
            console.error(error)
            return respond(new Error("Something went wrong. Please try again later."), {
                status: 500
            })
        }
    }

    let attempts = 0
    while (attempts < 5) {
        const salt = randomBytes(4).toString("hex")
        const shortCode = Buffer.from(longUrl + salt).toString("base64url").slice(0, 7)
        try {
            const [inserted] = await db.insert(urlLinks).values({
                longUrl,
                shortCode,
                userId: user.user.id,
                category: data.category,
                isCustomAlias: false,
            })
                .returning();

            return inserted
        }
        catch (error) {
            if (!isDuplicate(error)) {
                console.error(error)
                return respond(new Error("Something went wrong. Please try again later"), {
                    status: 500
                })
            }
            attempts++
        }
    }
    return respond(new Error("Could not create short url"), {
        status: 500
    })
}
