import { getRequestEvent, respond } from "@solidjs/web";
import * as v from 'valibot';
import { auth } from "~/utils/auth";
import * as linkService from "./services/linkService";
import { Filter, Input, InputSchema } from "./services/schema";
import { GET } from "@solidjs/web/server-functions";

import { getServerSideUser } from "../auth/api";
import { sleep } from "~/lib/sleep";

export async function createShortUrl(input: Input) {
    'use server';
 
    const headers = getRequestEvent()?.request.headers;
    if (!headers) {
        return respond(new Error("Something went wrong. Please try again later."), { status: 500 });
    }

    const userSession = await auth.api.getSession({ headers });
    if (!userSession) {
        return respond(new Error("Please login first."), { status: 401 });
    }

    const parseResult = v.safeParse(InputSchema, input);
    if (!parseResult.success) {
        const flatErrors = v.flatten<typeof InputSchema>(parseResult.issues);
        return respond(new Error(JSON.stringify(flatErrors.nested)), { status: 400 });
    }
    const data = parseResult.output;

    if (data.customBackHalf && userSession.user.isAnonymous) {
        return respond(new Error("Anonymous users cannot use the custom back-half feature"), { status: 400 });
    }

    try {
        await linkService.checkUserLinkLimit(userSession.user.id, userSession.user.isAnonymous!);
        const longUrl = await linkService.processAndValidateUrl(data.url, data);
        const inserted = await linkService.saveShortLink({
            longUrl,
            userId: userSession.user.id,
            data
        });

        return inserted;
    }
    catch (error) {
        if (error instanceof linkService.AppError) {
            return respond(new Error(error.message), { status: error.status });
        }

        console.error(error);
        return respond(new Error("Something went wrong. Please try again later."), { status: 500 });
    }
}



export const getShortenedLinks = GET(async (filter: Filter) => {
    'use server';

    const headers = getRequestEvent()?.request.headers;
    if (!headers) {
        return respond([], { status: 500 });
    }   
    return linkService.getLinks(filter)    
})

export async function deleteShortLink(linkId: number) {
    'use server'

    const userSession = await getServerSideUser()
    if (!userSession) return respond(new Error("Please login first"), {status: 401})  
    return linkService.deleteLink(linkId, userSession.user.id)
}