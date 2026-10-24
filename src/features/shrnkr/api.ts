import { getRequestEvent, respond } from "@solidjs/web";
import * as v from 'valibot';
import { auth } from "~/utils/auth";
import { checkUserLinkLimit, processAndValidateUrl, saveShortLink, LinkCreationError } from "./services/linkService";
import { Input, InputSchema } from "./services/schema";

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
        await checkUserLinkLimit(userSession.user.id, userSession.user.isAnonymous!);
        const longUrl = await processAndValidateUrl(data.url, data);
        const inserted = await saveShortLink({
            longUrl,
            userId: userSession.user.id,
            data
        });

        return inserted;
    }
    catch (error) {
        if (error instanceof LinkCreationError) {
            return respond(new Error(error.message), { status: error.status });
        }

        console.error(error);
        return respond(new Error("Something went wrong. Please try again later."), { status: 500 });
    }
}