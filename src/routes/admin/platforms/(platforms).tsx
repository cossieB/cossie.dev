import { cache, createAsync } from "@solidjs/router"
import type { ICellRendererParams, ColDef } from "ag-grid-community"
import type { Resource } from "solid-js"
import AdminLink from "~/components/Datagrid/AdminLink"
import { AdminTable } from "~/components/admin/AdminTable"
import Page from "~/components/shared/Page"
import { db } from "~/db"

const getPlatforms = cache(async () => {
    'use server'
    return db.query.platform.findMany()
}, 'platforms')

export const route = {
    load: () => getPlatforms()
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

type X = Awaited<ReturnType<typeof getPlatforms>>
type Cols = ColDef<X[number]>

export default function PublishersAdminPage() {
    const data = createAsync(() => getPlatforms())
    return (
        <Page title="Platforms">
            <AdminTable
                columnDefs={columnDefs}
                data={data()}
            />
        </Page>
    )
}