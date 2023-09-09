import { createSessionStorage } from "solid-start/session";
import MongoConnection from "~/mongo/mongo";

const mongo = new MongoConnection

export const storage = createSessionStorage({
    async createData(data, expires) {
        const now = new Date();
        now.setMinutes(now.getMinutes() + 1);
        return mongo.addSession(data, expires ?? now)
    },
    async deleteData(id) {
        return mongo.deleteSession(id)
    },
    async readData(id) {
        return await mongo.getSession(id)
    },
    async updateData(id, data, expires) {
        const now = new Date();
        now.setMinutes(now.getMinutes() + 15);
        return mongo.updateSession(id, data, expires ?? now)
    },
});
export async function authenticate(request: Request) {
    const cookie = request.headers.get('cookie');
    const session = await storage.getSession(cookie);
    return session.data.username as string | undefined;
}
