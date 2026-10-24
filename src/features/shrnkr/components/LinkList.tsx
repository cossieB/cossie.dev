import { createMemo, createStore, For, isPending, Loading } from "solid-js";
import titleCase from "~/lib/titleCase";
import styles from "./LinkList.module.css"
import { getShortenedLinks, LINKS_PER_PAGE } from "../api";
import { LinkCategory } from "../services/schema";
import { BarChart3Icon, ChartSplineIcon, CircleChevronLeftIcon, CircleChevronRightIcon, CopyIcon, Trash, TrashIcon } from "@lucide/solid";
import env from "virtual:env/client";
import { user } from "~/features/auth/api";

const [filters, setFilters] = createStore({
    ownedLinksOnly: false,
    category: undefined as LinkCategory | undefined,
    page: 0
})
const links = createMemo(() => getShortenedLinks({
    ownedLinksOnly: filters.ownedLinksOnly,
    category: filters.category,
    page: filters.page
}), {
    ssrSource: "client"
})
export function LinkList() {
    return (
        <div class={styles.links}>
            <header>
                <h2>Recent Short Links</h2>
                <div class={styles.toggles}>

                    <label class={styles.switchLabel}>Only show your links</label>
                    <label style={{ "margin-bottom": 0 }} class={styles.switch}>
                        <input
                            disabled={!user()}
                            onChange={e => {
                                setFilters(s => {
                                    s.ownedLinksOnly = e.currentTarget.checked
                                })
                            }}
                            type="checkbox"
                        />
                        <span class={styles.slider}></span>
                    </label>
                    <select onChange={e => {
                        const val = e.currentTarget.value
                        setFilters(s => {
                            s.category = val === "all-categories" ? undefined : val as LinkCategory
                        })

                    }}>
                        <For each={["all-categories", "general", "marketing", "personal", "work", "social-media"]}>
                            {opt => <option value={opt}> {titleCase(opt)} </option>}
                        </For>
                    </select>
                </div>
            </header>
            <div class={styles.tableContainer}>
                <table class={styles.table}>
                    <thead>
                        <tr>
                            <th>Link</th>
                            <th>Category</th>
                            <th>Clicks</th>
                            <th>Created</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody
                        class={{ [styles.refetching]: isPending(links) }}
                    >
                        <Loading>
                            <For each={links().slice(0, LINKS_PER_PAGE)}>
                                {link => <LinkRow link={link} />}
                            </For>
                        </Loading>
                    </tbody>
                </table>
                <div class={styles.pageBtns}>
                    <button
                        disabled={filters.page == 0}
                        onClick={() => {
                            setFilters(s => {
                                s.page--
                            })
                        }}
                    >
                        Prev Page <CircleChevronLeftIcon />
                    </button>
                    <button
                        disabled={links().length <= LINKS_PER_PAGE}
                        onClick={() => {
                            setFilters(s => {
                                s.page++
                            })
                        }}
                    >
                        <CircleChevronRightIcon /> Next Page
                    </button>
                </div>
            </div>
        </div>
    )
}


type Prop = {
    link: Awaited<ReturnType<typeof getShortenedLinks>>[number];
};

function LinkRow(props: Prop) {
    const shortLink = () => `${env.VITE_APP_URL}/s/${props.link.shortCode}`
    return (
        <tr>
            <td>
                <div class={styles.linkInfo}>
                    <a href={shortLink()} class={styles.shortCode}>{shortLink()}</a>
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
                        disabled={isPending(links)}
                        onClick={() => {
                            navigator.clipboard.writeText(shortLink())
                        }}
                    >
                        <CopyIcon />
                    </button>
                    <button
                        class={styles.actionBtn}
                        title="View Analytics"
                        disabled={isPending(links)}
                    >
                        <ChartSplineIcon />
                    </button>
                    <button
                        class={[styles.actionBtn, styles.dangerBtn]}
                        title="Delete Link"
                        disabled={
                            props.link.userId !== user()?.id ||
                            isPending(links)
                        }
                    >
                        <TrashIcon />
                    </button>
                </div>
            </td>
        </tr>
    )
}