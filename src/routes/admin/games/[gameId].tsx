import { Params, useRouteData } from "@solidjs/router";
import { sql, eq } from "drizzle-orm";
import { Show, createEffect } from "solid-js";
import { unwrap } from "solid-js/store";
import { ErrorBoundary, RouteDataArgs } from "solid-start";
import { ServerError, createServerData$ } from "solid-start/server";
import GameForm from "~/components/admin/game/GameForm";
import { db } from "~/db";
import { genresOfGames, game, developer, publisher } from "~/drizzle/schema";
import NotFound from "~/routes/[...404]";

export function routeData({ params: { gameId } }: RouteDataArgs) {
    return createServerData$(async ([_, gameId]) => {
        try {
            const subQuery = db.$with('t').as(db.select({
                gameId: genresOfGames.gameId,
                tags: sql<string[]>`array_agg(genre)`.as('tags')
            })
                .from(genresOfGames)
                .where(eq(genresOfGames.gameId, gameId))
                .groupBy(genresOfGames.gameId)
            )
            const result = await db
                .with(subQuery)
                .select()
                .from(game)
                .innerJoin(developer, eq(game.developerId, developer.developerId))
                .innerJoin(publisher, eq(game.publisherId, publisher.publisherId))
                .innerJoin(subQuery, eq(game.gameId, subQuery.gameId))
                .where(eq(game.gameId, gameId))

            if (result.length == 0)
                throw new ServerError("Not Found", { status: 404 })
            return result[0]
        }
        catch (error: any) {
            if (error.message.includes("invalid input syntax for type uuid"))
                throw new ServerError("Not Found", { status: 404 })
            if (error instanceof ServerError)
                throw error
            else
                throw new ServerError("Internal Server Error", { status: 500 })
        }
    }, {
        key: () => ['games', gameId]
    })
}

export default function AdminGameId() {
    const data = useRouteData<typeof routeData>()
    return (
        <ErrorBoundary fallback={(e) => e.status == 404 ? <NotFound /> : <p> Something went wrong. Please try again later </p>}>
            <main>
                <Show when={data()}>
                    <GameForm obj={data()} />
                </Show>
            </main>
        </ErrorBoundary>
    )
}