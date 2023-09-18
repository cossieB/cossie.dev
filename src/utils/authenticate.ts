import { ServerError } from "solid-start";
import { createCookieSessionStorage } from "solid-start/session";

export const storage = createCookieSessionStorage({
    cookie: {
        secure: process.env.NODE_ENV === "production",
        secrets: [process.env.SESSION_SECRET!],
        sameSite: "strict",
        path: "/",
        httpOnly: true
    }
})
export async function authenticate(request: Request) {
    const cookie = request.headers.get('cookie');
    const session = await storage.getSession(cookie);
    if (!session.get('username'))
        return null
    return session.data
}

export async function authenticateOrThrowUnauthorized(request: Request) {
    const user = await authenticate(request) 
    if (!user)
        throw new ServerError('Unauthorized', {status: 401})
    return user
}