import { Show, onCleanup, onMount } from "solid-js";
import type { ColDef, ColGroupDef } from "ag-grid-community";
import GridTable from "~/components/Datagrid/GridTable";

type Props<T> = {
    data: T[] | undefined
    columnDefs: (ColDef<any, any> | ColGroupDef<any>)[] | null | undefined;
};
export function AdminTable<T>(props: Props<T>) {
    'use client'
    onMount(() => {
        document.body.style.overflow = "hidden"
        onCleanup(() => {
            document.body.style.overflow = 'auto'
        })
    })
    return (
        <main class={`ag-theme-alpine-dark`} style={{ width: '100%', height: '100vh' }}>
            {/* <Suspense fallback={<span>loading...</span>}> */}
                <Show when={props.data}>
                    <GridTable
                        data={props.data}
                        columnDefs={props.columnDefs} />
                </Show>
            {/* </Suspense> */}
        </main>
    );
}
