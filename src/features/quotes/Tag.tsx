import { type Accessor, createMemo } from "solid-js";
import styles from "./quotes.module.css";
import { ReactiveSet } from "@solid-primitives/set";
import { quotes } from "./quotelist";

type Props = {
    tag: string;
    activeTags: Set<string>;
    color: Accessor<string>;
    toggleFilter(x: string): void;
    filters: ReactiveSet<string>;
};
export function Tag(props: Props) {
    const isActive = () => props.activeTags.has(props.tag);
    const isFiltered = () => props.filters.has(props.tag);
    const isDisabled = createMemo(() => {
        if (props.filters.size == 0) return false;
        outer:
        for (const quote of quotes) {
            if (!quote.tags.has(props.tag)) continue;
            let counter = 0;
            for (const filter of props.filters) {
                if (quote.tags.has(filter)) {
                    counter++;
                    if (counter == props.filters.size) return false
                }
                else {
                    continue outer;
                }
            }
        }
        return true;
    })
    return (
        <span
            class={styles.tag}
            classList={{
                [styles.inActive]: !isActive(),
                [styles.filtered]: isFiltered(),
                [styles.disabled]: isDisabled()
            }}
            style={{ '--clr': props.color() }}
            onclick={() => {
                if (!isDisabled())
                    props.toggleFilter(props.tag)
            }}
        >
            {props.tag}
        </span>
    );
}
