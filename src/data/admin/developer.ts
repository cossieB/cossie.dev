import { cache } from "@solidjs/router";
import { db } from "~/db";

export const getDevelopers = cache(async () => {
    'use server';
    return db.query.developer.findMany({
        orderBy: (fields) => fields.name
    });
}, "developers");

export const getDeveloper = cache(async (developerId: string) => {
    'use server'
    try {
        const result = await db.query.developer.findFirst({
            where(fields, operators) {
                return operators.eq(fields.developerId, developerId);
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
}, 'developer')