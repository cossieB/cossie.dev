import { FormInput, FormTextarea, SelectInput } from "~/components/admin/forms/FormInput";
import type { Game } from "~/drizzle/types";
import styles from "~/components/admin/forms/forms.module.scss";
import { useContext, Switch, Match, createMemo, Show, createEffect } from "solid-js";
import { formatDateForInputElement } from "~/lib/formatDate";
import { DropZone } from "../forms/DropZone";
import { AdminContext } from "~/routes/admin";
import { SetStoreFunction, createStore, unwrap } from "solid-js/store";
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
import SubmitButton from "../SubmitButton";
import { updateGamesOnDB } from "./updateGamesOnDB";

export type Props = {
    data?: Game & { tags: string[] };
}

export default function GameForm(props: Props) {
    let form!: HTMLFormElement
    
    const [game, setGame] = createStore({
        tags: [...(props.data?.tags) ?? []],
        gameId: props.data?.gameId ?? "",
        summary: props.data?.summary ?? "",
        title: props.data?.title ?? "",
        cover: props.data?.cover ?? "",
        developerId: props.data?.developerId ?? "",
        publisherId: props.data?.publisherId ?? "",
        releaseDate: props.data?.releaseDate ?? "",
        images: [...(props.data?.images ?? [])],
        banner: props.data?.banner ?? "",
        trailer: props.data?.trailer ?? "",
    })
    createEffect(() => {
        console.log(unwrap(game))
    })
    const { developers, publishers } = useContext(AdminContext)!
    const [state, setState] = createStore({
        isUploading: false,
        uploadOk: false,
        uploadError: false
    })
    const [files, setFiles] = createStore<GameImages>({ cover: null, banner: null, screens: [] })

    const imagesChanged = createMemo(() => {
        if (game.images.length == 0)
            return false
        if (!props.data)
            return true
        if (game.cover !== props.data.cover || game.banner !== props.data.banner)
            return true
        const ogSet = new Set(props.data.images)
        const newSet = new Set(game.images); console.log(ogSet, newSet)
        for (const img of game.images) {
            if (!ogSet.has(img)) 
                return true
        }
        return false;
    })
    const [submitting, { Form }] = createServerAction$(updateGamesOnDB, {
        invalidate: () => ['games']
    })

    return (
        <Form id="gameForm" class={styles.form} ref={form} >
            <FormInput
                name="title"
                value={game.title}
                required
                setter={setGame}
            />
            <HeroImages setGame={setGame} game={game} setFiles={setFiles} />
            <DropZone
                onAdd={(url) => { setGame({ images: [...game.images, url] }) }}
                text="Drop Screenshots Here"
                fileLimit={8}
                currentNum={game.images.length}
                setFiles={files => setFiles('screens', prev => [...prev, ...files])}
            />
            <ImagePreview
                images={game.images}
                setImages={arr => setGame('images', arr)}
            />
            <Show when={imagesChanged()}>
                <SubmitButton
                    disabled={!!submitting.result}
                    finished={state.uploadOk}
                    loading={submitting.pending || state.isUploading}
                    text="Upload"
                    type="button"
                    onclick={() => uploadGameImages(files, props, setState, game, setGame, props.data)}
                />
            </Show>
            <FormTextarea
                name="summary"
                innerHTML={game.summary}
                required
                setter={setGame}
            />
            <FormInput
                name="releaseDate"
                value={game.releaseDate ? formatDateForInputElement(new Date(game.releaseDate)) : undefined}
                required
                type="date"
                setter={setGame}
            />
            <SelectInput
                arr={(developers() ?? []).map(dev => ({ label: dev.name, value: dev.developerId }))}
                name="developerId"
                label="Developer"
                default={(developers() ?? []).find(x => x.developerId === game.developerId)?.developerId}
                setter={setGame}
            />
            <SelectInput
                arr={(publishers() ?? []).map(pub => ({ label: pub.name, value: pub.publisherId })) ?? []}
                name="publisherId"
                label="Publisher"
                default={(publishers() ?? [])?.find(x => x.publisherId === game.publisherId)?.publisherId}
                setter={setGame}
            />
            <InputWithAddButton
                name="tags"
                disabled={false}
                addItem={item => setGame({ tags: [...game.tags, item] })}
            />
            <Tags
                tags={game.tags}
                removeItem={item => setGame({
                    tags: game.tags.filter(tag => tag !== item)
                })}
            />
            <FormInput
                name="trailer"
                value={game.trailer}
                required
                setter={setGame}
            />
            <Switch>
                <Match when={getYoutubeURL(game.trailer)} >
                    <YouTubeIframe link={getYoutubeURL(game.trailer)!} />
                </Match>
                <Match when={game.trailer}>
                    <YouTubeIframe link={game.trailer} />
                </Match>
            </Switch>
            <button class={styles.submitBtn} disabled={submitting.pending} type="submit">Submit</button>
            <HiddenInput name="cover" value={game.cover} />
            <HiddenInput name="banner" value={game.banner} />
            <HiddenInput name="images" value={game.images} />
            <HiddenInput name="tags" value={game.tags} />
            <HiddenInput name="gameId" value={game.gameId} />
            <HiddenInput name="tagsHaveChanged" value={1} />
        </Form>
    )
}