import { storage } from "../routes/admin/login";

export async function authenticate(event: {request: Request}) {
    const cookie = event.request.headers.get('cookie');
    const session = await storage.getSession(cookie);
    const user = session.data.username;
    return user;
}
