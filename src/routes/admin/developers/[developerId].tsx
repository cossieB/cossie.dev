import { eq } from "drizzle-orm";
import { RouteDataArgs, useRouteData } from "solid-start";
import { ServerError, createServerData$ } from "solid-start/server";
import { AdminTable } from "~/components/admin/AdminTable";
import { DevForm } from "~/components/admin/dev/DevForm";
import { db } from "~/db";
import { developer } from "~/drizzle/schema";

export function routeData({ params }: RouteDataArgs) {
    return createServerData$(async ([_, developerId]) => {
        try {
            const result = await db.select()
                .from(developer)
                .where(eq(developer.developerId, developerId))
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
        key: () => ['developers', params.developerId]
    })
}

export default function DeveloperPage() {
    const data = useRouteData<typeof routeData>()
    return <DevForm data={data()} />
}