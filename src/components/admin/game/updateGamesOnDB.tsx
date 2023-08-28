import type { Game } from "~/drizzle/types";
import { db } from "~/db";
import { game, genresOfGames } from "~/drizzle/schema";
import { ServerError } from "solid-start";
import { eq } from "drizzle-orm";

export const updateGamesOnDB = async (fd: FormData) => {
    const obj: { [key: string]: string | string[]; } = {};
    fd.forEach((val, key) => {
        if (typeof val != "string")
            throw new ServerError('Invalid Format', { status: 400 })

        if (key == 'gameId' && val.length == 0) { }

        else if (key == 'images' || key == 'tags')
            obj[key] = val.split(",");

        else
            obj[key] = val;

    });
    const tagsHaveChanged = obj.tagsHaveChanged === '1'
    delete obj.tagsHaveChanged;
    delete obj.tagsInput; 
    
    if (obj.gameId) {
        await db.transaction(async tx => {
            if (tagsHaveChanged) {
                await tx.delete(genresOfGames).where(eq(genresOfGames.gameId, obj.gameId as string))
                await tx.insert(genresOfGames).values((obj.tags as string[]).map(genre => ({ gameId: obj.gameId as string, genre })));
            }
            await tx.update(game).set(obj).where(eq(genresOfGames.gameId, obj.gameId as string))   
        })
        return obj.gameId as string;
    }
    else {
        return await db.transaction(async (tx) => {
            const rows = await tx.insert(game).values(obj as Game).returning({ gameId: game.gameId });
            await tx.insert(genresOfGames).values((obj.tags as string[]).map(genre => ({ gameId: rows[0].gameId, genre })));
            return rows[0].gameId;
        });
    }
};
