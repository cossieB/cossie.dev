import { db } from "~/db";
import { developer, game, gamesOnPlatforms, genresOfGames, platform, publisher } from "~/drizzle/schema";
import { eq, sql } from "drizzle-orm"
import type { ColDef, ICellEditorParams, ICellRendererParams } from "ag-grid-community";
import DataEditor from "~/components/Datagrid/DataEditor";
import { AdminTable } from "~/components/admin/AdminTable";
import Page from "~/components/shared/Page";
import { RouteDefinition, cache, createAsyncStore } from "@solidjs/router";
import { clientOnly } from "@solidjs/start";
const AdminLink = clientOnly(() => import("~/components/Datagrid/AdminLink"))

const getGames = cache(async () => {
    'use server';
    const genreQuery = db.$with('t').as(db.select({
        gameId: genresOfGames.gameId,
        tags: sql<string[]>`array_agg(genre)`.as('tags')
    })
        .from(genresOfGames)
        .groupBy(genresOfGames.gameId)
    )
    const platformQuery = db.$with('v').as(db.select({
        gameId: gamesOnPlatforms.gameId,
        platforms: sql<string[]>`array_agg(name)`.as('platforms')
    })
        .from(gamesOnPlatforms)
        .innerJoin(platform, eq(gamesOnPlatforms.platformId, platform.platformId))
        .groupBy(gamesOnPlatforms.gameId)
    )
    return await db
        .with(genreQuery, platformQuery)
        .select()
        .from(game)
        .innerJoin(developer, eq(game.developerId, developer.developerId))
        .innerJoin(publisher, eq(game.publisherId, publisher.publisherId))
        .leftJoin(genreQuery, eq(game.gameId, genreQuery.gameId))
        .leftJoin(platformQuery, eq(game.gameId, platformQuery.gameId))
}, 'gamesWithPubDev')

export const route = {
    // load: () => getGames(),
} satisfies RouteDefinition

type X = Awaited<ReturnType<typeof getGames>>

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
    valueFormatter: (val) => val.data?.t?.tags.join("; ") ?? "",
    filter: true,
    sortable: false
}, {
    headerName: "Platforms",
    field: 'v.platforms',
    valueFormatter: (val) => val.data?.v?.platforms.join("; ") ?? "",
    filter: true,
    sortable: false
}, {
    headerName: '',
    sortable: false,
    cellRenderer: (params: ICellRendererParams<X[number]>) => <AdminLink {...params} category="games" param={params.data?.Game.gameId ?? ""} />,
},]

export default function GamesAdminPage() {
    const data = createAsyncStore(() => getGames())
    return (
        <Page title="Games">
            <AdminTable data={data()} columnDefs={columnDefs} />
        </Page>
    )
}

