import { action, affects, createMemo, refresh } from "solid-js";
import { authClient } from "~/utils/authClient";

export const user = createMemo(async () => {
    const sesh = await authClient.getSession();
    if (!sesh.data) return null;
    return sesh.data.user
}, {ssrSource: "client"})

export const refreshSession = action(function* (){
    affects(user)
    refresh(user)
})

export const logout = action(function* () {
    affects(user)
    yield authClient.signOut()
    refresh(user)
})