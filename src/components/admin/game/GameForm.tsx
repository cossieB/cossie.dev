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

function uploadToUT(files: File[]) {
    const uploader = genUploader()
}

export default function GameForm(props: Props) {
    const uploader = genUploader<OurFileRouter>();
    const [files, setFiles] = createStore<GameImages>({ cover: null, banner: null, screens: [] })
    async function handleSubmit(e: SubmitEvent) {
        e.preventDefault();
        const f: File[] = []
        files.cover && f.push(files.cover)
        files.banner && f.push(files.banner)
        f.push(...files.screens)
        const res = await uploader({
            endpoint: 'test',
            files: f,
            onUploadProgress({ file, progress, }) {
                console.log(file, progress)
            },
            
        });
        console.log(res)
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
                setFiles={files => setFiles('screens', prev => [...prev, ...files]) }
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