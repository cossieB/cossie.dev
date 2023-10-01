import { type JSXElement, type Resource, createContext, createEffect, onCleanup, onMount } from "solid-js";
import { Outlet, createRouteAction, useRouteData } from "solid-start";
import AdminNav from "~/components/admin/AdminNav";
import styles from './admin.module.scss'
import { createServerData$ } from "solid-start/server";
import { db } from "~/db";
import { authenticate } from "~/utils/authenticate";
import type { Developer, Platform, Publisher } from "~/drizzle/types";
import type { SessionData } from "solid-start/session/sessions";

export function routeData() {
    const developers = createServerData$(async () => db.query.developer.findMany(), {
        key: 'developers'
    })
    const publishers = createServerData$(async () => db.query.publisher.findMany(), {
        key: 'publishers'
    })
    const platforms = createServerData$(async () => db.query.platform.findMany(), {
        key: 'platforms'
    })
    const user = createServerData$(async (_, { request }) => authenticate(request), {
        key: 'auth'
    })
    return { developers, publishers, platforms, user }
}

export default function Layout() {
    // sync auth states across tabs
    const [, auth] = createRouteAction(async () => { }, { invalidate: 'auth' })
    function onAuthChange() {
        auth()
    }
    onMount(() => {
        document.body.style.background = "black";
        window.addEventListener('storage', onAuthChange)
        onCleanup(() => {
            document.body.removeAttribute("style")
            window.removeEventListener('storage', onAuthChange)
        })
    })
    return (
        <AdminContextProvider>
            <div class={styles.container}>
                <AdminNav />
                <section class={styles.main}>
                    <Outlet />
                </section>
            </div>
        </AdminContextProvider>
    )
}

export const AdminContext = createContext<{ developers: Developer[], platforms: Platform[], publishers: Publisher[], user: Resource<SessionData | null | undefined> }>()

function AdminContextProvider(props: { children: JSXElement }) {
    const data = useRouteData<typeof routeData>();
    createEffect(() => {
        window.localStorage.setItem('test', data.user()?.username)
    })
    return (
        <AdminContext.Provider
            value={{
                developers: data.developers() ?? [],
                publishers: data.publishers() ?? [],
                platforms: data.platforms() ?? [],
                user: data.user
            }}>
            {props.children}
        </AdminContext.Provider>
    )
}