import type { Game } from "~/drizzle/types";
import { db } from "~/db";
import { game, gamesOnPlatforms, genresOfGames } from "~/drizzle/schema";
import { eq } from "drizzle-orm";
import { authenticateOrThrowUnauthorized } from "~/utils/authenticate";
import {json} from "@solidjs/router"
import { getGame, getGames } from "~/routes/data";

type Metadata = {
    tagsHaveChanged: boolean;
    platformsHaveChanged: boolean;
    isNewGame: boolean;
}

export async function updateGamesOnDB(body: Game & {platforms: string[], tags: string[]}, metadata: Metadata) {
    'use server'; 
    // await authenticateOrThrowUnauthorized(); 
    const {platforms, tags, ...g} = body; 
    if (!metadata.isNewGame) {
        await db.transaction(async (tx) => {
            if (metadata.tagsHaveChanged) {
                await tx.delete(genresOfGames).where(eq(genresOfGames.gameId, g.gameId));
                if (tags.length > 0)
                    await tx.insert(genresOfGames).values((tags).map(genre => ({ gameId: g.gameId, genre: genre.toLowerCase() })));
            }
            if (metadata.platformsHaveChanged) {
                await tx.delete(gamesOnPlatforms).where(eq(gamesOnPlatforms.gameId, g.gameId));
                if (platforms.length > 0)
                    await tx.insert(gamesOnPlatforms).values((platforms).map(platformId => ({ gameId: g.gameId, platformId: platformId })));
            }
            await tx.update(game).set(g).where(eq(game.gameId, g.gameId));
        });
        return json(`Successfully edited game, ${g.title}, with ID ${g.gameId}`, {
            revalidate: [getGame.keyFor(g.gameId), getGames.key]
        })
    }
    else {
        await db.transaction(async (tx) => {
            const rows = await tx.insert(game).values(g).returning({ gameId: game.gameId }); 
            if (tags.length > 0)
                await tx.insert(genresOfGames).values((tags).map(genre => ({ gameId: rows[0].gameId, genre: genre.toLowerCase() })));
            await tx.insert(gamesOnPlatforms).values((platforms).map(platformId => ({ gameId: rows[0].gameId, platformId: platformId })))
            return rows[0].gameId;
        });
        return json(`Successfully added game, ${g.title}, with ID ${g.gameId}`, {
            revalidate: [getGames.key]
        })
    }
}
