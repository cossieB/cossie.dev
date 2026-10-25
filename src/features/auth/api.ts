import { getRequestEvent, respond } from "@solidjs/web";
import { action, affects, createMemo, refresh } from "solid-js";
import { auth } from "~/utils/auth";
import { authClient } from "~/utils/authClient";

export const user = createMemo(async () => {
    const sesh = await authClient.getSession();
    if (!sesh.data) return null;
    return sesh.data.user
}, { ssrSource: "client" })

export const refreshSession = action(function* () {
    affects(user)
    refresh(user)
})

export const logout = action(function* () {
    affects(user)
    yield authClient.signOut()
    refresh(user)
})

export async function getServerSideUser() {
    const headers = getRequestEvent()?.request.headers;
    if (!headers) {
        return respond(new Error("Something went wrong. Please try again later"), { status: 500 }) as never;
    }

    return await auth.api.getSession({ headers });
}