import { createAsync, useParams } from "@solidjs/router";
import { ErrorBoundary, Suspense } from "solid-js";
import { DevForm } from "~/components/admin/dev/DevForm";
import { PubForm } from "~/components/admin/pub/PubForm";
import Loader from "~/components/shared/Loader/Loader";
import Page from "~/components/shared/Page";
import { getPublisher } from "~/data/admin/publisher";
import NotFound from "~/routes/[...404]";

export default function publisherPage() {
    const params = useParams();
    const data = createAsync(() => getPublisher(params.publisherId!))
    return (
        <ErrorBoundary fallback={(e) => e.status == 404 ? <NotFound /> : <p> Something went wrong. Please try again later </p>}>
            <Suspense fallback={<Loader />}>
                <Page title={data()?.name ?? "publisher"}>
                <PubForm data={data()} />
                </Page>
            </Suspense>
        </ErrorBoundary>
    )
}