import { type Resource } from "solid-js";
import { useRouteData } from "solid-start";
import { db } from "~/db";
import { developer, game, gamesOnPlatforms, genresOfGames, platform, publisher } from "~/drizzle/schema";
import { eq, sql } from "drizzle-orm"
import { createServerData$ } from "solid-start/server";
import { ColDef, ICellEditorParams, ICellRendererParams } from "ag-grid-community";
import 'ag-grid-community/styles/ag-grid.css'; // grid core CSS
import "ag-grid-community/styles/ag-theme-alpine.css"; // optional theme
import DataEditor from "~/components/Datagrid/DataEditor";
import AdminLink from "~/components/Datagrid/AdminLink";
import { AdminTable } from "../../../components/admin/AdminTable";
import Page from "~/components/shared/Page";

export function routeData() {
    return createServerData$(async () => {
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
    })
}

type UnwrapResource<T> = T extends Resource<infer x | undefined> ? x : never
type X = NonNullable<UnwrapResource<ReturnType<typeof routeData>>>

type Cols = ColDef<X[number]>

export const columnDefs: Cols[] = [{
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
    const data = useRouteData<typeof routeData>()
    return (
        <Page title="Games">
            <AdminTable data={data} columnDefs={columnDefs} />
        </Page>
    )
}

