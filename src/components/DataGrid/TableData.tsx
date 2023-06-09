import { For, createMemo, useContext } from "solid-js";
import { AdminContext } from "./StoreProvider";
import { TableRow } from "./TableDataCell";
import { type StoreCtx } from "./types";

type Prop<T extends Object> = {
    data: T[];
};
export function TableData<T extends Object>(props: Prop<T>) {
    const { state } = useContext<StoreCtx<T> | undefined>(AdminContext)!;
    function filterFunc(dataPoint: T) {
        return state.filters
        .every(filter => {
            const rgx = new RegExp(filter.value, 'i')
            return rgx.test(dataPoint[filter.property] as string)
        })
    }
    const data = createMemo(() => {
        if (state.sort === null)
            return props.data.filter(filterFunc);
        return props.data
            .filter(filterFunc)
            .sort((a, b) => {
                if (a[state.sort!] < b[state.sort!])
                    return -1 * state.sortDir;
                else
                    return 1 * state.sortDir;
            });
    });
    return (
        <For each={data()}>
            {item => <TableRow rowData={item} />}
        </For>
    );
}
