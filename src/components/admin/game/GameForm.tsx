import { Form } from "solid-start/data/Form";
import { FormInput, FormTextarea, SelectInput } from "~/components/admin/forms/FormInput";
import type { Developer, Game, Publisher } from "~/drizzle/types";
import styles from "~/components/admin/forms/forms.module.scss";
import { useContext, Show } from "solid-js";
import { formatDateForInputElement } from "~/lib/formatDate";
import { DropZoneWithPreview, DropZone } from "../forms/DropZone";
import { AdminContext } from "~/routes/admin";
import { SetStoreFunction } from "solid-js/store";
import { ImagePreview } from "../forms/FilePreview";
import { YouTubeIframe } from "./YouTubeIframe";
import { Tags } from "./Tags";
import { InputWithAddButton } from "../forms/InputWithAddButton";

type Props = {
    data?: Game & { tags: string[] };
    game: NonNullable<Props['data']>
    setGame: SetStoreFunction<Props['game']>
    developers?: Developer[]
    publishers?: Publisher[]
}

export default function GameForm(props: Props) {
    const { developers, publishers } = useContext(AdminContext)!
    return (
        <Form id="gameForm" class={styles.form}>
            <FormInput
                name="title"
                value={props.game.title}
                required
                setter={props.setGame}
            />
            <div class={styles.heroImgs}>
                <DropZoneWithPreview
                    text="Cover"
                    onAdd={(url) => {
                        props.setGame('cover', url);
                    }}
                    img={props.game.cover}
                />
                <DropZoneWithPreview
                    text="Banner"
                    onAdd={(url) => {
                        props.setGame('banner', url);
                    }}
                    img={props.game.banner}
                />
            </div>
            <DropZone
                onAdd={(url) => { props.setGame({ images: [url, ...props.game.images] }) }}
                text="Drop Screenshots Here"
                fileLimit={3}
                currentNum={props.game.images.length}
            />
            <ImagePreview
                images={props.game.images}
                setImages={(arr: string[]) => props.setGame('images', arr)}
            />
            <FormTextarea
                name="summary"
                innerHTML={props.game.summary}
                required
                setter={props.setGame}
            />
            <FormInput
                name="releaseDate"
                value={formatDateForInputElement(new Date(props.game.releaseDate ?? ""))}
                required
                type="date"
                setter={props.setGame}
            />
            <SelectInput
                arr={(developers() ?? []).map(dev => ({ label: dev.name, value: dev.developerId }))}
                name="developer"
                label="Developer"
                default={(developers() ?? []).find(x => x.developerId === props.game.developerId)?.developerId}
                setter={props.setGame}
            />
            <SelectInput
                arr={(publishers() ?? []).map(pub => ({ label: pub.name, value: pub.publisherId })) ?? []}
                name="publisher"
                label="Publisher"
                default={(publishers() ?? [])?.find(x => x.publisherId === props.game.publisherId)?.publisherId}
                setter={props.setGame}
            />
            <InputWithAddButton name="tags" disabled={false} addItem={item => props.setGame({ tags: [...props.game.tags, item] })} />
            <Tags
                tags={props.game.tags}
                removeItem={item => props.setGame({ 
                    tags: props.game.tags.filter(tag => tag !== item) 
                })}
            />
            <FormInput
                name="trailer"
                value={props.game.trailer}
                required
                setter={props.setGame}
            />
            <Show when={getYoutubeURL(props.game.trailer)} fallback={<YouTubeIframe link={props.game.trailer} />} >
                <YouTubeIframe link={getYoutubeURL(props.game.trailer)!} />
            </Show>
        </Form>
    )
}

function getYoutubeURL(iframe: string) {
    return /src\s*=\s*(?:"|')(.+?)(?:"|')/gi.exec(iframe)?.at(1)
}