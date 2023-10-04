import { JSXElement } from "solid-js"
import { type ParentRouteData } from "../admin"
import styles from "../admin.module.scss"
import { GamesSvg, DevelopersSvg, PublishersSvg, PlatformSvg, ScreenshotsSvg, ActorsSvg } from "~/svgs"
import { useRouteData, type RouteDataArgs } from "solid-start"
import MySiteTitle from "~/components/shared/MySiteTitle"

export function routeData({ data }: RouteDataArgs) {
    return data as ParentRouteData
}

export default function AdminPage() {
    const data = useRouteData<typeof routeData>();
    return (
        <main class={styles.adminHome}>
            <MySiteTitle>Admin</MySiteTitle>
            <Tile
                icon={<GamesSvg />}
                label="Games"
                count={data.games.latest?.length ?? 0}
            />
            <Tile
                icon={<DevelopersSvg />}
                label="Developers"
                count={data.developers.latest?.length ?? 0}
            />
            <Tile
                icon={<PublishersSvg />}
                label="Publishers"
                count={data.publishers.latest?.length ?? 0}
            />
            <Tile
                icon={<PlatformSvg />}
                label="Platforms"
                count={data.platforms.latest?.length ?? 0}
            />
            <Tile
                icon={<ScreenshotsSvg />}
                label="Screenshots"
                count={(data.games.latest ?? []).reduce((prev, curr) => prev + curr.images.length, 0)}
            />
            <Tile
                icon={<ActorsSvg />}
                label="Actors"
                count={data.actors.latest?.length ?? 0}
            />
        </main>
    )
}

type P = {
    icon: JSXElement,
    label: string,
    count: number
}

function Tile(props: P) {
    return (
        <div class={styles.iconTile}>
            <span>{props.icon}</span>
            <span>{props.label}</span>
            <span>{props.count}</span>
        </div>
    )
}

