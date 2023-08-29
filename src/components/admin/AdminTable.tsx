import { type Resource, Suspense, Show } from "solid-js";
import { ColDef, ColGroupDef } from "ag-grid-community";
import GridTable from "~/components/Datagrid/GridTable";
import styles from "~/routes/admin.module.scss";

type Props<T> = {
    data: Resource<T[] | undefined>;
    columnDefs: (ColDef<any, any> | ColGroupDef<any>)[] | null | undefined;
};
export function AdminTable<T>(props: Props<T>) {
    return (
        <main class={`${styles.main} ag-theme-alpine-dark`} style={{ width: '100%', height: '100vh' }}>
            <Suspense fallback={<span>loading...</span>}>
                <Show when={props.data()}>
                    <GridTable
                        data={props.data()}
                        columnDefs={props.columnDefs} />
                </Show>
            </Suspense>
        </main>
    );
}
