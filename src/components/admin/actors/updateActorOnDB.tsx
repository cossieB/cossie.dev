import {ServerError, type ServerFunctionEvent } from "solid-start";
import { authenticateOrThrowUnauthorized } from "~/utils/authenticate";

export async function updateActorOnDB(fd: FormData, event: ServerFunctionEvent) {
    // await authenticateOrThrowUnauthorized(event.request);
    const obj: { [key: string]: string; } = {};
    let characters: {gameId: string, character: string, importance: string}[] = []
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
console.log(characters)
    return 'ok'
}
