import { eq } from "drizzle-orm"
import { RouteDataArgs, ServerError, useRouteData } from "solid-start"
import { createServerData$ } from "solid-start/server"
import { DevForm } from "~/components/admin/dev/DevForm"
import { PubForm } from "~/components/admin/pub/PubForm"
import { db } from "~/db"
import { publisher } from "~/drizzle/schema"

export function routeData({ params }: RouteDataArgs) {
    return createServerData$(async ([_, publisherId]) => {
        try {
            const result = await db.select()
                .from(publisher)
                .where(eq(publisher.publisherId, publisherId))
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
        key: () => ['publishers', params.publisherId]
    })
}

export default function publisherPage() {
    const data = useRouteData<typeof routeData>()
    return <PubForm data={data()} />
}