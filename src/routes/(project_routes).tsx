import { Outlet } from "solid-start";
import Navigator from "~/components/Navigator/Navigator";

export default function ProjectLayout() {
    return (
        <>
            <Navigator />
            <Outlet />
        </>
    )
}