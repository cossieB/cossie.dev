import { JSXElement, useContext } from "solid-js"
import { AdminContext } from "../admin"
import styles from "../admin.module.scss"
import { GamesSvg, DevelopersSvg, PublishersSvg, PlatformSvg, ScreenshotsSvg, ActorsSvg } from "~/svgs"

export default function AdminPage() {
    const { developers, publishers, platforms, games, actors } = useContext(AdminContext)!
    return (
        <main class={styles.adminHome}>
            <Tile
                icon={<GamesSvg />}
                label="Games"
                count={games.length}
            />
            <Tile
                icon={<DevelopersSvg />}
                label="Developers"
                count={developers.length}
            />
            <Tile
                icon={<PublishersSvg />}
                label="Publishers"
                count={publishers.length}
            />
            <Tile
                icon={<PlatformSvg />}
                label="Platforms"
                count={platforms.length}
            />
            <Tile
                icon={<ScreenshotsSvg />}
                label="Screenshots"
                count={games.reduce((prev, curr) => prev + curr.images.length, 0)}
            />
            <Tile
                icon={<ActorsSvg />}
                label="Actors"
                count={actors.length}
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

