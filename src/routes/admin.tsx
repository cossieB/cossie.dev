import { Outlet } from "solid-start";
import AdminNav from "~/components/admin/AdminNav";


export default function Layout() {
    return (
        <div class="container">
            <AdminNav />
            <Outlet />
        </div>
    )
}