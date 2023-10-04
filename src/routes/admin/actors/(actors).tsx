import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { type Resource } from "solid-js";
import { useRouteData } from "solid-start";
import { createServerData$ } from "solid-start/server";
import { db } from "~/db";
import { actor } from "~/drizzle/schema";
import AdminLink from "~/components/Datagrid/AdminLink";
import { AdminTable } from "~/components/admin/AdminTable";
import Page from "~/components/shared/Page";

export function routeData() {
    return createServerData$(async () => db
        .select()
        .from(actor)
    )
}

const columnDefs: Cols[] = [{
    field: 'name'
}, {
    headerName: '',
    sortable: false,
    cellRenderer: (params: ICellRendererParams<X[number]>) => <AdminLink {...params} category="actors" param={params.data?.actorId ?? ""} />,
}]

type UnwrapResource<T> = T extends Resource<infer x | undefined> ? x : never
type X = NonNullable<UnwrapResource<ReturnType<typeof routeData>>>

type Cols = ColDef<X[number]>

export default function ActorsAdminPage() {
    const data = useRouteData<typeof routeData>()
    return (
        <Page title="Actors">
            <AdminTable
                columnDefs={columnDefs}
                data={data.latest}
            />
        </Page>
    )
}