import { query } from "@solidjs/router";
import { getSession } from "~/utils/getSession";

export const getUser = query(async () => {
    'use server';
    const session = await getSession();
    if (!session.data.user) return null;
    return session.data.user as { username: string; };
}, "user");