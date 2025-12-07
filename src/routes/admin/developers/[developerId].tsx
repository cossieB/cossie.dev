import { createAsync, useParams } from "@solidjs/router";
import { ErrorBoundary, Suspense } from "solid-js";
import { DevForm } from "~/components/admin/dev/DevForm";
import Loader from "~/components/shared/Loader/Loader";
import Page from "~/components/shared/Page";
import { getDeveloper } from "~/data/admin/developer";
import NotFound from "~/routes/[...404]";

export default function DeveloperPage() {
    const params = useParams();
    const data = createAsync(() => getDeveloper(params.developerId!))
    return (
        <ErrorBoundary fallback={(e) => e.status == 404 ? <NotFound /> : <p> Something went wrong. Please try again later </p>}>
            <Suspense fallback={<Loader />}>
                <Page title={data()?.name ?? "Developer"}>
                <DevForm data={data()} />
                </Page>
            </Suspense>
        </ErrorBoundary>
    )
}