import { FormInput, SelectInput } from "~/components/admin/forms/FormInput";
import type { Game } from "~/drizzle/types";
import styles from "~/components/admin/forms/forms.module.scss";
import { useContext, createEffect } from "solid-js";
import { formatDateForInputElement } from "~/lib/formatDate";
import { AdminContext } from "~/routes/admin";
import { createStore } from "solid-js/store";
import { ImagePreview } from "../forms/FilePreview";
import { YouTubeIframe } from "./YouTubeIframe";
import { Tags } from "./Tags";
import { InputWithAddButton } from "../forms/InputWithAddButton";
import { createServerAction$ } from "solid-start/server";
import HiddenInput from "../forms/HiddenInput";
import { updateGamesOnDB } from "./updateGamesOnDB";
import { arrayChanged as arrayHasChanged } from "../../../utils/arrayChanged";
import { Checklist } from "../forms/Checklist";
import { DropZone } from "../forms/DropZone";
import AdminForm from "../AdminForm";

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
        complete: false,
        isUploading: false,
        uploadError: null as null | string,
        tagsHaveChanged: () => arrayHasChanged(props.data?.tags ?? [], game.tags),
        pformsHaveChanged: () => arrayHasChanged(props.data?.platforms ?? [], game.platforms)
    })

    const [submitting, { Form }] = createServerAction$(updateGamesOnDB, {
        invalidate: () => ['games', game.gameId]
    })

    return (
        <AdminForm
            id="gameForm" class={styles.form}
            ref={form}
            Form={Form}
            submitting={submitting}
            state={state}
            setState={setState}
            submitDisabled={
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
        >
            <FormInput
                name="title"
                value={game.title}
                required
                setter={setGame}
            />
            <div class={styles.heroImgs}>
                <DropZone
                    text="Cover"
                    onSuccess={(res) => setGame('cover', res[0].url)}
                    images={[game.cover]}
                    endpoint="game"
                    input={{
                        field: 'cover',
                        reference: game.gameId
                    }}
                    onError={err => {
                        setState({ uploadError: err });
                    }}
                    single={true}
                />
                <DropZone
                    text="Banner"
                    onSuccess={(res) => setGame('banner', res[0].url)}
                    images={[game.banner]}
                    endpoint="game"
                    input={{
                        field: 'banner',
                        reference: game.gameId
                    }}
                    onError={err => {
                        setState({ uploadError: err });
                    }}
                    single={true}
                />
            </div>
            <DropZone
                endpoint="game"
                text="Drop Screenshots Here"
                fileLimit={8}
                currentNum={game.images.length}
                images={game.images}
                input={{
                    field: 'images',
                    reference: game.gameId
                }}
                onError={(err) => {
                    setState({ uploadError: err });
                    setGame({ images: props.data?.images ?? [] })
                }}
                onSuccess={res => setGame({
                    images: [...game.images, ...res.map(x => x.url)]
                })}
                single={false}
            />
            <ImagePreview
                images={game.images}
                setImages={arr => setGame('images', arr)}
            />
            <div
                contentEditable
                innerHTML={game.summary}
                onblur={e => { setGame('summary', e.target.innerHTML) }}
                class={styles.editable}
            />
            <FormInput
                name="releaseDate"
                value={game.releaseDate ? formatDateForInputElement(new Date(game.releaseDate)) : undefined}
                required
                type="date"
                setter={setGame}
            />
            <SelectInput
                arr={(developers).map(dev => ({ label: dev.name, value: dev.developerId }))}
                name="developerId"
                label="Developer"
                default={(developers).find(x => x.developerId === game.developerId)?.developerId}
                setter={setGame}
            />
            <SelectInput
                arr={(publishers).map(pub => ({ label: pub.name, value: pub.publisherId })) ?? []}
                name="publisherId"
                label="Publisher"
                default={(publishers).find(x => x.publisherId === game.publisherId)?.publisherId}
                setter={setGame}
            />
            <InputWithAddButton
                name="tags"
                disabled={false}
                addItem={item => setGame({ tags: Array.from(new Set([...game.tags, item.toLowerCase()])) })}
            />
            <Tags
                tags={game.tags}
                removeItem={item => setGame({
                    tags: game.tags.filter(tag => tag !== item)
                })}
            />
            <Checklist
                items={platforms}
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
            <YouTubeIframe link={game.trailer} />
            <HiddenInput name="cover" value={game.cover} />
            <HiddenInput name="banner" value={game.banner} />
            <HiddenInput name="images" value={game.images} />
            <HiddenInput name="tags" value={game.tags} />
            <HiddenInput name="summary" value={game.summary} />
            <HiddenInput name="gameId" value={game.gameId} />
            <HiddenInput name="pforms" value={game.platforms} />
            <HiddenInput name="pformsHaveChanged" value={state.pformsHaveChanged() ? 1 : 0} />
            <HiddenInput name="tagsHaveChanged" value={state.tagsHaveChanged() ? 1 : 0} />
            <HiddenInput name="newGame" value={props.data ? 0 : 1} />
        </AdminForm>
    )
}