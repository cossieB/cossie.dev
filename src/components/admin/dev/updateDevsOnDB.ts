import { eq } from "drizzle-orm";
import {json} from '@solidjs/router'
import { db } from "~/db";
import { developer } from "~/drizzle/schema";
import type { Developer } from "~/drizzle/types";
import { authenticateOrThrowUnauthorized } from "~/utils/authenticate";
import { getDevelopers, getDeveloper } from "~/data/admin/developer";

type Metadata = {
    isNewDev: boolean;
}

export async function updateDevOnDB(body: Developer, metadata: Metadata) {
    'use server'
    await authenticateOrThrowUnauthorized();
    
    if (!metadata.isNewDev) {
        await db.update(developer).set(body).where(eq(developer.developerId, body.developerId))
        return json(`Successfully edited developer, ${body.name}, with ID ${body.developerId}`, {
            revalidate: [getDevelopers.key, getDeveloper.keyFor(body.developerId)]
        })
    }
    else {
        await db.insert(developer).values(body)
        return json(`Successfully added developer, ${body.name}, with ID ${body.developerId}`, {
            revalidate: [getDevelopers.key, getDeveloper.keyFor(body.developerId)]
        })
    }
}