import { eq } from "drizzle-orm";
import { Suspense } from "solid-js";
import ErrorBoundary, { type RouteDataArgs, useRouteData } from "solid-start";
import { ServerError, createServerData$ } from "solid-start/server";
import ActorForm from "~/components/admin/actors/ActorForm";
import Loader from "~/components/shared/Loader/Loader";
import Page from "~/components/shared/Page";
import { db } from "~/db";
import { actor, actorsInGames, game } from "~/drizzle/schema";
import NotFound from "~/routes/[...404]";
import {routeData as parentRouteData} from "../../admin"

export function routeData(args: RouteDataArgs) {
    const serverData = createServerData$(async ([_, actorId]) => {
        try {
            const cq = db.select({
                importance: actorsInGames.importance,
                character: actorsInGames.character,
                gameTitle: game.title,
                gameId: game.gameId
            })
                .from(actorsInGames)
                .innerJoin(game, eq(game.gameId, actorsInGames.gameId))
                .where(eq(actorsInGames.actorId, actorId))
                .orderBy(fields => fields.gameTitle)
                
            const aq = db.select()
                .from(actor)
                .where(eq(actor.actorId, actorId))
                .limit(1)

            const [characters, result] = await Promise.all([cq, aq])
            if (result.length == 0)
                throw new ServerError("Not Found", { status: 404 })
            return {...result[0], characters}
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
        key: () => ['actors', args.params.actorId]
    })
    return {actor: serverData, parentData: args.data as ReturnType<typeof parentRouteData>}
}

export default function DeveloperPage() {
    const data = useRouteData<typeof routeData>();

    return (
        <ErrorBoundary fallback={(e) => e.status == 404 ? <NotFound /> : <p> Something went wrong. Please try again later </p>}>
            <Suspense fallback={<Loader />}>
                <Page title={data.actor.latest?.name ?? "Actor"}>
                    <ActorForm data={data.actor.latest} games={data.parentData.games.latest!} />
                </Page>
            </Suspense>
        </ErrorBoundary>
    )
}