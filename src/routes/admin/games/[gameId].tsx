import { useRouteData } from "@solidjs/router";
import { sql, eq } from "drizzle-orm";
import { Suspense, createEffect } from "solid-js";
import { type RouteDataArgs } from "solid-start";
import { ServerError, createServerData$ } from "solid-start/server";
import GameForm from "~/components/admin/game/GameForm";
import { db } from "~/db";
import { genresOfGames, game } from "~/drizzle/schema";
import styles from "../../admin.module.scss"
import { unwrap } from "solid-js/store";

export function routeData({ params }: RouteDataArgs) {
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
                .leftJoin(subQuery, eq(game.gameId, subQuery.gameId))
                .where(eq(game.gameId, gameId))

            if (result.length == 0)
                throw new ServerError("Not Found", { status: 404 })
            return { ...result[0].Game, tags: result[0].t?.tags ?? [] }
        }
        catch (error: any) {
            if (error instanceof ServerError)
                throw error
            if (error.message.includes("invalid input syntax for type uuid"))
                throw new ServerError("Not Found", { status: 404 })
            else {
                console.log(error)
                throw new ServerError("Internal Server Error", { status: 500 })
            }
        }
    }, {
        key: () => ['games', params.gameId]
    })
}

export default function AdminGameId() {
    const data = useRouteData<typeof routeData>()

    return (
        // <ErrorBoundary fallback={(e) => e.status == 404 ? <NotFound /> : <p> Something went wrong. Please try again later </p>}>
            <main class={`${styles.main} ${styles.formContainer}`}>
                <Suspense fallback={<p>Loading...</p>}>
                    <GameForm
                        data={data()}
                    />
                </Suspense>
            </main>
        // </ErrorBoundary> 
    )
}
