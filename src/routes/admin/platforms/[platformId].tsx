import { eq } from "drizzle-orm"
import { RouteDataArgs, ServerError, useRouteData } from "solid-start"
import { createServerData$ } from "solid-start/server"
import { PlatForm } from "~/components/admin/platforms/PlatForm"
import { db } from "~/db"
import { platform } from "~/drizzle/schema"

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
    return <PlatForm data={data()} />
}