import { action, affects, createOptimistic, createSignal, isPending, refresh, Show } from "solid-js";
import styles from "./LinkList.module.css"
import { deleteShortLink, getShortenedLinks } from "../api";
import { BarChart3Icon, ChartSplineIcon, CopyIcon, TrashIcon } from "@lucide/solid";
import env from "virtual:env/client";
import { user } from "~/features/auth/api";
import { links } from "./LinkList";
import { ConfirmDialog } from "~/components/Popover/Confirm";
import { Portal } from "@solidjs/web";
import AnalyticsDashboard from "./Analytics";

type Prop = {
    link: Awaited<ReturnType<typeof getShortenedLinks>>[number];
};

export function LinkRow(props: Prop) {
    let dialog!: HTMLDialogElement
    const [isDeleting, setIsDeleting] = createOptimistic(false)
    const shortLink = () => `${env.VITE_APP_URL}/s/${props.link.shortCode}`
    const del = action(function* () {
        affects(links)
        setIsDeleting(true)
        yield deleteShortLink(props.link.linkId)
        refresh(links)
    })

    const [showAnalytics, setShowAnalytics] = createSignal(false)

    return (
        <tr
            class={{[styles.temp]: props.link.linkId < 0 || isDeleting()}}
        >
            <td>
                <div class={styles.linkInfo}>
                    <a preload={"false"} target="_blank" prop:rel={"noopener"} href={shortLink()} class={styles.shortCode}>{shortLink()}</a>
                    <span class={styles.longUrl} title={props.link.longUrl}>{props.link.longUrl}</span>
                </div>
            </td>
            <td>
                <span class={[styles.badge, styles[props.link.category]]}>
                    {props.link.category}
                </span>
            </td>
            <td>
                <div class={styles.clickCount}>
                    <BarChart3Icon size="0.75rem" />
                    {props.link.clickCount}
                </div>
            </td>
            <td>{Intl.DateTimeFormat("default", { year: "numeric", month: "short", day: "2-digit" }).format(props.link.createdAt)}</td>
            <td>
                <div class={styles.actions}>
                    <button
                        class={styles.actionBtn}
                        title="Copy Link"
                        disabled={isPending(() => links)}
                        onClick={() => {
                            navigator.clipboard.writeText(shortLink())
                        }}
                    >
                        <CopyIcon />
                    </button>
                    <button
                        class={styles.actionBtn}
                        title="View Analytics"
                        disabled={isPending(() => links)}
                        onClick={() => setShowAnalytics(true)}
                    >
                        <ChartSplineIcon />
                    </button>
                    <button
                        class={[styles.actionBtn, styles.dangerBtn]}
                        title="Delete Link"
                        onClick={() => dialog.showModal()}
                        disabled={
                            props.link.userId !== user()?.id ||
                            isPending(() => links)
                        }
                    >
                        <TrashIcon />
                    </button>
                </div>
            </td>
            <ConfirmDialog
                ref={dialog}
                prop:closedBy={"any"}
                headline="Delete this link?"
                onConfirm={del}
            />
            <Show when={showAnalytics()}>
                <Portal>
                    <AnalyticsDashboard linkId={props.link.linkId} close={() => setShowAnalytics(false)} />
                </Portal>
            </Show>
        </tr>
    )
}
