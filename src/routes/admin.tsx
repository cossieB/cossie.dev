import { type JSXElement, onCleanup, onMount, Show } from "solid-js";
import AdminNav from "~/components/admin/AdminNav";
import styles from './admin.module.scss'
import { RouteSectionProps, useIsRouting } from "@solidjs/router";

export default function Layout(props: RouteSectionProps) {
    const isNavigating = useIsRouting()

    onMount(() => {
        document.body.style.background = "black";
        // window.addEventListener('storage', onAuthChange)
        onCleanup(() => {
            document.body.removeAttribute("style")
            // window.removeEventListener('storage', onAuthChange)
        })
    })
    return (
        <div class={styles.container}>
            <AdminNav />
            <section class={styles.main}>
                <Show when={isNavigating()}>
                    <div role="progressbar" id={styles.navIndicator} />
                </Show>
                {props.children}
            </section>
        </div>
    )
}
