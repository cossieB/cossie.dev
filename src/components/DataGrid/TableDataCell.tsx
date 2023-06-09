import { For, Show, useContext } from "solid-js";
import styles from "./DataGrid.module.scss";
import { AdminContext } from "./StoreProvider";
import { type Header } from "./types";
import { formatDate } from "~/lib/formatDate";
import { type FormCtx, FormContext } from "~/components/admin/FormProvider";

type P<T extends Object> = {
    rowData: T;
};
export function TableRow<T extends Object>(props: P<T>) {
    const { state } = useContext(AdminContext)!;
    const {setSelected, selected} = useContext<FormCtx<T> | undefined>(FormContext)!
    function handleClick() {
        if (selected() == props.rowData)
            setSelected(null)
        else
            setSelected(() => props.rowData )
    }
    return (
        <tr 
        onclick={handleClick}
        classList={{[styles.active]: selected() === props.rowData}}
        >
            <For each={(state.columns as Header<T>[])}>
                {column =>
                    <TableDataCell
                        item={props.rowData}
                        property={column.property}
                    />}
                {/* // <td class={`${styles.td} ${styles.tc}`}>
                    //     <Show when={typeof props.rowData[column.property] == 'string'} fallback={props.rowData[column.property]?.toString()}>
                    //         {props.rowData[column.property] as string}
                    //     </Show>
                    // </td>} */}
            </For>
        </tr>
    );
}

type Props<T extends Object> = {
    item: T
    property: keyof T
}

function TableDataCell<T extends Object>(props: Props<T>) {
    const value = props.item[props.property]
    let displayValue: string | number | string[]
    if (typeof value == 'string' || typeof value == 'number' || value instanceof Array)
        displayValue = value
    else if (value instanceof Date)
        displayValue = formatDate(value)
    else if (value instanceof Object)
        displayValue = Object.values(value)
    else
        displayValue = ""

    return (
        <td class={`${styles.td} ${styles.tc}`}>
            <Show
                when={displayValue instanceof Array}
                fallback={displayValue}
            >
                <For each={displayValue as string[]}>
                    {x =>
                        <>
                            {x}<br />
                        </>}
                </For>
            </Show>
        </td>
    )
}