import { db } from "~/db";
import { cache } from "@solidjs/router";
import { getSession } from "~/utils/getSession";
import { sql, eq } from "drizzle-orm";
import { genresOfGames, gamesOnPlatforms, game, platform } from "~/drizzle/schema";

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


export const getGame = cache(async (gameId: string) => {
    'use server'
    try {
        const genreQuery = db.$with('t').as(db.select({
            gameId: genresOfGames.gameId,
            tags: sql<string[]>`array_agg(genre)`.as('tags')
        })
            .from(genresOfGames)
            .where(eq(genresOfGames.gameId, gameId))
            .groupBy(genresOfGames.gameId)
        )
        const platformQuery = db.$with('v').as(db.select({
            gameId: gamesOnPlatforms.gameId,
            platforms: sql<string[]>`array_agg("GamesOnPlatforms"."platformId")`.as('platforms')
        })
            .from(gamesOnPlatforms)
            .innerJoin(platform, eq(gamesOnPlatforms.platformId, platform.platformId))
            .where(eq(gamesOnPlatforms.gameId, gameId))
            .groupBy(gamesOnPlatforms.gameId)
        )
        const result = await db
            .with(genreQuery, platformQuery)
            .select()
            .from(game)
            .leftJoin(genreQuery, eq(game.gameId, genreQuery.gameId))
            .leftJoin(platformQuery, eq(game.gameId, platformQuery.gameId))
            .where(eq(game.gameId, gameId))

        if (result.length == 0)
            throw new Error('404')
        return { ...result[0].Game, tags: result[0].t?.tags ?? [], platforms: result[0].v?.platforms ?? [] }
    }
    catch (error: any) {
        if (error.message?.includes('invalid input syntax for type uuid'))
            throw new Error('404')
        throw error
    }
}, `game`)