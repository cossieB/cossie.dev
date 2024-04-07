import { and, eq, inArray, not, sql } from "drizzle-orm";
import { db } from "~/db";
import { actor, actorsInGames } from "~/drizzle/schema";
import { type Actor } from "~/drizzle/types";
import { authenticateOrThrowUnauthorized } from "~/utils/authenticate";
import { Character } from "./ActorForm";
import {json} from "@solidjs/router"
import { getActor, getActors } from "~/data/admin";

type Metadata = {
    isNewActor: boolean;
}

type CharWithActorId = Character & {actorId: string}

export async function updateActorOnDB(body: Actor & {characters: Character[]}, metadata: Metadata) {
    'use server'
    await authenticateOrThrowUnauthorized();

    const {characters: chars, ...a} = body;
    const characters = chars.map (c => ({...c, actorId: body.actorId}))

    if (!metadata.isNewActor) {
        await updateActor(a, characters);
        return json(`Successfully edited actor, ${body.name}, with ID ${body.actorId}`, {
            revalidate: [getActor.keyFor(body.actorId), getActors.key]
        })
    }
    else {
        await insertNewActor(a, characters);
        return json(`Successfully added actor, ${body.name}, with ID ${body.actorId}`, {
            revalidate: [getActors.key]
        })
    }
}

async function insertNewActor(a: Actor, characters: CharWithActorId[]) {
    'use server'
    await db.transaction(async (tx) => {
        await tx.insert(actor).values(a);
        if (characters.length > 0)
            await tx.insert(actorsInGames).values(characters);
    });
}

async function updateActor(a: Actor, characters: CharWithActorId[]) {
    'use server'
    await db.transaction(async (tx) => {
        await tx.update(actor).set(a).where(eq(actor.actorId, a.actorId));
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
                            eq(actorsInGames.actorId, a.actorId),
                            not(inArray(actorsInGames.characterId, r))
                        )
                    );
        }
        else {
            await tx
                .delete(actorsInGames)
                .where(
                    eq(actorsInGames.actorId, a.actorId)
                );
        }
    });
}