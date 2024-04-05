import { db } from "~/db";
import { cache } from "@solidjs/router";
import { getSession } from "~/utils/getSession";

export const getDevelopers = cache(async () => {
    'use server';
    return db.query.developer.findMany({
        orderBy: (fields) => fields.name
    });
}, "developers");

export const getPublishers = cache(async () => {
    'use server';
    return db.query.publisher.findMany({
        orderBy: (fields) => fields.name
    });
}, "publishers");

export const getPlatforms = cache(async () => {
    'use server';
    return db.query.platform.findMany({
        orderBy: (fields) => fields.name
    });
}, "platforms");

export const getGames = cache(async () => {
    'use server';
    return db.query.game.findMany({
        orderBy: (fields) => fields.title
    });
}, "games");

export const getActors = cache(async () => {
    'use server';
    return db.query.actor.findMany({
        orderBy: (fields) => fields.name
    });
}, "actors");

export const getUser = cache(async () => {
    'use server';
    const session = await getSession();
    if (!session.data.user) return null;
    return session.data.user as { username: string; };
}, "user");
