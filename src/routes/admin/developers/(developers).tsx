import { ColDef, ICellRendererParams } from "ag-grid-community";
import { type Resource } from "solid-js";
import { useRouteData } from "solid-start";
import { createServerData$ } from "solid-start/server";
import { db } from "~/db";
import { developer } from "~/drizzle/schema";
import AdminLink from "~/components/Datagrid/AdminLink";
import { AdminTable } from "~/components/admin/AdminTable";

export function routeData() {
    return createServerData$(async () => db
        .select()
        .from(developer)
    )
}

const columnDefs: Cols[] = [{
    field: 'name'
}, {
    field: 'location'
}, {
    field: 'country',
    filter: true
}, {
    headerName: '',
    sortable: false,
    cellRenderer: (params: ICellRendererParams<X[number]>) => <AdminLink {...params} category="developers" param={params.data?.developerId ?? ""} />,
}]

type UnwrapResource<T> = T extends Resource<infer x | undefined> ? x : never
type X = NonNullable<UnwrapResource<ReturnType<typeof routeData>>>

type Cols = ColDef<X[number]>

export default function DevelopersAdminPage() {
    const data = useRouteData<typeof routeData>()
    return (
        <AdminTable
            columnDefs={columnDefs}
            data={data}
        />
    )
}