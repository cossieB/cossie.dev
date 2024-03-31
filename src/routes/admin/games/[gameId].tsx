import { cache, createAsync, useParams } from "@solidjs/router";
import { sql, eq } from "drizzle-orm";
import { ErrorBoundary } from "solid-js";
import GameForm from "~/components/admin/game/GameForm";
import Page from "~/components/shared/Page";
import { db } from "~/db";
import { genresOfGames, game, gamesOnPlatforms, platform } from "~/drizzle/schema";
import NotFound from "~/routes/[...404]";

const getGame = cache(async (gameId: string) => {
    'use server'
    const genreQuery = db.$with('t').as(db.select({
        gameId: genresOfGames.gameId,
        tags: sql<string[]>`array_agg(genre)`.as('tags')
    })
        .from(genresOfGames)
        .where(eq(genresOfGames.gameId, gameId))
        .groupBy(genresOfGames.gameId)
    )
    const platformQuery = db.$with('v').as(db.select({
        gameId: gamesOnPlatforms.gameId,
        platforms: sql<string[]>`array_agg("GamesOnPlatforms"."platformId")`.as('platforms')
    })
        .from(gamesOnPlatforms)
        .innerJoin(platform, eq(gamesOnPlatforms.platformId, platform.platformId))
        .where(eq(gamesOnPlatforms.gameId, gameId))
        .groupBy(gamesOnPlatforms.gameId)
    )
    const result = await db
        .with(genreQuery, platformQuery)
        .select()
        .from(game)
        .leftJoin(genreQuery, eq(game.gameId, genreQuery.gameId))
        .leftJoin(platformQuery, eq(game.gameId, platformQuery.gameId))
        .where(eq(game.gameId, gameId))

    // if (result.length == 0)
    //     throw new ServerError("Not Found", { status: 404 })
    return { ...result[0].Game, tags: result[0].t?.tags ?? [], platforms: result[0].v?.platforms ?? [] }

    // const developers = createServerData$(async () => db.query.developer.findMany(), {
    //     initialValue: [],
    //     key: () => ['developers']
    // })
    // const publishers = createServerData$(async () => db.query.publisher.findMany(), {
    //     initialValue: [],
    //     key: () => ['publishers']
    // })
    // const platforms = createServerData$(async () => db.query.platform.findMany(), {
    //     initialValue: [],
    //     key: () => ['platforms']
    // })
    // return { game: serverData, developers, publishers, platforms }
}, `game`)

export default function AdminGameId() {
    const params = useParams()
    const data = createAsync(() => getGame(params.gameId));
    return (
        <ErrorBoundary fallback={(e) => e.status == 404 ? <NotFound /> : <p> Something went wrong. Please try again later </p>}>
            {/* <Suspense fallback={<Loader />}> */}
            <Page title={data()?.title ?? "Game"}>
                <GameForm
                    data={data()}
                    parentData={{
                        publishers: [],
                        developers: [],
                        platforms: [],
                    }}
                />
            </Page>
            {/* </Suspense> */}
        </ErrorBoundary>
    )
}
