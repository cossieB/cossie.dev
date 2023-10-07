import { and, eq, inArray, not, sql } from "drizzle-orm";
import { ServerError, type ServerFunctionEvent } from "solid-start";
import { db } from "~/db";
import { actor, actorsInGames } from "~/drizzle/schema";
import { type Actor } from "~/drizzle/types";
import { authenticateOrThrowUnauthorized } from "~/utils/authenticate";

export async function updateActorOnDB(fd: FormData, event: ServerFunctionEvent) {
    await authenticateOrThrowUnauthorized(event.request);
    const obj: { [key: string]: string; } = {};
    let characters: { gameId: string, character: string, importance: number, actorId: string }[] = []
    fd.forEach((val, key) => {
        if (typeof val != "string")
            throw new ServerError('Invalid Format', { status: 400 })
        else if (key == 'characters') {
            characters = JSON.parse(val)
        }
        else {
            obj[key] = val;
        }
    })
    characters = characters.map(x => ({ ...x, actorId: obj.actorId }))
    if (characters.some(x => x.character.length == 0 ))
        throw new ServerError('Character name must be non-empty', {status: 400})
    const { newItem, ...a } = obj;

    if (newItem === "0") {
        await updateActor(a, characters);
        return `Successfully edited actor, ${obj.name}, with ID ${obj.actorId}`
    }
    else {
        await insertNewActor(a, characters);
        return `Successfully added actor, ${obj.name}, with ID ${obj.actorId}`
    }
}

type Character = {
    gameId: string;
    character: string;
    importance: number;
    actorId: string;
};

async function insertNewActor(a: { [key: string]: string; }, characters: Character[]) {
    await db.transaction(async (tx) => {
        await tx.insert(actor).values(a as Actor);
        if (characters.length > 0)
            await tx.insert(actorsInGames).values(characters);
    });
}

async function updateActor(a: { [key: string]: string; }, characters: Character[]) {
    const { actorId } = a;
    delete a.actorId;
    await db.transaction(async (tx) => {
        await tx.update(actor).set(a as Actor).where(eq(actor.actorId, actorId));
        // drizzle requires values array to be non-empty so I have to handle the empty and non-empty cases separately.
        if (characters.length > 0) {
            const rows = await tx
                .insert(actorsInGames)
                .values(characters)
                .onConflictDoUpdate({
                    target: [actorsInGames.gameId, actorsInGames.actorId],
                    set: {
                        importance: sql`excluded.importance`,
                        character: sql`excluded.character`
                    }
                })
                .returning({ characterId: actorsInGames.characterId });
            const r = rows.map(x => x.characterId);
            if (r.length > 0)
                await tx
                    .delete(actorsInGames)
                    .where(
                        and(
                            eq(actorsInGames.actorId, actorId),
                            not(inArray(actorsInGames.characterId, r))
                        )
                    );
        }
        else {
            await tx
                .delete(actorsInGames)
                .where(
                    eq(actorsInGames.actorId, actorId)
                );
        }
    });
}