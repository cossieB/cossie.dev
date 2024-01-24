import type { ColDef, GridOptions } from "ag-grid-community"
import type { AgGridSolidRef } from "ag-grid-solid";
import 'ag-grid-community/styles/ag-grid.css'; // grid core CSS
import "ag-grid-community/styles/ag-theme-alpine.css"; // optional theme
import { clientOnly } from "@solidjs/start";

const AgGridSolid = clientOnly(() => import("ag-grid-solid"));

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