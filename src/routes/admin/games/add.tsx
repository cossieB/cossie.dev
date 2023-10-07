import { useRouteData, type RouteDataArgs } from "solid-start";
import { createServerData$ } from "solid-start/server";
import GameForm from "~/components/admin/game/GameForm";
import Page from "~/components/shared/Page";
import { db } from "~/db";

export function routeData({ data }: RouteDataArgs) {
    const developers = createServerData$(async () => db.query.developer.findMany(), {
        initialValue: [],
        key: () => ['developers']
    })
    const publishers = createServerData$(async () => db.query.publisher.findMany(), {
        initialValue: [],
        key: () => ['publishers']
    })
    const platforms = createServerData$(async () => db.query.platform.findMany(), {
        initialValue: [],
        key: () => ['platforms']
    })
    return {developers, publishers, platforms}
}

export default function AddGamePage() {
    const data = useRouteData<typeof routeData>()
    return (
        <Page title="Add Game">
            <GameForm
                parentData={{
                    publishers: data.publishers.latest ?? [],
                    developers: data.developers.latest ?? [],
                    platforms: data.platforms.latest ?? [],
                }}
            />
        </Page>
    )
}