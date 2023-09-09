import { eq } from "drizzle-orm";
import { ServerError, ServerFunctionEvent } from "solid-start";
import { db } from "~/db";
import { publisher } from "~/drizzle/schema";
import { Publisher } from "~/drizzle/types";
import { authenticate } from "~/utils/authenticate";

export async function updatePubOnDB(fd: FormData, event: ServerFunctionEvent) {
    const user = await authenticate(event.request);
    if (!user || user != process.env.ADMIN_USERNAME)
        throw new ServerError('Unauthorized', {status: 401})
    const obj: { [key: string]: string; } = {};
    fd.forEach((val, key) => {
        if (typeof val != "string")
            throw new ServerError('Invalid Format', { status: 400 })
        obj[key] = val;
    })
    const {publisherId, ...d} = obj;
    if (publisherId) {
        await db.update(publisher).set(d).where(eq(publisher.publisherId, publisherId))
        return publisherId
    }
    else {
        const rows = await db.insert(publisher).values(d as Publisher).returning({publisherId: publisher.publisherId})
        return rows[0]
    }
}