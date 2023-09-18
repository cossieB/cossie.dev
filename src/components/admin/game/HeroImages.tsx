import styles from "~/components/admin/forms/forms.module.scss";
import { UploadZoneWithPreview } from "../forms/DropZone";
import { type SetStoreFunction } from "solid-js/store";
import { type Game } from "~/drizzle/types";
// import { type Props } from "./GameForm";

type Props = {
    setGame: SetStoreFunction<Game & { tags: string[] }>
    game: Game & { tags: string[] }
    onError: (err: any) => void
}

export function HeroImages(props: Props) {
    return <div class={styles.heroImgs}>
        <UploadZoneWithPreview
            text="Cover"
            onSuccess={(res) => props.setGame('cover', res[0].url)}
            img={props.game.cover}
            endpoint="game"
            input={{
                field: 'cover',
                reference: props.game.gameId
            }}
            onError={props.onError}
        />
        <UploadZoneWithPreview
            text="Banner"
            onSuccess={(res) => props.setGame('banner', res[0].url)}
            img={props.game.banner}
            endpoint="game"
            input={{
                field: 'banner',
                reference: props.game.gameId
            }}
            onError={props.onError}
        />
    </div>;
}
