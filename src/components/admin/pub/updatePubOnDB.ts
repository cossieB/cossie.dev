import { eq } from "drizzle-orm";
import {json} from '@solidjs/router'
import { db } from "~/db";
import { publisher } from "~/drizzle/schema";
import type { Publisher } from "~/drizzle/types";
import { authenticateOrThrowUnauthorized } from "~/utils/authenticate";
import { getPublishers, getPublisher } from "~/data/admin/publisher";

type Metadata = {
    isNewPub: boolean;
}

export async function updatePubOnDB(body: Publisher, metadata: Metadata) {
    'use server'
    await authenticateOrThrowUnauthorized();
    
    if (!metadata.isNewPub) {
        await db.update(publisher).set(body).where(eq(publisher.publisherId, body.publisherId))
        return json(`Successfully edited publisher, ${body.name}, with ID ${body.publisherId}`, {
            revalidate: [getPublishers.key, getPublisher.keyFor(body.publisherId)]
        })
    }
    else {
        await db.insert(publisher).values(body)
        return json(`Successfully added publisher, ${body.name}, with ID ${body.publisherId}`, {
            revalidate: [getPublishers.key, getPublisher.keyFor(body.publisherId)]
        })
    }
}