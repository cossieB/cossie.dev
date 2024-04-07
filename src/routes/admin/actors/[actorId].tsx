import { createAsync, useParams } from "@solidjs/router";
import { ErrorBoundary } from "solid-js";
import ActorForm from "~/components/admin/actors/ActorForm";
import Page from "~/components/shared/Page";
import { getActor } from "~/data/admin";
import NotFound from "~/routes/[...404]";

export default function DeveloperPage() {
    const params = useParams()
    const data = createAsync(() => getActor(params.actorId))

    return (
        <ErrorBoundary fallback={(e) => e.status == 404 ? <NotFound /> : <p> Something went wrong. Please try again later </p>}>
            <Page title={data()?.name ?? "Actor"}>
                <ActorForm data={data()} />
            </Page>
        </ErrorBoundary>
    )
}