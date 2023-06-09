import { For, useContext } from "solid-js"
import { StoreCtx, Header } from "./types"
import styles from "./DataGrid.module.scss"
import { AdminContext } from "./StoreProvider"
import titleCase from "~/lib/titleCase"

export default function Settings() {
    return (
        <Columns />
    )
}

function Columns<T extends Object>() {
    const { state } = useContext<StoreCtx<T> | undefined>(AdminContext)!;
    return (
        <ul class={styles.ul}>
            <For each={state.headers}>
                {item => <Checks item={item} />}
            </For>
        </ul>
    )
}

type P1<T extends Object> = {
    item: Header<T>
}

function Checks<T extends Object>(props: P1<T>) {
    const { state, setState } = useContext<StoreCtx<T> | undefined>(AdminContext)!;
    const isSelected = () => state.columns.some(col => col.property == props.item.property)
    return (
        <li>
            <div
                class={styles.check}
                classList={{ [styles.selected]: isSelected() }}
                role="checkbox"
                aria-selected={isSelected()}
                onclick={() => setState('headers', state.headers.findIndex(x => x.property == props.item.property), 'isSelected', p => !p)}
            />
            {titleCase(props.item.property)}
        </li>
    )
}