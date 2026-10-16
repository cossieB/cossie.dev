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
    if (props.filters.size === 0) return false;

    const filters = [...props.filters];
    return !quotes.some(quote =>
        quote.tags.has(props.tag) &&
        filters.every(filter => quote.tags.has(filter))
    );
});
    return (
        <span
            class={[styles.tag, {
                [styles.inActive]: !isActive(),
                [styles.filtered]: isFiltered(),
                [styles.disabled]: isDisabled()
            }]}
            style={{ '--clr': props.color() }}
            onClick={() => {
                if (!isDisabled())
                    props.toggleFilter(props.tag)
            }}
        >
            {props.tag}
        </span>
    );
}
