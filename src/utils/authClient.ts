import { createAuthClient } from "better-auth/client";
import { anonymousClient, inferAdditionalFields } from "better-auth/client/plugins";
import { auth } from "./auth";

export const authClient = createAuthClient({
    plugins: [
        anonymousClient(),
        inferAdditionalFields<typeof auth>() 
    ]
})

export type User = typeof authClient.$Infer.Session.user