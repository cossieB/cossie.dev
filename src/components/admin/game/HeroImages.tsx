import styles from "~/components/admin/forms/forms.module.scss";
import { DropZoneWithPreview } from "../forms/DropZone";
import { SetStoreFunction } from "solid-js/store";
import { GameImages } from "./types";
import { Game } from "~/drizzle/types";
// import { Props } from "./GameForm";

type Props = {
    setGame: SetStoreFunction<Game & {tags: string[]}>
    game: Game & {tags: string[]}
}

export function HeroImages(props: Props & { setFiles: SetStoreFunction<GameImages>; }) {
    return <div class={styles.heroImgs}>
        <DropZoneWithPreview
            text="Cover"
            onAdd={(url) => props.setGame('cover', url)}
            img={props.game.cover}
            setFiles={files => props.setFiles('cover', files[0])} />
        <DropZoneWithPreview
            text="Banner"
            onAdd={(url) => props.setGame('banner', url)}
            img={props.game.banner}
            setFiles={files => props.setFiles('banner', files[0])} />
    </div>;
}
