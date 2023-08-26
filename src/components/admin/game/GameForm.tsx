import { FormInput, FormTextarea, SelectInput } from "~/components/admin/forms/FormInput";
import type { Game } from "~/drizzle/types";
import styles from "~/components/admin/forms/forms.module.scss";
import { useContext, Switch, Match, createMemo, Show, createSignal } from "solid-js";
import { formatDateForInputElement } from "~/lib/formatDate";
import { DropZone } from "../forms/DropZone";
import { AdminContext } from "~/routes/admin";
import { SetStoreFunction, createStore } from "solid-js/store";
import { ImagePreview } from "../forms/FilePreview";
import { YouTubeIframe } from "./YouTubeIframe";
import { Tags } from "./Tags";
import { InputWithAddButton } from "../forms/InputWithAddButton";
import { GameImages } from "./types";
import { HeroImages } from "./HeroImages";
import { getYoutubeURL } from "../../../utils/getYoutubeURL";
import { createServerAction$ } from "solid-start/server";
import HiddenInput from "../forms/HiddenInput";
import { uploadGameImages } from "./uploadGameImages";

export type Props = {
    data?: Game & { tags: string[] };
    game: NonNullable<Props['data']>
    setGame: SetStoreFunction<Props['game']>
}

export default function GameForm(props: Props) {
    let form!: HTMLFormElement
    const [uploadStatus, setUploadStatus] = createSignal<'pending' | 'uploading' | 'finished'>('pending')
    const [files, setFiles] = createStore<GameImages>({ cover: null, banner: null, screens: [] })
    const imagesChanged = createMemo(() => {
        if (!props.data)
            return false
        if (props.game.cover != (props.data?.cover ?? "") || props.game.banner != (props.data?.banner ?? ""))
            return true
        if (props.game.images.length != (props.data?.images.length ?? 0))
            return true
        const imagesSorted = [...props.game.images].sort()
        const dataImagesSorted = [...(props.data?.images ?? [])].sort()
        for (let i = 0; i < imagesSorted.length; i++) {
            if (imagesSorted[i] != dataImagesSorted[i])
                return true
        }
        return false;
    })
    const [submitting, { Form }] = createServerAction$(async (fd: FormData) => {
        fd.forEach((val, key) => {
            console.log(key, val)
        })
    })
    async function handleSubmit(e: SubmitEvent) {
        // e.preventDefault();
        // await uploadGameImages(files, props);
        form.submit()
    }
    const { developers, publishers } = useContext(AdminContext)!
    return (
        <Form id="gameForm" class={styles.form} onsubmit={handleSubmit} ref={form} >
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
            <Show when={imagesChanged()}>
                <button class={styles.submitBtn} type="button" onclick={() => uploadGameImages(files, props)}>
                    <Show when={uploadStatus() === 'finished'} fallback="Upload">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                        </svg>
                    </Show>
                </button>
            </Show>
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
                name="developerId"
                label="Developer"
                default={(developers() ?? []).find(x => x.developerId === props.game.developerId)?.developerId}
                setter={props.setGame}
            />
            <SelectInput
                arr={(publishers() ?? []).map(pub => ({ label: pub.name, value: pub.publisherId })) ?? []}
                name="publisherId"
                label="Publisher"
                default={(publishers() ?? [])?.find(x => x.publisherId === props.game.publisherId)?.publisherId}
                setter={props.setGame}
            />
            <InputWithAddButton
                name="tags"
                disabled={false}
                addItem={item => props.setGame({ tags: [...props.game.tags, item] })}
                value={props.game.tags}
            />
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
            <button class={styles.submitBtn} disabled={submitting.pending} type="submit">Submit</button>
            <HiddenInput name="cover" value={props.game.cover} />
            <HiddenInput name="banner" value={props.game.banner} />
            <HiddenInput name="images" value={props.game.images} />
        </Form>
    )
}
