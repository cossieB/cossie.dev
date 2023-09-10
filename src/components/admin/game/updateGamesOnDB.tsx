import type { Game } from "~/drizzle/types";
import { db } from "~/db";
import { game, gamesOnPlatforms, genresOfGames } from "~/drizzle/schema";
import { ServerError, ServerFunctionEvent } from "solid-start";
import { eq } from "drizzle-orm";
import { authenticateOrThrowUnauthorized } from "~/utils/authenticate";

export async function updateGamesOnDB(fd: FormData, event: ServerFunctionEvent) {
    await authenticateOrThrowUnauthorized(event.request);
    const obj: { [key: string]: string | string[]; } = {};
    fd.forEach((val, key) => {
        if (typeof val != "string")
            throw new ServerError('Invalid Format', { status: 400 });
        if (key == 'gameId' && val.length == 0) { }
        else if (key == 'images' || key == 'tags' || key == 'pforms')
            obj[key] = val == "" ? [] : val.split(',');

        else
            obj[key] = val;

    });

    delete obj.tagsInput;
    if (obj.gameId) {
        const { gameId, tags, pforms, tagsHaveChanged, pformsHaveChanged, ...g } = obj;

        await db.transaction(async (tx) => {
            if (tagsHaveChanged === "1") {
                await tx.delete(genresOfGames).where(eq(genresOfGames.gameId, obj.gameId as string));
                if (tags.length > 0)
                    await tx.insert(genresOfGames).values((obj.tags as string[]).map(genre => ({ gameId: obj.gameId as string, genre: genre.toLowerCase() })));
            }
            if (pformsHaveChanged === "1") {
                await tx.delete(gamesOnPlatforms).where(eq(gamesOnPlatforms.gameId, obj.gameId as string));
                if (pforms.length > 0)
                    await tx.insert(gamesOnPlatforms).values((obj.pforms as string[]).map(platformId => ({ gameId: gameId as string, platformId: platformId })));
            }
            await tx.update(game).set(g).where(eq(game.gameId, obj.gameId as string));
        });
        return obj.gameId as string;
    }
    else {
        return await db.transaction(async (tx) => {
            const rows = await tx.insert(game).values(obj as Game).returning({ gameId: game.gameId });
            await tx.insert(genresOfGames).values((obj.tags as string[]).map(genre => ({ gameId: rows[0].gameId, genre: genre.toLowerCase() })));
            return rows[0].gameId;
        });
    }
}
