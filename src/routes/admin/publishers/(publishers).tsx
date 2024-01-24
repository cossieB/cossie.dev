import { cache, createAsync } from "@solidjs/router"
import type { ICellRendererParams, ColDef } from "ag-grid-community"
import AdminLink from "~/components/Datagrid/AdminLink"
import { AdminTable } from "~/components/admin/AdminTable"
import Page from "~/components/shared/Page"
import { db } from "~/db"

const getPublishers = cache(async () => {
    'use server'
    return db.query.publisher.findMany()
}, 'publishers')
const columnDefs: Cols[] = [{
    field: 'name'
}, {
    field: 'headquarters'
}, {
    field: 'country',
    filter: true
}, {
    headerName: '',
    sortable: false,
    cellRenderer: (params: ICellRendererParams<X[number]>) => <AdminLink {...params} category="publishers" param={params.data?.publisherId ?? ""} />,
}]

type X = Awaited<ReturnType<typeof getPublishers>>
type Cols = ColDef<X[number]>

export default function PublishersAdminPage() {
    const data = createAsync(getPublishers)
    return (
        <Page title="Publishers">
            <AdminTable
                columnDefs={columnDefs}
                data={data()}
            />
        </Page>
    )
}