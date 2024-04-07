import { createAsync, useParams } from "@solidjs/router"
import { ErrorBoundary } from "solid-js"
import { PlatForm } from "~/components/admin/platforms/PlatForm"
import Page from "~/components/shared/Page"
import { getPlatform } from "~/data/admin"
import NotFound from "~/routes/[...404]"

export default function PlatformPage() {
    const params = useParams()
    const data = createAsync(() => getPlatform(params.platformId))
    return (
        <ErrorBoundary fallback={(e) => e.status == 404 ? <NotFound /> : <p> Something went wrong. Please try again later </p>}>
            {/* <Suspense fallback={<Loader />}> */}
                <Page title={data()?.name ?? "Platform"}>
                    <PlatForm data={data()} />
                </Page>
            {/* </Suspense> */}
        </ErrorBoundary>
    )
}