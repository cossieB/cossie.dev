import {ServerError, type ServerFunctionEvent } from "solid-start";
import { db } from "~/db";
import { actor, actorsInGames } from "~/drizzle/schema";
import { Actor } from "~/drizzle/types";
import { authenticateOrThrowUnauthorized } from "~/utils/authenticate";

export async function updateActorOnDB(fd: FormData, event: ServerFunctionEvent) {
    // await authenticateOrThrowUnauthorized(event.request);
    const obj: { [key: string]: string; } = {};
    let characters: {gameId: string, character: string, importance: number, actorId: string}[] = []
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
    characters = characters.map(x => ({...x, actorId: obj.actorId}))
    const {newItem, ...a} = obj;
    if (newItem === "0") {

    }
    else {
        await db.transaction(async tx => {
            await tx.insert(actor).values(a as Actor)
            if (characters.length > 0)
                await tx.insert(actorsInGames).values(characters)
        })
    }
    return 'ok'
}
