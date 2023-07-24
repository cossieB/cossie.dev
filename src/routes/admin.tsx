import { onCleanup, onMount } from "solid-js";
import { Outlet } from "solid-start";
import AdminNav from "~/components/admin/AdminNav";
import styles from './admin.module.scss'

export default function Layout() {
    onMount(() => {
        document.body.style.overflow = 'hidden'
    })
    onCleanup(() => {
        document.body.style.overflow = 'unset'
    })
    return (
        <div class={styles.container}>
            <AdminNav />
            <Outlet />
        </div>
    )
}