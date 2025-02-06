import { query } from "@solidjs/router";
import { eq } from "drizzle-orm";
import { db } from "~/db";
import { actorsInGames, game, actor } from "~/drizzle/schema";

export const getActors = query(async () => {
    'use server';
    return db.query.actor.findMany({
        orderBy: (fields) => fields.name
    });
}, "actors");

export const getActor = query(async (actorId: string) => {
    'use server';
    try {
        const cq = db.select({
            importance: actorsInGames.importance,
            character: actorsInGames.character,
            gameTitle: game.title,
            gameId: game.gameId
        })
            .from(actorsInGames)
            .innerJoin(game, eq(game.gameId, actorsInGames.gameId))
            .where(eq(actorsInGames.actorId, actorId))
            .orderBy(fields => fields.gameTitle)

        const aq = db.select()
            .from(actor)
            .where(eq(actor.actorId, actorId))
            .limit(1)

        const [characters, result] = await Promise.all([cq, aq])
        if (result.length == 0)
            throw new Error("404")
        return { ...result[0], characters }
    }
    catch (error: any) {
        if (error.message?.includes('invalid input syntax for type uuid'))
            throw new Error('404')
        throw error
    }
}, 'actor')