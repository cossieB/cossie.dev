import { getUser } from "~/data/admin";

export async function authenticateOrThrowUnauthorized() {
    const user = await getUser();
    if (!user) throw new Error("Unauthorized")
}