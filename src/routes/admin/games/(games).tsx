import { type Resource, createSignal } from "solid-js";
import { useRouteData } from "solid-start";
import FormProvider from "~/components/admin/FormProvider";
import { DataGrid } from "~/components/DataGrid/DataGrid";
import Settings from "~/components/DataGrid/Settings";
import { StoreProvider } from "~/components/DataGrid/StoreProvider";
import { type Header } from "~/components/DataGrid/types";
import { db } from "~/db";
import { developer, game, publisher } from "~/drizzle/schema";
import styles from "../admin.module.scss"
import { eq } from "drizzle-orm"
import { createServerData$ } from "solid-start/server";

export function routeData() {
    return createServerData$(async () => db
        .select()
        .from(game)
        .innerJoin(developer, eq(game.developerId, developer.developerId))
        .innerJoin(publisher, eq(game.publisherId, publisher.publisherId))
    )
}

type UnwrapResource<T> = T extends Resource<infer x | undefined> ? x : never
type X = NonNullable<UnwrapResource<ReturnType<typeof routeData>>>
type Y = X[number]
const t: Header<Y['Game']>[] = [{
    property: 'title',
    isSelected: true,
    sortable: true,
}, {
    property: 'banner',
    isSelected: true
}, {
    property: 'cover',
    isSelected: true,
    sortable: true,
}]
export default function GamesPage() {
    const data = useRouteData<typeof routeData>();
    const [selectedGame, setSelectedGame] = createSignal<typeof game | null>(null)
    return (
        <StoreProvider arr={t} >
            <FormProvider setSelected={setSelectedGame} selected={selectedGame}>
                <div class={styles.main}>
                    <Settings />
                    <DataGrid data={data() ?? []} />
                </div>
            </FormProvider>
        </StoreProvider>
    )
}