import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { type Resource } from "solid-js";
import { db } from "~/db";
import AdminLink from "~/components/Datagrid/AdminLink";
import { AdminTable } from "~/components/admin/AdminTable";
import Page from "~/components/shared/Page";
import { cache, createAsync } from "@solidjs/router";

const getActors = cache(async () => {
    'use server'
    return db.query.actor.findMany()
}, 'actors')

export const route = {
    load: () => getActors()
}

const columnDefs: Cols[] = [{
    field: 'name'
}, {
    headerName: '',
    sortable: false,
    cellRenderer: (params: ICellRendererParams<X[number]>) => <AdminLink {...params} category="actors" param={params.data?.actorId ?? ""} />,
}]

type X = Awaited<ReturnType<typeof getActors>>
type Cols = ColDef<X[number]>

export default function ActorsAdminPage() {
    const data = createAsync(() => getActors())
    return (
        <Page title="Actors">
            <AdminTable
                columnDefs={columnDefs}
                data={data()}
            />
        </Page>
    )
}