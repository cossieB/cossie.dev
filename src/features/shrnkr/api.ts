import { getRequestEvent, respond } from "@solidjs/web";
import * as v from 'valibot';
import { auth } from "~/utils/auth";
import { checkUserLinkLimit, processAndValidateUrl, saveShortLink, LinkCreationError } from "./services/linkService";
import { Input, InputSchema, LinkCategory, LinkCategorySchema } from "./services/schema";
import { GET } from "@solidjs/web/server-functions";
import { db } from "~/drizzle/db";
import { clickAnalytics, urlLinks } from "~/drizzle/schema";
import { and, count, desc, eq, getColumns, gte, isNull, or, SQL } from "drizzle-orm";
import { sleep } from "~/lib/sleep";

export async function createShortUrl(input: Input) {
    'use server';

    const headers = getRequestEvent()?.request.headers;
    if (!headers) {
        return respond(new Error("Something went wrong. Please try again later."), { status: 500 });
    }

    const userSession = await auth.api.getSession({ headers });
    if (!userSession) {
        return respond(new Error("Please login first."), { status: 401 });
    }

    const parseResult = v.safeParse(InputSchema, input);
    if (!parseResult.success) {
        const flatErrors = v.flatten<typeof InputSchema>(parseResult.issues);
        return respond(new Error(JSON.stringify(flatErrors.nested)), { status: 400 });
    }
    const data = parseResult.output;

    if (data.customBackHalf && userSession.user.isAnonymous) {
        return respond(new Error("Anonymous users cannot use the custom back-half feature"), { status: 400 });
    }

    try {
        await checkUserLinkLimit(userSession.user.id, userSession.user.isAnonymous!);
        const longUrl = await processAndValidateUrl(data.url, data);
        const inserted = await saveShortLink({
            longUrl,
            userId: userSession.user.id,
            data
        });

        return inserted;
    }
    catch (error) {
        if (error instanceof LinkCreationError) {
            return respond(new Error(error.message), { status: error.status });
        }

        console.error(error);
        return respond(new Error("Something went wrong. Please try again later."), { status: 500 });
    }
}

export const LINKS_PER_PAGE = 5

export const GetLinksSchema = v.object({
    ownedLinksOnly: v.fallback(v.boolean(), false),
    category: v.fallback(v.optional(LinkCategorySchema), undefined),
    page: v.fallback(v.number(), 0)
})

export type Filter = v.InferOutput<typeof GetLinksSchema>

export const getShortenedLinks = GET(async (filter: Filter) => {
    'use server';
    const {ownedLinksOnly, page, category} = v.parse(GetLinksSchema, filter)

    const headers = getRequestEvent()?.request.headers;
    if (!headers) {
        return respond([], { status: 500 });
    }

    const userSession = await auth.api.getSession({ headers });

    const conditions: (SQL | undefined)[] = [
        eq(urlLinks.isActive, true),
        or(
            isNull(urlLinks.expiresAt),
            gte(urlLinks.expiresAt, new Date())
        )
    ]

    if (ownedLinksOnly && userSession)
        conditions.push(eq(urlLinks.userId, userSession.user.id))

    if (category)
        conditions.push(eq(urlLinks.category, category))
    
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