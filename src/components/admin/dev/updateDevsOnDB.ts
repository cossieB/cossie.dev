import { eq } from "drizzle-orm";
import { getRequestEvent } from "solid-js/web";
import { db } from "~/db";
import { developer } from "~/drizzle/schema";
import type { Developer } from "~/drizzle/types";
import { authenticateOrThrowUnauthorized } from "~/utils/authenticate";

export async function updateDevOnDB(fd: FormData) {
    const event = getRequestEvent()
    if (!event) throw new Error("Something went wrong.")
    await authenticateOrThrowUnauthorized(event.request);
    const obj: { [key: string]: string; } = {};
    fd.forEach((val, key) => {
        if (typeof val != "string")
            throw new ServerError('Invalid Format', { status: 400 })
        obj[key] = val;
    })
    const {developerId, newDev, ...d} = obj;

    if (newDev === "0") {
        await db.update(developer).set(d).where(eq(developer.developerId, developerId))
        return `Successfully edited developer, ${obj.name}, with ID ${obj.developerId}`
    }
    else {
        await db.insert(developer).values(d as Developer)
        return `Successfully added developer, ${obj.name}, with ID ${obj.developerId}`
    }
}