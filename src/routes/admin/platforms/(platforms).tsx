import type { ICellRendererParams, ColDef } from "ag-grid-community"
import type { Resource } from "solid-js"
import { useRouteData } from "solid-start"
import { createServerData$ } from "solid-start/server"
import AdminLink from "~/components/Datagrid/AdminLink"
import { AdminTable } from "~/components/admin/AdminTable"
import Page from "~/components/shared/Page"
import { db } from "~/db"
import { platform } from "~/drizzle/schema"

export function routeData() {
    return createServerData$(async () => db
        .select()
        .from(platform)
    )
}

const columnDefs: Cols[] = [{
    field: 'name'
}, {
    field: 'release'
}, {
    headerName: '',
    sortable: false,
    cellRenderer: (params: ICellRendererParams<X[number]>) => <AdminLink {...params} category="platforms" param={params.data?.platformId ?? ""} />,
}]

type UnwrapResource<T> = T extends Resource<infer x | undefined> ? x : never
type X = NonNullable<UnwrapResource<ReturnType<typeof routeData>>>

type Cols = ColDef<X[number]>

export default function PublishersAdminPage() {
    const data = useRouteData<typeof routeData>()
    return (
        <Page title="Platforms">
            <AdminTable
                columnDefs={columnDefs}
                data={data}
            />
        </Page>
    )
}