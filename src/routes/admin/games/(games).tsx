import { type Resource, Suspense, Show, createSignal } from "solid-js";
import { useRouteData } from "solid-start";
import { db } from "~/db";
import { developer, game, publisher } from "~/drizzle/schema";
import styles from "../admin.module.scss"
import { eq } from "drizzle-orm"
import { createServerData$ } from "solid-start/server";
import { createSolidTable, type ColumnDef, type SortingState, getSortedRowModel, getPaginationRowModel } from "@tanstack/solid-table";
import { getCoreRowModel } from "@tanstack/solid-table";
import { Table } from "../../../components/Table";

export function routeData() {
    return createServerData$(async () => db
        .select()
        .from(game)
        .innerJoin(developer, eq(game.developerId, developer.developerId))
        .innerJoin(publisher, eq(game.publisherId, publisher.publisherId))
    )
}

type UnwrapResource<T> = T extends Resource<infer x | undefined> ? x : never
type X = NonNullable<UnwrapResource<ReturnType<typeof routeData>>>

export default function GamesAdminPage() {
    const data = useRouteData<typeof routeData>()
    const [sorting, setSorting] = createSignal<SortingState>([])

    const defaultColumns: ColumnDef<X[number]>[] = [{
        accessorFn: props => props.Game.gameId,
        header: 'gameId',
        enableSorting: false,
    },{
        accessorFn: props => props.Game.title,
        header: 'Title'
    }, {
        accessorFn: props => props.Developer.name,
        header: 'Developer'
    },{
        accessorFn: props => props.Publisher.name,
        header: 'Publisher'
    },{
        accessorFn: props => props.Game.releaseDate,
        header: 'Release Date',
        cell: info => new Date(info.getValue() as string).toLocaleDateString('en-za', {day: '2-digit', month: 'long', year: 'numeric'})
    } ]
    const table = createSolidTable({
        get data() {
            return data() ?? []
        },
        state: {
            get sorting() {
                return sorting()
            },
            pagination: {
                pageIndex: 0,
                pageSize: 10
            }
        },
        columns: defaultColumns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })
    return (
        <main class={styles.main}>
            <Suspense fallback={<span>loading...</span>}>
                <Show when={data()}>
                    <Table table={table} sorting={sorting}/>
                </Show>
            </Suspense>
        </main>
    )
}

