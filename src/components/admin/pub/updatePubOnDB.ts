import { eq } from "drizzle-orm";
import { ServerError, type ServerFunctionEvent } from "solid-start";
import { db } from "~/db";
import { publisher } from "~/drizzle/schema";
import { type Publisher } from "~/drizzle/types";
import { authenticateOrThrowUnauthorized } from "~/utils/authenticate";

export async function updatePubOnDB(fd: FormData, event: ServerFunctionEvent) {
    await authenticateOrThrowUnauthorized(event.request);
    const obj: { [key: string]: string; } = {};
    fd.forEach((val, key) => {
        if (typeof val != "string")
            throw new ServerError('Invalid Format', { status: 400 })
        obj[key] = val;
    })
    const {publisherId, newItem, ...d} = obj;
    if (newItem === "0") {
        await db.update(publisher).set(d).where(eq(publisher.publisherId, publisherId))
        return `Successfully edited developer, ${obj.name}, with ID ${obj.publisherId}`
    }
    else {
        const rows = await db.insert(publisher).values(d as Publisher).returning({publisherId: publisher.publisherId})
        return `Successfully added publisher, ${obj.name}, with ID ${obj.publisherId}`
    }
}