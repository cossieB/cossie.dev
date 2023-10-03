import { type JSXElement, type Resource, createContext, createEffect, onCleanup, onMount } from "solid-js";
import { Outlet, createRouteAction, useRouteData } from "solid-start";
import AdminNav from "~/components/admin/AdminNav";
import styles from './admin.module.scss'
import { createServerData$ } from "solid-start/server";
import { db } from "~/db";
import { authenticate } from "~/utils/authenticate";
import type { Actor, Developer, Game, Platform, Publisher } from "~/drizzle/types";
import type { SessionData } from "solid-start/session/sessions";

export function routeData() {
    const developers = createServerData$(async () => db.query.developer.findMany({
        orderBy: (fields) => fields.name
    }), {
        key: 'developers'
    })
    const publishers = createServerData$(async () => db.query.publisher.findMany({
        orderBy: (fields) => fields.name
    }), {
        key: 'publishers'
    })
    const platforms = createServerData$(async () => db.query.platform.findMany({
        orderBy: (fields) => fields.name
    }), {
        key: 'platforms'
    })
    const games = createServerData$(async () => db.query.game.findMany({
        orderBy: (fields) => fields.title
    }), {
        key: 'games'
    })
    const actors = createServerData$(async () => db.query.actor.findMany({
        orderBy: (fields) => fields.name
    }), {
        key: 'actors'
    })
    const user = createServerData$(async (_, { request }) => authenticate(request), {
        key: 'auth'
    })
    return { developers, publishers, platforms, user, games, actors }
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

type NewType = {
    developers: Developer[];
    platforms: Platform[];
    publishers: Publisher[];
    games: Game[];
    actors: Actor[]
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
                developers: data.developers() ?? [],
                publishers: data.publishers() ?? [],
                platforms: data.platforms() ?? [],
                games: data.games() ?? [],
                user: data.user,
                actors: data.actors() ?? []
            }}>
            {props.children}
        </AdminContext.Provider>
    )
}