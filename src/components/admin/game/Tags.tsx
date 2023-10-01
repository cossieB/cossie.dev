import { For } from "solid-js";
import styles from './Tag.module.scss'

type Props = {
    removeItem: (item: string) => void;
    tags: string[]
}

export function Tags(props: Props) {
    return (
        <ul class={styles.tagList}>
            <For each={props.tags}>
                {tag =>
                    <li class={styles.tag}>
                        <span>
                            {tag}
                        </span>
                        <svg onclick={() => props.removeItem(tag)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                        </svg>
                    </li>}
            </For>
        </ul>
    );
}
