import { ParentProps } from "solid-js";
import styles from "./Popover.module.css"

type NewType = {
    id?: string
    ref?: HTMLDivElement | ((ref: HTMLDivElement) => void);
    popover?: "auto" | "manual" | "hint"
};

export function Popover(props: ParentProps<NewType>) {
    return (
        <div
            ref={props.ref}
            class={styles.popover}
            popover={props.popover ?? "auto"}
            id={props.id ?? "autoPopover"}
        >
            {props.children}
        </div>
    )
}
