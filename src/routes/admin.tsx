import { type JSXElement, onCleanup, onMount, Show } from "solid-js";
import AdminNav from "~/components/admin/AdminNav";
import styles from './admin.module.scss'
import { db } from "~/db";
import { authenticate } from "~/utils/authenticate";
import { action, cache, useIsRouting } from "@solidjs/router";

export const getDevelopers = cache(async () => {
    'use server'
    return db.query.developer.findMany({
        orderBy: (fields) => fields.name
    })
}, "developers")

export const getPublishers = cache(async () => {
    'use server'
    return db.query.publisher.findMany({
        orderBy: (fields) => fields.name
    })
}, "publishers")

export const getPlatforms = cache(async () => {
    'use server'
    return db.query.platform.findMany({
        orderBy: (fields) => fields.name
    })
}, "platforms")

export const getGames = cache(async () => {
    'use server'
    return db.query.game.findMany({
        orderBy: (fields) => fields.title
    })
}, "games")

export const getActors = cache(async () => {
    'use server'
    return db.query.actor.findMany({
        orderBy: (fields) => fields.name
    })
}, "actors")

export const getUser = cache(async () => {
    'use server'
    return authenticate()
}, "auth")


export default function Layout(props: { children: JSXElement }) {
    const isNavigating = useIsRouting()
    // sync auth states across tabs
    const auth = action(async () => { }, 'auth')
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
      //  <AdminContextProvider>
        <div class={styles.container}>
            <AdminNav />
            <section class={styles.main}>
                <Show when={isNavigating()}>
                    <div role="navigation" id={styles.navIndicator} />
                </Show>
                {props.children}
            </section>
        </div>
      //  </AdminContextProvider> 
    )
}

export type NewType = {
    user: string | null | undefined
};
