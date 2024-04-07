import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { db } from "~/db";
import AdminLink from "~/components/Datagrid/AdminLink";
import { AdminTable } from "~/components/admin/AdminTable";
import Page from "~/components/shared/Page";
import { cache, createAsync } from "@solidjs/router";

const getDevelopers = cache(async () => {
    'use server'
    return db.query.developer.findMany()
}, 'developers')

export const route = {
    load: () => getDevelopers()
}


type X = Awaited<ReturnType<typeof getDevelopers>>

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

type Cols = ColDef<X[number]>

export default function DevelopersAdminPage() {
    const data = createAsync(() => getDevelopers())
    return (
        <Page title="Developers">
            <AdminTable
                columnDefs={columnDefs}
                data={data()}
            />
        </Page>
    )
}