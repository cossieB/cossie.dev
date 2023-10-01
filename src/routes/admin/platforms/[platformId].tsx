import { eq } from "drizzle-orm"
import { Suspense } from "solid-js"
import ErrorBoundary, { type RouteDataArgs, ServerError, useRouteData } from "solid-start"
import { createServerData$ } from "solid-start/server"
import { PlatForm } from "~/components/admin/platforms/PlatForm"
import Loader from "~/components/shared/Loader/Loader"
import Page from "~/components/shared/Page"
import { db } from "~/db"
import { platform } from "~/drizzle/schema"
import NotFound from "~/routes/[...404]"

export function routeData({ params }: RouteDataArgs) {
    return createServerData$(async ([_, platformId]) => {
        try {
            const result = await db.select()
                .from(platform)
                .where(eq(platform.platformId, platformId))
                .limit(1)

            if (result.length == 0)
                throw new ServerError("Not Found", { status: 404 })
            return result[0]
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
        key: () => ['platforms', params.platformId]
    })
}

export default function platformPage() {
    const data = useRouteData<typeof routeData>()
    return (
        <ErrorBoundary fallback={(e) => e.status == 404 ? <NotFound /> : <p> Something went wrong. Please try again later </p>}>
            <Suspense fallback={<Loader />}>
                <Page title={data()?.name ?? "Platform"}>
                    <PlatForm data={data()} />
                </Page>
            </Suspense>
        </ErrorBoundary>
    )
}