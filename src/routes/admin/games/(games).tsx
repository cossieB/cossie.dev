import { type Resource, Suspense, Show } from "solid-js";
import { useRouteData } from "solid-start";
import { db } from "~/db";
import { developer, game, genresOfGames, publisher } from "~/drizzle/schema";
import styles from "../admin.module.scss"
import { eq, sql } from "drizzle-orm"
import { createServerData$ } from "solid-start/server";
import { ColDef, ICellEditorParams, ICellRendererParams } from "ag-grid-community";
import 'ag-grid-community/styles/ag-grid.css'; // grid core CSS
import "ag-grid-community/styles/ag-theme-alpine.css"; // optional theme
import DataEditor from "~/components/Datagrid/DataEditor";
import AdminLink from "~/components/Datagrid/AdminLink";
import GridTable from "~/components/Datagrid/GridTable";

export function routeData() {
    return createServerData$(async () => {
        const subQuery = db.$with('t').as(db.select({
            gameId: genresOfGames.gameId,
            tags: sql<string[]>`array_agg(genre)`.as('tags')
        })
            .from(genresOfGames)
            .groupBy(genresOfGames.gameId)
        )
        return await db
            .with(subQuery)
            .select()
            .from(game)
            .innerJoin(developer, eq(game.developerId, developer.developerId))
            .innerJoin(publisher, eq(game.publisherId, publisher.publisherId))
            .innerJoin(subQuery, eq(game.gameId, subQuery.gameId))
    })
}

type UnwrapResource<T> = T extends Resource<infer x | undefined> ? x : never
type X = NonNullable<UnwrapResource<ReturnType<typeof routeData>>>

type Cols = ColDef<X[number]>

const columnDefs: Cols[] = [{
    field: 'Game.title',
    editable: true,
    cellEditor: (params: ICellEditorParams) => <DataEditor {...params} />
}, {
    field: 'Developer.name',
    filter: true
}, {
    field: 'Publisher.name',
    filter: true
}, {
    field: 'Game.releaseDate',
}, {
    headerName: "Genres",
    field: 't.tags',
    valueFormatter: (val) => val.data?.t.tags.join("; ") ?? "",
    filter: true,
    sortable: false
}, {
    headerName: '',
    sortable: false,
    cellRenderer: (params: ICellRendererParams) => <AdminLink {...params} />,
},]

export default function GamesAdminPage() {
    const data = useRouteData<typeof routeData>()
    return (
        <main class={`${styles.main} ag-theme-alpine-dark`} style={{ width: '100%', height: '100vh' }}>
            <Suspense fallback={<span>loading...</span>}>
                <Show when={data()}>
                    <GridTable
                        data={data()}
                        columnDefs={columnDefs}
                    />
                </Show>
            </Suspense>
        </main>
    )
}