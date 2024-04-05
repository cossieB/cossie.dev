import { Show } from "solid-js";
import { AdminLi } from "./AdminNavLink";
import styles from "./nav.module.scss";
import { A, action, createAsync, useAction } from "@solidjs/router";
import { getSession } from "~/utils/getSession";
import { getUser } from "~/routes/data";
import { json } from "@solidjs/router"

export default function AdminNav() {

    return (
        <nav class={styles.nav}>
            <ul>
                <AdminLi href="/admin/games">
                    Games
                </AdminLi>
                <AdminLi href="/admin/developers">
                    Developers
                </AdminLi>
                <AdminLi href="/admin/publishers">
                    Publishers
                </AdminLi>
                <AdminLi href="/admin/platforms">
                    Platforms
                </AdminLi>
                <AdminLi href="/admin/actors">
                    Actors
                </AdminLi>
                <li>
                    <User />
                </li>
            </ul>
        </nav>
    )
}

function User() {
    const user = createAsync(() => getUser());
    return (
        <Show
            when={!!user()}
            fallback={
                <A href="/admin/login">
                    <span>Login</span>
                    <span class={styles.lockIcon}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-unlock-fill" viewBox="0 0 16 16">
                            <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2z" />
                        </svg>
                    </span>
                </A>
            }
        >
            <span style={{ 'align-self': 'center' }}> {user()!.username} </span>
            <LogoutBtn />
        </Show>
    )
}
const logout = action(async () => {
    'use server'
    const session = await getSession()
    await session.clear();
    return json("OK",)
}, 'auth')

function LogoutBtn() {
    const logoutAction = useAction(logout)
    return (
        <button
            class={styles.lockIcon}
            onclick={logoutAction}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lock-fill" viewBox="0 0 16 16">
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
            </svg>
        </button>
    )
}