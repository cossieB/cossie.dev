import { For, createEffect, createSignal } from "solid-js";
import { quotes as quotesList, Quote as QuoteType } from "./quotelist";
import styles from "./quotes.module.scss"
import { createStore } from "solid-js/store";
import { setDifference } from "~/lib/setDifference";
import { Quote } from "./Quote";
import { ReactiveSet } from "@solid-primitives/set";
import { getUniqueTags, colors } from "./utils";
import { Tag } from "./Tag";
import { useImage } from "./useImage";
import { useResize } from "./useResize";

export default function QuotesMain() {
    const tags = getUniqueTags();
    const [filteredQuotes, setFilteredQuotes] = createSignal(quotesList)
    const bgs = useImage()
    const windowWidth = useResize()

    createEffect(() => {
        if (state.filters.size == 0) {
            setFilteredQuotes(quotesList)
            return next()
        }
        const arr: QuoteType[] = []
        outer: for (const qt of quotesList) {
            for (const tg of state.filters) {
                if (!qt.tags.has(tg)) {
                    continue outer;
                }
            }
            arr.push(qt);
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
        otherTags: () => Array.from(setDifference(tags, state.quote().tags)),
        filters: new ReactiveSet<string>()
    })

    function toggleFilter(filter: string) {
        if (state.filters.has(filter))
            state.filters.delete(filter)
        else
            state.filters.add(filter)
    }

    function next() {
        setState({
            bgIndex: Math.floor(Math.random() * bgs.length),
            colorIndex: Math.floor(Math.random() * colors.length),
            index: Math.floor(Math.random() * filteredQuotes().length),
        })
    }
    return (
            <main
                style={{ background: windowWidth() > 768 ? `url(${state.bgImg().src})` : state.color() }}
                id={styles.quoteContainer}
                class="container"
            >
                <div>
                    <Quote quote={state.quote} color={state.color} next={next} />
                    <div class={`${styles.quoteTags} ${styles.tags}`} >
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
                </div>
            </main>
    )
}
