import { getRequestEvent } from "solid-js/web";
import { getUser } from "~/routes/data";
import {json } from "@solidjs/router"

export async function authenticateOrThrowUnauthorized() {
    const user = await getUser();
    if (!user) throw new Error("Unauthorized")
}