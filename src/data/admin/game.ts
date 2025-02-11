import { query, redirect } from "@solidjs/router";
import { sql, eq } from "drizzle-orm";
import { db } from "~/db";
import { genresOfGames, gamesOnPlatforms, game, platform } from "~/drizzle/schema";

export const getGames = query(async () => {
    'use server';
    return db.query.game.findMany({
        orderBy: (fields) => fields.title
    });
}, "games");

export const getGame = query(async (gameId: string) => {
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
            return redirect("/admin/404", {status: 404, statusText: "Not Found"})
        return { ...result[0].Game, tags: result[0].t?.tags ?? [], platforms: result[0].v?.platforms ?? [] }
    }
    catch (error: any) {
        if (error.message?.includes('invalid input syntax for type uuid'))
            return redirect("/admin/404", {status: 404, statusText: "Not Found"})
        throw error
    }
}, `game`)