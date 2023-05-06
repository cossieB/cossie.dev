import { Accessor } from "solid-js";
import styles from "./quotes.module.scss";
import { ReactiveSet } from "@solid-primitives/set";

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
    return (
        <span
            class={styles.tag}
            classList={{
                [styles.active]: isActive(),
                [styles.filtered]: isFiltered()
            }}
            style={{ '--clr': props.color() }}
            onclick={() => props.toggleFilter(props.tag)}
        >
            {props.tag}
        </span>
    );
}
