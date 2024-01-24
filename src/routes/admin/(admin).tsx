import { type JSXElement } from "solid-js"
import styles from "../admin.module.scss"
import { GamesSvg, DevelopersSvg, PublishersSvg, PlatformSvg, ScreenshotsSvg, ActorsSvg } from "~/svgs"
import Page from "~/components/shared/Page"
import { createAsync } from "@solidjs/router";
import { getGames, getPublishers, getDevelopers, getPlatforms, getActors } from "../admin";

export default function AdminPage() {
    const games = createAsync(getGames)
    const publishers = createAsync(getPublishers)
    const developers = createAsync(getDevelopers)
    const platforms = createAsync(getPlatforms)
    const actors = createAsync(getActors)
    return (
        <Page title="Admin">
            <main class={styles.adminHome}>
                <Tile
                    icon={<GamesSvg />}
                    label="Games"
                    count={games()?.length ?? 0}
                />
                <Tile
                    icon={<DevelopersSvg />}
                    label="Developers"
                    count={developers()?.length ?? 0}
                />
                <Tile
                    icon={<PublishersSvg />}
                    label="Publishers"
                    count={publishers()?.length ?? 0}
                />
                <Tile
                    icon={<PlatformSvg />}
                    label="Platforms"
                    count={platforms()?.length ?? 0}
                />
                <Tile
                    icon={<ScreenshotsSvg />}
                    label="Screenshots"
                    count={(games() ?? []).reduce((prev, curr) => prev + curr.images.length, 0)}
                />
                <Tile
                    icon={<ActorsSvg />}
                    label="Actors"
                    count={actors()?.length ?? 0}
                />
            </main>
        </Page>
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

