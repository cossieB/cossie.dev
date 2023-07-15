import { createColumnHelper, createSolidTable, type TableOptions } from "@tanstack/solid-table";
import { eq } from "drizzle-orm";
import type { Resource } from "solid-js";
import { createServerData$ } from "solid-start/server";
import { db } from "~/db";
import { game, developer, publisher } from "~/drizzle/schema";

export function routeData() {
    return createServerData$(async () => db
        .select()
        .from(developer)
    )
}

type UnwrapResource<T> = T extends Resource<infer x | undefined> ? x : never
type X = NonNullable<UnwrapResource<ReturnType<typeof routeData>>>
const columnHelper = createColumnHelper<X[number]>()

const defaultColumns = [
    columnHelper.accessor('name', {
        header: () => <span>Name</span>,
        footer: props => props.column.id
    }),
    columnHelper.accessor('')
]

const options: TableOptions<X[number]> = {
    columns: [{
        accessorKey: 'name'
    }, {
        accessorKey: 'country'
    }, {
        accessorKey: 'location'
    }, {
        accessorKey: 'summary'
    }, {
        accessorKey: 'logo'
    }, {
        accessorKey: 'developerId'
    }],

}

export default function DevelopersAdminPage() {
    const table = createSolidTable(options)
    return (
        <div>

        </div>
    )
}