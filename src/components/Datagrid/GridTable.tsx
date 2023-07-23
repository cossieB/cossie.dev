import { ColDef, GridOptions } from "ag-grid-community"
import { AgGridSolidRef } from "ag-grid-solid"
import { unstable_clientOnly } from "solid-start";
const AgGridSolid = unstable_clientOnly(() => import("ag-grid-solid"));

type P<T = any> = {
    data: GridOptions<T>['rowData']
    columnDefs: GridOptions<T>['columnDefs']
}

const columnDefaults: ColDef = {
    sortable: true
}

export default function GridTable(props: P) {
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