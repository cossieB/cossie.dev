import { JSXElement, createContext, onCleanup, onMount } from "solid-js";
import { Outlet, useRouteData } from "solid-start";
import AdminNav from "~/components/admin/AdminNav";
import styles from './admin.module.scss'
import { createServerData$ } from "solid-start/server";
import { db } from "~/db";

export function routeData() {
    const developers = createServerData$(async () => db.query.developer.findMany(), {
        key: 'developers'
    } )
    const publishers = createServerData$(async () => db.query.publisher.findMany(), {
        key: 'publishers'
    } )
    const platforms = createServerData$(async () => db.query.platform.findMany(), {
        key: 'platforms'
    } )
    return {developers, publishers, platforms}
}

export default function Layout() {
    onMount(() => {
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