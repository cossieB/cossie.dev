import { type RouteDataArgs, useRouteData } from "solid-start";
import { createServerData$ } from "solid-start/server";
import ActorForm from "~/components/admin/actors/ActorForm";
import Page from "~/components/shared/Page";
import { db } from "~/db";

export function routeData({ data }: RouteDataArgs) {
    return createServerData$(async () => db.query.game.findMany({
        orderBy: fields => fields.title
    }), {
        initialValue: [],
        key: 'games'
    })
}

export default function AddActorPage() {
    const data = useRouteData<typeof routeData>()
    return (
        <Page title="Add Actor">
            <ActorForm
                games={data.latest ?? []}
            />
        </Page>
    )
}