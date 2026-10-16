import { For, Show, createEffect, createSignal } from "solid-js";
import { quotes as quotesList, type Quote as QuoteType } from "./quotelist";
import styles from "./quotes.module.css"
import { createStore } from "solid-js";
import { Quote } from "./Quote";
import { ReactiveSet } from "@solid-primitives/set";
import { getUniqueTags, colors } from "./utils";
import { Tag } from "./Tag";
import { useImage } from "./useImage";
import { useResize } from "../../hooks/useResize";

export default function QuotesMain() {
    const tags = getUniqueTags();
    const [filteredQuotes, setFilteredQuotes] = createSignal(quotesList)
    const bgs = useImage()
    const windowWidth = useResize()

    createEffect(
        () => state.filters,
        (filters) => {
        if (state.filters.size == 0) {
            setFilteredQuotes(quotesList)
            return next()
        }
        const arr: QuoteType[] = []
        outer: for (const quote of quotesList) {
            for (const filter of state.filters) {
                if (!quote.tags.has(filter)) {
                    continue outer;
                }
            }
            arr.push(quote);
        }
        setFilteredQuotes(arr)
        return next()
    })
    const [state, setState] = createStore({
        bgIndex: Math.floor(0),
        bgImg: () => bgs[state.bgIndex],
        colorIndex: Math.floor(0),
        color: () => colors[state.colorIndex],
        index: 0,
        quote: () => filteredQuotes()[state.index],
        quoteTags: () => Array.from(state.quote().tags),
        otherTags: () => Array.from(tags.difference(state.quote().tags)),
        filters: new ReactiveSet<string>(),
        showFilters: false
    })

    function toggleFilter(filter: string) {
        if (state.filters.has(filter))
            state.filters.delete(filter)
        else
            state.filters.add(filter)
    }

    function next() {
        setState(s => {
            s.bgIndex = Math.floor(Math.random() * bgs.length),
            s.colorIndex = Math.floor(Math.random() * colors.length)
            s.index = Math.floor(Math.random() * filteredQuotes().length)
        })
    }
    return (
        <main
            style={{ background: windowWidth() > 768 ? `url(${state.bgImg().src})` : state.color() }}
            id={styles.quoteContainer}
            class={{[styles.hasFilter]: state.filters.size > 0}}
        >
            <Quote quote={state.quote} color={state.color} next={next} toggleFilters={() => setState(s => { s.showFilters = !s.showFilters })} />
            <div class={[`${styles.tags}`, {[styles.show]: state.showFilters}]} >
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
        </main>
    )
}
