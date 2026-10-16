import { For, Show, createEffect, createMemo, createProjection, createSignal } from "solid-js";
import { quotes as quotesList, type Quote as QuoteType } from "./quotelist";
import styles from "./quotes.module.css"
import { createStore } from "solid-js";
import { Quote } from "./Quote";
import { ReactiveSet } from "@solid-primitives/set";
import { getUniqueTags, colors } from "./utils";
import { Tag } from "./Tag";
import { useImage } from "./useImage";
import { useResize } from "../../hooks/useResize";
import shuffleArray from "~/lib/shuffleArray";

export default function QuotesMain() {
    const tags = getUniqueTags();
    const bgs = useImage()
    const windowWidth = useResize()
    const [indices, setIdices] = createStore({
        bgIndex: 0,
        index: 0,
        colorIndex: 0,
    })

    const [state, setState] = createStore({
        bgImg: () => bgs[indices.bgIndex],
        color: () => colors[indices.colorIndex],
        quote: () => filteredQuotes()[indices.index],
        quoteTags: () => Array.from(state.quote().tags),
        otherTags: () => Array.from(tags.difference(state.quote().tags)),
        filters: new ReactiveSet<string>(),
        showFilters: false,
    })

    const filteredQuotes = createMemo(() => {
        const filtered = shuffleArray(quotesList).filter(quote => {
            for (const filter of state.filters) {
                if (!quote.tags.has(filter)) return false
            }
            return true
        })
        return filtered
    })


    function toggleFilter(filter: string) {
        if (state.filters.has(filter))
            state.filters.delete(filter)
        else
            state.filters.add(filter)
        setIdices(s => {
            s.index = 0
        })
    }

    function next() {
        setIdices(s => {
            s.bgIndex = Math.floor(Math.random() * bgs.length)
            s.colorIndex = Math.floor(Math.random() * colors.length)
            s.index = Math.floor(Math.random() * filteredQuotes().length)
        })
    }
    return (
        <main
            style={{ background: windowWidth() > 768 ? `url(${state.bgImg().src})` : state.color() }}
            id={styles.quoteContainer}
            class={{ [styles.hasFilter]: state.filters.size > 0 }}
        >

            <Quote quote={state.quote()} color={state.color} next={next} toggleFilters={() => setState(s => { s.showFilters = !s.showFilters })} />
            <Show when={state.showFilters}>
                <div class={[`${styles.tags}`, { [styles.show]: state.showFilters }]} >
                    <For each={state.quoteTags()}>
                        {tag => <Tag
                            tag={tag}
                            activeTags={state.quote().tags}
                            color={state.color}
                            toggleFilter={toggleFilter}
                            filters={state.filters}
                        />}
                    </For>
                    <For each={state.otherTags()}>
                        {tag => <Tag
                            tag={tag}
                            activeTags={state.quote().tags}
                            color={state.color}
                            toggleFilter={toggleFilter}
                            filters={state.filters}
                        />}
                    </For>
                </div>
            </Show>
        </main>
    )
}
