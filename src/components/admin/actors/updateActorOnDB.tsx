import {ServerError, type ServerFunctionEvent } from "solid-start";
import { authenticateOrThrowUnauthorized } from "~/utils/authenticate";

export async function updateActorOnDB(fd: FormData, event: ServerFunctionEvent): Promise<void> {
    await authenticateOrThrowUnauthorized(event.request);
    const obj: { [key: string]: string; } = {};
    fd.forEach((val, key) => {
        if (typeof val != "string")
            throw new ServerError('Invalid Format', { status: 400 })
        obj[key] = val;
    })
    const {actorId, newItem, ...a} = obj
}
