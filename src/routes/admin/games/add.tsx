import { useRouteData, type RouteDataArgs } from "solid-start";
import GameForm from "~/components/admin/game/GameForm";
import Page from "~/components/shared/Page";
import { type ParentRouteData } from "~/routes/admin";

export function routeData({ data }: RouteDataArgs) {
    return data as ParentRouteData
}

export default function AddGamePage() {
    const data = useRouteData<typeof routeData>()
    return (
        <Page title="Add Game">
            <GameForm
                parentData={{
                    publishers: data.publishers.latest!,
                    developers: data.developers.latest!,
                    platforms: data.platforms.latest!,
                }}
            />
        </Page>
    )
}