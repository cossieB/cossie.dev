import { type JSXElement, onCleanup, onMount, Show } from "solid-js";
import AdminNav from "~/components/admin/AdminNav";
import styles from './admin.module.scss'
import { action, useIsRouting } from "@solidjs/router";

export default function Layout(props: { children: JSXElement }) {
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
