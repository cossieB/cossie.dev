import { type Resource, Suspense, Show, createSignal, createEffect } from "solid-js";
import { unstable_clientOnly, useRouteData } from "solid-start";
import { db } from "~/db";
import { developer, game, publisher } from "~/drizzle/schema";
import styles from "../admin.module.scss"
import { eq } from "drizzle-orm"
import { createServerData$ } from "solid-start/server";
import { type SortingState, type PaginationState } from "@tanstack/solid-table";
import { ColDef, GridOptions, ICellEditor, ICellEditorParams } from "ag-grid-community";
import 'ag-grid-community/styles/ag-grid.css'; // grid core CSS
import "ag-grid-community/styles/ag-theme-alpine.css"; // optional theme
import { AgGridSolidRef } from "ag-grid-solid";
import { ChangeEvent } from "~/lib/solidTypes";

const AgGridSolid = unstable_clientOnly(() => import("ag-grid-solid"));
export function routeData() {
    return createServerData$(async () => db
        .select()
        .from(game)
        .innerJoin(developer, eq(game.developerId, developer.developerId))
        .innerJoin(publisher, eq(game.publisherId, publisher.publisherId))
    )
}

type UnwrapResource<T> = T extends Resource<infer x | undefined> ? x : never
type X = NonNullable<UnwrapResource<ReturnType<typeof routeData>>>

type Cols = ColDef<X[number]>

const columnDefaults: Cols = {
    sortable: true
}

const columnDefs: Cols[] = [{
    field: 'Game.title',
    editable: true,
    cellEditor: DataEditor,
}, {
    field: 'Developer.name',
}, {
    field: 'Publisher.name',
}, {
    field: 'Game.releaseDate',
}]

export default function GamesAdminPage() {
    const data = useRouteData<typeof routeData>()
    
    return (
        <main class={`${styles.main} ag-theme-alpine-dark`} style={{ width: '100%', height: '100vh' }}>
            <Suspense fallback={<span>loading...</span>}>
                <Show when={data()}>
                    <GridTable
                        data={data()}
                        columnDefs={columnDefs}
                    />
                </Show>
            </Suspense>
        </main>
    )
}

type P<T = any> = {
    data: GridOptions<T>['rowData']
    columnDefs: GridOptions<T>['columnDefs']
}

function GridTable(props: P) {
    let ref: AgGridSolidRef
    return (
        <AgGridSolid
            rowData={props.data}
            columnDefs={props.columnDefs}
            class="ag-theme-alpine-dark"
            ref={ref!}
            defaultColDef={columnDefaults}
            animateRows
        />
    )
}

function DataEditor(props: ICellEditorParams) {
    let value = props.value
    let inputRef!: HTMLInputElement
    const api: ICellEditor = {
        getValue: () => value,

    }
    console.log(props.ref)
    // props.ref(api)
    const onValueChanged = (event: ChangeEvent<HTMLInputElement>) => {
        console.log("value now is " + value)
        event.target!.value;
    };

    createEffect(() => {
        inputRef.focus();
    });

    return (
        <input
            type="number"
            class="my-editor"
            ref={inputRef}
            value={value}
            onChange={onValueChanged}
        />
    );
}