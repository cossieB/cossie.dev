import { Show, useContext } from "solid-js";
import { AdminLi } from "./AdminNavLink";
import styles from "./nav.module.scss";
import { AdminContext } from "~/routes/admin";
import { A } from "@solidjs/router";
import { createServerAction$ } from "solid-start/server";
import { storage } from "~/utils/authenticate";

export default function AdminNav() {
    const { user } = useContext(AdminContext)!

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
                <li>
                    <Show when={user()} fallback={
                        <A href="/admin/login">
                            <span>Login</span>
                            <span class={styles.lockIcon}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-unlock-fill" viewBox="0 0 16 16">
                                    <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2z" />
                                </svg>
                            </span>
                        </A>
                    } >
                        <span style={{ 'align-self': 'center' }}> {user()!.username} </span>
                        <LogoutBtn />
                    </Show>
                </li>
            </ul>
        </nav>
    )
}

function LogoutBtn() {
    const [submitting, logout] = createServerAction$(async (_, event) => {
        const cookie = event.request.headers.get("Cookie");
        const session = await storage.getSession(cookie);
        return new Response(null, {
            headers: {
                'Set-Cookie': await storage.destroySession(session)
            }
        })
    }, {
        invalidate: 'auth'
    })
    return (
        <button
            class={styles.lockIcon}
            disabled={submitting.pending}
            onclick={() => logout()}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lock-fill" viewBox="0 0 16 16">
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
            </svg>
        </button>
    )
}
