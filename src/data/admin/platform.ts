import { cache } from "@solidjs/router";
import { db } from "~/db";

export const getPlatforms = cache(async () => {
    'use server';
    return db.query.platform.findMany({
        orderBy: (fields) => fields.name
    });
}, "platforms");

export const getPlatform = cache(async (platformId: string) => {
    'use server';
    try {
        const result = await db.query.platform.findFirst({
            where(fields, operators) {
                return operators.eq(fields.platformId, platformId);
            },
        })

        if (!result)
            throw new Error("404")
        return result
    }
    catch (error: any) {
        if (error.message?.includes('invalid input syntax for type uuid'))
            throw new Error('404')
        throw error
    }
}, 'platform')