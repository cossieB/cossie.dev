import { FormInput, FormTextarea, SelectInput } from "~/components/admin/forms/FormInput";
import type { Game } from "~/drizzle/types";
import styles from "~/components/admin/forms/forms.module.scss";
import { useContext, Switch, Match, Show, createEffect } from "solid-js";
import { formatDateForInputElement } from "~/lib/formatDate";
import { AdminContext } from "~/routes/admin";
import { createStore } from "solid-js/store";
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
import { arrayChanged as arrayHasChanged, itemsAddedToArray } from "../../../utils/arrayChanged";
import { Checklist } from "../forms/Checklist";
import { generateSolidHelpers } from "@uploadthing/solid";
import { OurFileRouter } from "~/server/uploadthing";
import { Popup } from "~/components/shared/Popup";
import { UploadZone } from "../forms/DropZone";

// const {useUploadThing, uploadFiles} = generateSolidHelpers<OurFileRouter>();

export type Props = {
    data?: Game & { tags: string[], platforms: string[] };
}
function copyData(data: Props['data']) {
    return {
        tags: [...(data?.tags) ?? []],
        platforms: [...(data?.platforms) ?? []],
        gameId: data?.gameId ?? crypto.randomUUID(),
        summary: data?.summary ?? "",
        title: data?.title ?? "",
        cover: data?.cover ?? "",
        developerId: data?.developerId ?? "",
        publisherId: data?.publisherId ?? "",
        releaseDate: data?.releaseDate ?? "",
        images: [...(data?.images ?? [])],
        banner: data?.banner ?? "",
        trailer: data?.trailer ?? "",
    }
}
export default function GameForm(props: Props) {
    let form!: HTMLFormElement
    const { developers, publishers, platforms } = useContext(AdminContext)!
    const [game, setGame] = createStore(copyData(props.data))

    createEffect(() => {
        setGame(copyData(props.data))
    })
    const [state, setState] = createStore({
        isUploading: false,
        uploadOk: false,
        uploadError: null as null | string,
        imagesChanged: () => {
            if (game.cover !== (props.data?.cover ?? "") || game.banner !== (props.data?.banner ?? ""))
                return true
            if (game.images.length == 0)
                return false
            if (!props.data)
                return true
            return itemsAddedToArray(props.data.images, game.images)
        },
        tagsHaveChanged: () => arrayHasChanged(props.data?.tags ?? [], game.tags),
        pformsHaveChanged: () => arrayHasChanged(props.data?.platforms ?? [], game.platforms)
    })
    // const [files, setFiles] = createStore<GameImages>({ cover: null, banner: null, screens: [] })

    const [submitting, { Form }] = createServerAction$(updateGamesOnDB, {
        invalidate: () => ['games', game.gameId]
    })

    return (
        <>
            <Form id="gameForm" class={styles.form} ref={form} >
                <FormInput
                    name="title"
                    value={game.title}
                    required
                    setter={setGame}
                />
                <HeroImages setGame={setGame} game={game} onError={err => setState({uploadError: err})} />
                <UploadZone
                    endpoint="game"
                    text="Drop Screenshots Here"
                    fileLimit={8}
                    currentNum={game.images.length}
                    input={{
                        field: 'images',
                        reference: game.gameId
                    }}
                    onError={(err) => setState({uploadError: err})}
                    onSuccess={res => setGame({
                        images: [...game.images, ...res.map(x => x.url)]
                    })}
                />
                <ImagePreview
                    images={game.images}
                    setImages={arr => setGame('images', arr)}
                />
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
                <Checklist
                    items={platforms() ?? []}
                    idField="platformId"
                    valueField="name"
                    arr={game.platforms}
                    setArray={val => setGame('platforms', val)}
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
                <SubmitButton
                    loading={submitting.pending}
                    disabled={
                        state.isUploading ||
                        !game.title ||
                        !game.cover ||
                        !game.banner ||
                        !game.summary ||
                        !game.developerId ||
                        !game.publisherId ||
                        game.platforms.length == 0 ||
                        !game.releaseDate ||
                        !game.trailer
                    }
                    finished={!!submitting.result}
                    text="Submit"
                />
                <HiddenInput name="cover" value={game.cover} />
                <HiddenInput name="banner" value={game.banner} />
                <HiddenInput name="images" value={game.images} />
                <HiddenInput name="tags" value={game.tags} />
                <HiddenInput name="gameId" value={game.gameId} />
                <HiddenInput name="pforms" value={game.platforms} />
                <HiddenInput name="pformsHaveChanged" value={state.pformsHaveChanged() ? 1 : 0} />
                <HiddenInput name="tagsHaveChanged" value={state.tagsHaveChanged() ? 1 : 0} />
            </Form>
            <Popup
                when={!!state.uploadError || submitting.error}
                text={state.uploadError! || submitting.error.message}
                close={() => {
                    setState('uploadError', null);
                    submitting.clear()
                }}
            />
        </>
    )
}