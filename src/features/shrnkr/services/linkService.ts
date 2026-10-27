import { createHash, randomBytes } from "node:crypto";
import { db } from "~/drizzle/db";
import { clickAnalytics, urlLinks } from "~/drizzle/schema/shrnkr";
import { and, count, gte, eq, SQL, or, isNull, desc, sql } from "drizzle-orm";
import { checkUrlExists } from "../utils/checkUrlExists";
import { Filter, GetLinksSchema, Input } from "./schema";
import { getServerSideUser } from "~/features/auth/api";
import * as v from 'valibot';
import { getRequestEvent, redirect, respond } from "@solidjs/web";
import { GET } from "@solidjs/web/server-functions";
import { waitUntil } from "cloudflare:workers";

const TWENTY_EIGHT_DAYS_MS = 28 * 24 * 60 * 60 * 1000;

export class AppError extends Error {
    constructor(message: string, public status: number) {
        super(message);
        this.name = "AppError";
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
    'use server'
    const twentyEightDaysAgo = new Date(Date.now() - TWENTY_EIGHT_DAYS_MS);
    const [{ count: linkCount }] = await db
        .select({ count: count() })
        .from(urlLinks)
        .where(and(eq(urlLinks.userId, userId), gte(urlLinks.createdAt, twentyEightDaysAgo)));

    const linkLimit = isAnonymous ? 5 : 20;
    if (linkCount >= linkLimit) {
        throw new AppError(`You have reached your limit of ${linkLimit} links created in the past 28 days.`, 429);
    }
}

export async function processAndValidateUrl(rawUrl: string, data: Input) {
    const url = new URL(rawUrl);

    if (url.protocol !== "https:") {
        throw new AppError("Invalid URL. Only secure urls starting with https are allowed", 400);
    }

    const isValidUrl = await checkUrlExists(url.toString());
    if (!isValidUrl) {
        throw new AppError("The provided URL could not be reached or does not exist.", 400);
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
    'use server'
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
                throw new AppError("That short link is not available", 400);
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

    throw new AppError("Could not create short url", 500);
}

export const LINKS_PER_PAGE = 20

export const getLinks = GET(async (filter: Filter) => {
    'use server'
    const { ownedLinksOnly, page, category } = v.parse(GetLinksSchema, filter)
    const conditions: (SQL | undefined)[] = [
        eq(urlLinks.isActive, true),
        or(
            isNull(urlLinks.expiresAt),
            gte(urlLinks.expiresAt, new Date())
        )
    ]

    const userSession = await getServerSideUser()

    if (ownedLinksOnly && userSession)
        conditions.push(eq(urlLinks.userId, userSession.user.id))

    if (category)
        conditions.push(eq(urlLinks.category, category))

    getRequestEvent()?.response.headers.set("Cache-Control", "private; max-age=60")

    return db
        .select({
            linkId: urlLinks.linkId,
            shortCode: urlLinks.shortCode,
            longUrl: urlLinks.longUrl,
            category: urlLinks.category,
            createdAt: urlLinks.createdAt,
            userId: urlLinks.userId,
            clickCount: count(clickAnalytics.id)
        })
        .from(urlLinks)
        .leftJoin(clickAnalytics, eq(urlLinks.linkId, clickAnalytics.linkId))
        .limit(LINKS_PER_PAGE + 1)
        .offset(page * LINKS_PER_PAGE)
        .where(and(...conditions))
        .groupBy(urlLinks.linkId)
        .orderBy(desc(urlLinks.linkId))

})

export async function deleteLink(linkId: number, userId: string) {
    'use server'
    const res = await db
        .update(urlLinks)
        .set({
            isActive: false
        })
        .where(and(
            eq(urlLinks.linkId, linkId),
            eq(urlLinks.userId, userId)
        ))
        .returning()
    return res.at(0)
}

export const gotoLongUrl = GET(async (shortCode: string) => {
    'use server'
    const now = Date.now()
    const request = getRequestEvent()?.request
    const res = await db
        .select()
        .from(urlLinks)
        .where(eq(urlLinks.shortCode, shortCode))

    const link = res.at(0);
    if (link) {
        if ((link.expiresAt?.getTime() ?? Number.MAX_SAFE_INTEGER) > now) {

            waitUntil(
                db
                    .insert(clickAnalytics)
                    .values({
                        // @ts-expect-error don't know why TS is complaining here 🤔
                        linkId: link.linkId,
                        clickedAt: new Date,
                        countryCode: (request?.cf?.country as string)?.slice(0, 2),
                        city: request?.cf?.city,
                        region: request?.cf?.region,
                        continent: request?.cf?.continent,
                        userAgent: request?.headers.get("user-agent"),
                        referrer: request?.headers.get("referer"),
                    })
            )
            throw redirect(link.longUrl, {
                headers: {
                    "Cache-Control": "private; max-age=60"
                },
                status: 307
            })
        }
        if (link.expiresAt) {
            waitUntil(
                db.update(urlLinks).set({ isActive: false }).where(eq(urlLinks.linkId, link.linkId))
            )
        }
    }
    // fallthrough to the 404 page
})


export const getLinkAnalytics = GET(async (targetLinkId: number) => {
    'use server'
    const [
        [totalResult],
        topCountries,
        topReferrers,
        byDate,
    ] = await db.batch([
        // 1. Get total clicks
        db.select({ totalClicks: count() })
            .from(clickAnalytics)
            .where(eq(clickAnalytics.linkId, targetLinkId)),

        // 2. Get top countries
        db.select({
            countryCode: clickAnalytics.countryCode,
            count: count(),
        })
            .from(clickAnalytics)
            .where(eq(clickAnalytics.linkId, targetLinkId))
            .groupBy(clickAnalytics.countryCode)
            .orderBy(desc(count()))
            .limit(5),

        // 3. Get top referrers
        db.select({
            referrer: clickAnalytics.referrer,
            count: count(),
        })
            .from(clickAnalytics)
            .where(eq(clickAnalytics.linkId, targetLinkId))
            .groupBy(clickAnalytics.referrer)
            .orderBy(desc(count()))
            .limit(5),

        // 4. Get clicks by date
        db.select({
            clickDate: sql<string>`date(clicked_at, 'unixepoch')`.as('click_date'),
            dailyClicks: count(),
        })
            .from(clickAnalytics)
            .where(eq(clickAnalytics.linkId, targetLinkId))
            .groupBy(sql`click_date`)
            .orderBy(desc(sql`click_date`)),
    ]);
    getRequestEvent()?.response.headers.set("Cache-Control", "public; max-age=300")
    return {
        totalClicks: totalResult?.totalClicks ?? 0,
        topCountries,
        topReferrers,
        byDate,
    };
})