import { eq } from "drizzle-orm";
import { ServerError, ServerFunctionEvent } from "solid-start";
import { db } from "~/db";
import { platform } from "~/drizzle/schema";
import { Platform } from "~/drizzle/types";
import { authenticateOrThrowUnauthorized } from "~/utils/authenticate";

export async function updatePlatformOnDB(fd: FormData, event: ServerFunctionEvent) {
    await authenticateOrThrowUnauthorized(event.request);
    const obj: { [key: string]: string; } = {};
    fd.forEach((val, key) => {
        if (typeof val != "string")
            throw new ServerError('Invalid Format', { status: 400 })
        obj[key] = val;
    })
    const {platformId, newItem, ...d} = obj;
    if (newItem === "0") {
        await db.update(platform).set(d).where(eq(platform.platformId, platformId))
        return `Successfully edited platform, ${obj.name}, with ID ${obj.platformId}`
    }
    else {
        await db.insert(platform).values(d as Platform).returning({platformId: platform.platformId})
        return `Successfully added platform, ${obj.name}, with ID ${obj.platformId}`
    }
}