import { onCleanup, onMount } from "solid-js";
import { Outlet } from "solid-start";
import AdminNav from "~/components/admin/AdminNav";


export default function Layout() {
    onMount(() => {
        document.body.style.overflow = 'hidden'
    })
    onCleanup(() => {
        document.body.style.overflow = 'unset'
    })
    return (
        <div class="container">
            <AdminNav />
            <Outlet />
        </div>
    )
}