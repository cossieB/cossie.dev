import { query } from "@solidjs/router";
import { db } from "~/db";

export const getPublishers = query(async () => {
    'use server';
    return db.query.publisher.findMany({
        orderBy: (fields) => fields.name
    });
}, "publishers");

export const getPublisher = query(async (publisherId: string) => {
    'use server';
    try {
        const result = await db.query.publisher.findFirst({
            where(fields, operators) {
                return operators.eq(fields.publisherId, publisherId);
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
}, 'publisher')