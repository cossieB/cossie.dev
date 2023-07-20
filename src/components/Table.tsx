import { For, Show, type Accessor, createEffect } from "solid-js";
import { flexRender, type Table as SolidTable, type SortingState } from "@tanstack/solid-table";
import styles from './Table.module.scss'
import { unwrap } from "solid-js/store";

type Props = {
    table: SolidTable<any>;
    sorting: Accessor<SortingState>
};
export function Table(props: Props) {
    createEffect(() => {
        console.log(props.table.getState())
    })
    return (
        <>
            <table class={styles.grid}>
                <thead>
                    <For each={props.table.getHeaderGroups()}>
                        {headerGroup => (
                            <tr>
                                <For each={headerGroup.headers}>
                                    {header => (
                                        <th colSpan={header.colSpan}>
                                            <Show when={!header.isPlaceholder}>
                                                <div
                                                    class={header.column.getCanSort() ? 'cursor-pointer select-none' : undefined}
                                                    onClick={header.column.getToggleSortingHandler()}
                                                >
                                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                                    {{
                                                        asc: ' 🔼',
                                                        desc: ' 🔽',
                                                    }[header.column.getIsSorted() as string] ?? null}
                                                </div>
                                            </Show>
                                        </th>
                                    )}
                                </For>
                            </tr>
                        )}
                    </For>
                </thead>
                <tbody>
                    <For each={props.table.getRowModel().rows}>
                        {row => (
                            <tr>
                                <For each={row.getVisibleCells()}>
                                    {cell => (
                                        <td>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </td>
                                    )}
                                </For>
                            </tr>
                        )}
                    </For>
                </tbody>
            </table>
            <div>{props.table.getRowModel().rows.length} Rows</div>
            <div>
                <button>Prev</button>
                <button onclick={props.table.nextPage}>Next</button>
                <button onclick={() => console.log(unwrap(props.table.getPaginationRowModel()))} >PRINT</button>
            </div>
        </>
    );
}
