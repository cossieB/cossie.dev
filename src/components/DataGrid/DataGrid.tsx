import { For, useContext } from "solid-js"
import styles from "./DataGrid.module.scss"
import { TableHeader } from "./TableHeader"
import { AdminContext } from "./StoreProvider"
import { TableData } from "./TableData"
import type { StoreCtx, Header } from "./types"

type Props<T extends Object> = {
    data: T[]
}

export function DataGrid<T extends Object>(props: Props<T>) {
    const {state} = useContext<StoreCtx<T> | undefined>(AdminContext)!
    return (
        <table
            class={styles.grid}
            style={{ '--colCount': state.colCount() }}
        >
            <thead>
                <tr>
                    <For each={state.columns}>
                        {item => <TableHeader item={item} />}
                    </For>
                </tr>
            </thead>
            <tbody>
                <TableData data={props.data} />
            </tbody>
        </table>
    )
}