import { eq } from "drizzle-orm";
import { ServerError } from "solid-start";
import { db } from "~/db";
import { developer } from "~/drizzle/schema";
import { Developer } from "~/drizzle/types";

export async function updateDevOnDB(fd: FormData) {
    const obj: { [key: string]: string; } = {};
    fd.forEach((val, key) => {
        if (typeof val != "string")
            throw new ServerError('Invalid Format', { status: 400 })
        obj[key] = val;
    });console.log(obj)
    const {developerId, ...d} = obj;
    if (developerId) {
        await db.update(developer).set(d).where(eq(developer.developerId, developerId))
        return developerId
    }
    else {
        const rows = await db.insert(developer).values(d as Developer).returning({developerId: developer.developerId})
        return rows[0]
    }
}