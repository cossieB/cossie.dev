import { Form } from "solid-start/data/Form";
import { FormInput, FormTextarea, SelectInput } from "~/components/admin/forms/FormInput";
import type { Developer, Game, Publisher } from "~/drizzle/types";
import styles from "~/components/admin/forms/forms.module.scss";
import { useContext, Switch, Match } from "solid-js";
import { formatDateForInputElement } from "~/lib/formatDate";
import { DropZone } from "../forms/DropZone";
import { AdminContext } from "~/routes/admin";
import { SetStoreFunction, createStore, unwrap } from "solid-js/store";
import { ImagePreview } from "../forms/FilePreview";
import { YouTubeIframe } from "./YouTubeIframe";
import { Tags } from "./Tags";
import { InputWithAddButton } from "../forms/InputWithAddButton";
import { genUploader } from "uploadthing/client";
import { GameImages } from "./types";
import { HeroImages } from "./HeroImages";
import { OurFileRouter } from "~/server/uploadthing";

export type Props = {
    data?: Game & { tags: string[] };
    game: NonNullable<Props['data']>
    setGame: SetStoreFunction<Props['game']>
    developers?: Developer[]
    publishers?: Publisher[]
}
const uploader = genUploader<OurFileRouter>();

async function upload<T extends keyof OurFileRouter>(
    endpoint: T,
    title: string,
    field: OurFileRouter[T]['_def']['_input']['field'],
    setField: (list: string[]) => void,
    files: File[]) {
    //@ts-expect-error
    const res = await uploader({
        endpoint,
        files,
        input: {
            title,
            field
        }
    })
    setField(res.map(x => x.url))
}
export default function GameForm(props: Props) {
    const [files, setFiles] = createStore<GameImages>({ cover: null, banner: null, screens: [] })

    async function handleSubmit(e: SubmitEvent) {
        e.preventDefault();
        const promises: Promise<any>[] = []
        if (files.cover && props.game.cover != props.data?.cover) {
            promises.push(upload(
                'game',
                props.game.title,
                'cover',
                list => props.setGame('cover', list[0]),
                [files.cover]
            ))
        }

        if (files.banner && props.game.banner != props.data?.banner) {
            promises.push(upload(
                'game',
                props.game.title,
                'banner',
                list => props.setGame('banner', list[0]),
                [files.banner]
            ))
        }

        if (files.screens.length > 0 && props.game.images != props.data?.images) {
            promises.push(upload(
                'game',
                props.game.title,
                'images',
                list => props.setGame('images', list),
                files.screens
            ))
        }
        await Promise.all(promises)
    }
    const { developers, publishers } = useContext(AdminContext)!
    return (
        <Form id="gameForm" class={styles.form} onsubmit={handleSubmit}>
            <FormInput
                name="title"
                value={props.game.title}
                required
                setter={props.setGame}
            />
            <HeroImages {...props} setFiles={setFiles} />
            <DropZone
                onAdd={(url) => { props.setGame({ images: [...props.game.images, url] }) }}
                text="Drop Screenshots Here"
                fileLimit={8}
                currentNum={props.game.images.length}
                setFiles={files => setFiles('screens', prev => [...prev, ...files])}
            />
            <ImagePreview
                images={props.game.images}
                setImages={arr => props.setGame('images', arr)}
            />
            <FormTextarea
                name="summary"
                innerHTML={props.game.summary}
                required
                setter={props.setGame}
            />
            <FormInput
                name="releaseDate"
                value={props.game.releaseDate ? formatDateForInputElement(new Date(props.game.releaseDate)) : undefined}
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
            <Switch>
                <Match when={getYoutubeURL(props.game.trailer)} >
                    <YouTubeIframe link={getYoutubeURL(props.game.trailer)!} />
                </Match>
                <Match when={props.game.trailer}>
                    <YouTubeIframe link={props.game.trailer} />
                </Match>
            </Switch>
            <button type="submit">Submit</button>
        </Form>
    )
}

function getYoutubeURL(iframe: string) {
    return /src\s*=\s*(?:"|')(.+?)(?:"|')/gi.exec(iframe)?.at(1)
}