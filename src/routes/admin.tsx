import { InitializedResource, JSXElement, createContext, createResource, onCleanup, onMount } from "solid-js";
import { Outlet, useRouteData } from "solid-start";
import AdminNav from "~/components/admin/AdminNav";
import styles from './admin.module.scss'
import server$, { createServerData$ } from "solid-start/server";
import { db } from "~/db";
import { sleep } from "~/lib/sleep";
import { Developer, Publisher } from "~/drizzle/types";

export function routeData() {
    const developers = createServerData$(async () => { await sleep(5000); return db.query.developer.findMany() })
    const publishers = createServerData$(async () => db.query.publisher.findMany() )
    return {developers, publishers}
}

export default function Layout() {
    
    onMount(() => {
        document.body.style.overflow = 'hidden'
        document.body.style.background = "black"
        onCleanup(() => {
            document.body.removeAttribute("style")
        })
    })
    return (
        <AdminContextProvider>
            <div class={styles.container}>
                <AdminNav />
                <Outlet />
            </div>
        </AdminContextProvider>
    )
}

export const AdminContext = createContext<ReturnType<typeof routeData>> ()

function AdminContextProvider(props: { children: JSXElement }) {
    const data = useRouteData<typeof routeData>()
    return (
        <AdminContext.Provider value={data}>
            {props.children}
        </AdminContext.Provider>
    )
}