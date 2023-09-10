import { ServerError } from "solid-start";
import { createCookieSessionStorage, createSessionStorage } from "solid-start/session";
import MongoConnection from "~/mongo/mongo";

const mongo = new MongoConnection

export const storage = createCookieSessionStorage({
    cookie: {
        secure: process.env.NODE_ENV === "production",
        secrets: [process.env.SESSION_SECRET!],
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 15, // 30 days
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