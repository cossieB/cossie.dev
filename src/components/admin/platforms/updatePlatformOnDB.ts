import { eq } from "drizzle-orm";
import { ServerError } from "solid-start";
import { db } from "~/db";
import { platform } from "~/drizzle/schema";
import { Platform } from "~/drizzle/types";


export async function updatePlatformOnDB(fd: FormData) {
    const obj: { [key: string]: string; } = {};
    fd.forEach((val, key) => {
        if (typeof val != "string")
            throw new ServerError('Invalid Format', { status: 400 })
        obj[key] = val;
    })
    const {platformId, ...d} = obj;
    if (platformId) {
        await db.update(platform).set(d).where(eq(platform.platformId, platformId))
        return platformId
    }
    else {
        const rows = await db.insert(platform).values(d as Platform).returning({platformId: platform.platformId})
        return rows[0]
    }
}