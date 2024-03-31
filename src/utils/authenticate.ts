import { getRequestEvent } from "solid-js/web";
// import { useSession } from "@solidjs/start/server";

export async function authenticate() {
    // const event = getRequestEvent()
    // if (!event) throw new Error("Something went wrong")

    // const session = await useSession(event, {
    //     password: process.env.SESSION_SECRET!
    //   });
    // const user = session.data.username;
    // if (!user)
    //     return null
    // return user as string
}

export async function authenticateOrThrowUnauthorized(request: Request) {
    // const user = await authenticate(request)
    // if (!user)
    //     throw new ServerError('Unauthorized', { status: 401 })
    // return user
}