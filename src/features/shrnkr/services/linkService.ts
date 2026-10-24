import { createHash, randomBytes } from "node:crypto";
import { db } from "~/drizzle/db";
import { urlLinks } from "~/drizzle/schema/shrnkr";
import { and, count, gte, eq } from "drizzle-orm";
import { checkUrlExists } from "../utils/checkUrlExists";
import { Input } from "./schema";

const TWENTY_EIGHT_DAYS_MS = 28 * 24 * 60 * 60 * 1000;

export class LinkCreationError extends Error {
    constructor(message: string, public status: number) {
        super(message);
        this.name = "LinkCreationError";
    }
}

const isDuplicate = (error: unknown): boolean => {
    if (!(error instanceof Error)) return false;
    const message = [
        error.message,
        error.cause instanceof Error ? error.cause.message : ""
    ].join(" ").toUpperCase();
    return message.includes("SQLITE_CONSTRAINT_UNIQUE");
};

export async function checkUserLinkLimit(userId: string, isAnonymous: boolean) {
    const twentyEightDaysAgo = new Date(Date.now() - TWENTY_EIGHT_DAYS_MS);
    const [{ count: linkCount }] = await db
        .select({ count: count() })
        .from(urlLinks)
        .where(and(eq(urlLinks.userId, userId), gte(urlLinks.createdAt, twentyEightDaysAgo)));

    const linkLimit = isAnonymous ? 5 : 20;
    if (linkCount >= linkLimit) {
        throw new LinkCreationError(`You have reached your limit of ${linkLimit} links created in the past 28 days.`, 429);
    }
}

export async function processAndValidateUrl(rawUrl: string, data: Input) {
    const url = new URL(rawUrl);

    if (url.protocol !== "https:") {
        throw new LinkCreationError("Invalid URL. Only secure urls starting with https are allowed", 400);
    }

    const isValidUrl = await checkUrlExists(url.toString());
    if (!isValidUrl) {
        throw new LinkCreationError("The provided URL could not be reached or does not exist.", 400);
    }

    if (data.campaignSource) url.searchParams.set("utm_source", data.campaignSource);
    if (data.campaignMedium) url.searchParams.set("utm_medium", data.campaignMedium);
    if (data.campaignName) url.searchParams.set("utm_campaign", data.campaignName);
    if (data.campaignTerm) url.searchParams.set("utm_term", data.campaignTerm);

    return url.toString();
}

export async function saveShortLink({
    longUrl,
    userId,
    data
}: {
    longUrl: string;
    userId: string;
    data: Input;
}) {
    const expiresAt = data.expiry ? new Date(data.expiry) : undefined;

    if (data.customBackHalf) {
        try {
            const [inserted] = await db.insert(urlLinks).values({
                longUrl,
                shortCode: data.customBackHalf,
                userId,
                category: data.category,
                isCustomAlias: true,
                expiresAt
            }).returning();
            return inserted;
        } catch (error) {
            if (isDuplicate(error)) {
                throw new LinkCreationError("That short link is not available", 400);
            }
            throw error;
        }
    }

    let attempts = 0;
    while (attempts < 5) {
        const salt = randomBytes(4).toString("hex");
        const hash = createHash('sha256').update(longUrl + salt).digest('base64url');
        const shortCode = hash.slice(0, 7);

        try {
            const [inserted] = await db.insert(urlLinks).values({
                longUrl,
                shortCode,
                userId,
                category: data.category,
                isCustomAlias: false,
                expiresAt
            }).returning();

            return inserted;
        } catch (error) {
            if (!isDuplicate(error)) throw error;
            attempts++;
        }
    }

    throw new LinkCreationError("Could not create short url", 500);
}