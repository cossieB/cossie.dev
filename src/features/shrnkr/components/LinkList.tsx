import { createMemo, createOptimisticStore, createStore, For, isPending, Loading } from "solid-js";
import titleCase from "~/lib/titleCase";
import styles from "./LinkList.module.css"
import { getShortenedLinks } from "../api";
import { LinkCategory } from "../services/schema";
import { CircleChevronLeftIcon, CircleChevronRightIcon } from "@lucide/solid";
import { user } from "~/features/auth/api";
import { LinkRow } from "./LinkRow";
import { LINKS_PER_PAGE } from "../services/linkService";

const [filters, setFilters] = createStore({
    ownedLinksOnly: false,
    category: undefined as LinkCategory | undefined,
    page: 0
})
export const [links, setLinks] = createOptimisticStore(() => getShortenedLinks({
    ownedLinksOnly: filters.ownedLinksOnly,
    category: filters.category,
    page: filters.page
}), [], {
    ssrSource: "client",
    key: link => link.linkId
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
            <Loading>

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
                            class={{ [styles.refetching]: isPending(() => links) }}
                        >

                            <For each={links.slice(0, 3)}>
                                {link => <LinkRow link={link} />}
                            </For>

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
                            disabled={links.length <= LINKS_PER_PAGE}
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
            </Loading>
        </div>
    )
}
