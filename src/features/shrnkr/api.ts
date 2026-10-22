import { eq } from "drizzle-orm";
import { randomBytes } from "node:crypto";
import { action } from "@solidjs/router";
import * as v from 'valibot';
import { db } from "~/drizzle/db";
import { urlLinks } from "~/drizzle/schema/shrnkr";
import { auth } from "~/utils/auth";
import { getRequestEvent } from "@solidjs/web";

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
    customBackHalf: v.string(),
    category: LinkCategorySchema,
    campaignSource: v.string(),
    campaignName: v.string(),
    campaignMedium: v.string(),
    campaignTerm: v.string(),
});

export type Input = v.InferOutput<typeof InputSchema>;


export const createShortUrl = action(async (input: unknown) => {
    'use server'
    const headers = getRequestEvent()?.request.headers;
    if (!headers) throw Response.json({
        error: "Something Went Wrong"
    }, {
        status: 500
    })
    const user = await auth.api.getSession({
        headers
    });
    
    if (!user) throw Response.json({
        error: "Please login first"
    }, {
        status: 401
    })

    const parseResult = v.safeParse(InputSchema, input);

    if (!parseResult.success) {
        const flatErrors = v.flatten<typeof InputSchema>(parseResult.issues);

        throw Response.json({ error: flatErrors.nested }, {
            status: 400
        });
    }
    const data = parseResult.output
    const url = new URL(data.url)

    if (url.protocol !== "https:") throw Response.json({
        error: "Invalid URL. Only secure urls starting with https are allowed"
    }, {
        status: 400
    })
    if (data.campaignSource) url.searchParams.set("utm_source", data.campaignSource);
    if (data.campaignMedium) url.searchParams.set("utm_medium", data.campaignMedium);
    if (data.campaignName) url.searchParams.set("utm_campaign", data.campaignName);
    if (data.campaignTerm) url.searchParams.set("utm_term", data.campaignTerm);

    const longUrl = url.toString()

    if (!user.user.isAnonymous && data.customBackHalf) {
        
    }

    let shortCode: string
    let attempts = 0
    while (true) {
        const salt = randomBytes(4).toString("hex")
        shortCode = Buffer.from(longUrl + salt).toString("base64url").slice(0, 7)
        const exisiting = (await db.select({
            linkId: urlLinks.linkId
        })
            .from(urlLinks)
            .where(eq(urlLinks.shortCode, shortCode))).at(0);

        if (!exisiting) break
        attempts++
        if (attempts > 5) throw Response.json({
            error: "Could not create short url"
        }, {
            status: 500
        })
    }
    const [entry] = await db.insert(urlLinks).values({
        longUrl,
        shortCode,
        userId: user.user.id,
        category: data.category,
        isCustomAlias: false,
    })
    .returning();

    return entry
})