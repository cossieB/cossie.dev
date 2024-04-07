import { eq } from "drizzle-orm";
import { db } from "~/db";
import { platform } from "~/drizzle/schema";
import { type Platform } from "~/drizzle/types";
import { authenticateOrThrowUnauthorized } from "~/utils/authenticate";

type Metadata = {
    isNewPlatform: boolean;
}

export async function updatePlatformOnDB(body: Platform, metadata: Metadata) {
    'use server'
    await authenticateOrThrowUnauthorized();

    if (!metadata.isNewPlatform) {
        await db.update(platform).set(body).where(eq(platform.platformId, body.platformId))
        return `Successfully edited platform, ${body.name}, with ID ${body.platformId}`
    }
    else {
        await db.insert(platform).values(body).returning({platformId: platform.platformId})
        return `Successfully added platform, ${body.name}, with ID ${body.platformId}`
    }
}