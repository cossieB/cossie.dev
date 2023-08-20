import { useRouteData } from "@solidjs/router";
import { sql, eq } from "drizzle-orm";
import { Show, Suspense, createEffect, useContext } from "solid-js";
import { RouteDataArgs } from "solid-start";
import { ServerError, createServerData$ } from "solid-start/server";
import GameForm from "~/components/admin/game/GameForm";
import { db } from "~/db";
import { genresOfGames, game } from "~/drizzle/schema";
import styles from "../../admin.module.scss"
import { createStore } from "solid-js/store";
import { AdminContext } from "~/routes/admin";

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
                .innerJoin(subQuery, eq(game.gameId, subQuery.gameId))
                .where(eq(game.gameId, gameId))

            if (result.length == 0)
                throw new ServerError("Not Found", { status: 404 })
            return { ...result[0].Game, tags: result[0].t.tags }
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

// async function fetcher(gameId: string) {
//     try {
//         const subQuery = db
//             .$with('t')
//             .as(db.select({
//                 gameId: genresOfGames.gameId,
//                 tags: sql<string[]>`array_agg(genre)`.as('tags')
//             })
//                 .from(genresOfGames)
//                 .where(eq(genresOfGames.gameId, gameId))
//                 .groupBy(genresOfGames.gameId)
//             )
//         const result = await db
//             .with(subQuery)
//             .select()
//             .from(game)
//             .innerJoin(developer, eq(game.developerId, developer.developerId))
//             .innerJoin(publisher, eq(game.publisherId, publisher.publisherId))
//             .innerJoin(subQuery, eq(game.gameId, subQuery.gameId))
//             .where(eq(game.gameId, gameId))

//         if (result.length == 0)
//             throw new ServerError("Not Found", { status: 404 })

//         return result[0]
//     }
//     catch (error: any) {
//         if (error instanceof ServerError)
//             throw error
//         if (error.message.includes("invalid input syntax for type uuid"))
//             throw new ServerError("Not Found", { status: 404 })
//         else {
//             console.log(error)
//             throw new ServerError("Internal Server Error", { status: 500 })
//         }
//     }
// }

type Props = {
    
}

export default function AdminGameId() {
    const data = useRouteData<typeof routeData>()
    const t = useContext(AdminContext); console.log(t?.developers())
    const [game, setGame] = createStore(data() ?? {
        tags: [],
        gameId: "",
        summary: "",
        title: "",
        cover: "",
        developerId: "",
        publisherId: "",
        releaseDate: "",
        images: [],
        banner: "",
        trailer: "",
    })
    createEffect(() => {
        if (data())
            setGame(data()!)
    })
    // const params = useParams()
    // const fetch = server$(async (gameId: string) => fetcher(gameId))
    // const [data, { mutate }] = createResource(() => fetch(params.gameId))
    // const [cover, setCover] = createSignal(data()?.Game.cover)
    // const [banner, setBanner] = createSignal(data()?.Game.banner)
    // createEffect(() => {
    //     setCover(data()?.Game.cover)
    //     setBanner(data()?.Game.banner)
    // })
    return (
        // <ErrorBoundary fallback={(e) => e.status == 404 ? <NotFound /> : <p> Something went wrong. Please try again later </p>}>

        <main class={`${styles.main} ${styles.formContainer}`}>
            <Suspense fallback={<p>Loading...</p>}>
                    <GameForm
                        data={data()}
                        game={game}
                        setGame={setGame}
                        developers={t?.developers.latest ?? []}
                        publishers={t?.publishers.latest ?? []}

                    // mutate={mutate}
                    // setCover={setCover}
                    // setBanner={setBanner}
                    // cover={cover}
                    // banner={banner}
                    />
                    {/* <Prevs
                        // cover={cover}
                        // banner={banner}
                        data={data}
                    /> */}
            </Suspense>
        </main>
        // </ErrorBoundary>
    )
}

function Prevs(props) {
    console.log(props.data())
    return (
        <div class={styles.preview}>
            <div class={styles.mainImgs}>
                <img src={props.data().Game.cover} alt={`${props.data().Game.title} cover`} />
                <img src={props.data().Game.banner} alt={`${props.data().Game.title} banner`} />
            </div>
            <div innerHTML={props.data().Game.summary} />
            <div innerHTML={props.data().Game.trailer} />
        </div>
    )
}