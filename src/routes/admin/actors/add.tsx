import { RouteDataArgs, useRouteData } from "solid-start";
import ActorForm from "~/components/admin/actors/ActorForm";
import { ParentRouteData } from "~/routes/admin";

export function routeData({data}: RouteDataArgs) {
    return data as ParentRouteData
}

export default function AddActorPage() {
    const data = useRouteData<typeof routeData>()
    return <ActorForm
        games={data.games() ?? []}
    />
}