import { type JSXElement, type Resource, createContext, createEffect, onCleanup, onMount, Show } from "solid-js";
import { Outlet, createRouteAction, useIsRouting, useRouteData } from "solid-start";
import AdminNav from "~/components/admin/AdminNav";
import styles from './admin.module.scss'
import { createServerData$ } from "solid-start/server";
import { db } from "~/db";
import { authenticate } from "~/utils/authenticate";
import type { SessionData } from "solid-start/session/sessions";

export function routeData() {
    const developers = createServerData$(async () => db.query.developer.findMany({
        orderBy: (fields) => fields.name
    }), {
        key: () => ['developers'],
        initialValue: []
    })
    const publishers = createServerData$(async () => db.query.publisher.findMany({
        orderBy: (fields) => fields.name
    }), {
        key: () => ['publishers'],
        initialValue: []
    })
    const platforms = createServerData$(async () => db.query.platform.findMany({
        orderBy: (fields) => fields.name
    }), {
        key: () => ['platforms'],
        initialValue: []
    })
    const games = createServerData$(async () => db.query.game.findMany({
        orderBy: (fields) => fields.title
    }), {
        key: () => ['games'],
        initialValue: [],
    })
    const actors = createServerData$(async () => db.query.actor.findMany({
        orderBy: (fields) => fields.name
    }), {
        key: () => ['actors'],
        initialValue: []
    })
    const user = createServerData$(async (_, { request }) => authenticate(request), {
        key: () => ['auth'],
        initialValue: null
    })
    return { developers, publishers, platforms, user, games, actors }
}

export type ParentRouteData = ReturnType<typeof routeData>

export default function Layout() {
    const isNavigating = useIsRouting()
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
                    <Show when={isNavigating()}>
                        <div role="navigation" id={styles.navIndicator} />
                    </Show>
                    <Outlet />
                </section>
            </div>
        </AdminContextProvider>
    )
}

type NewType = {
    user: Resource<SessionData | null | undefined>;
};

export const AdminContext = createContext<NewType>()

function AdminContextProvider(props: { children: JSXElement }) {
    const data = useRouteData<typeof routeData>();
    createEffect(() => {
        window.localStorage.setItem('test', data.user()?.username)
    })
    return (
        <AdminContext.Provider
            value={{
                user: data.user,
            }}>
            {props.children}
        </AdminContext.Provider>
    )
}