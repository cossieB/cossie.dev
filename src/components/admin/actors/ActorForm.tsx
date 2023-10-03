import { Actor, Game } from "~/drizzle/types";
import AdminForm from "../AdminForm";
import styles from "~/components/admin/forms/forms.module.scss";
import { SetStoreFunction, createStore } from "solid-js/store";
import { For, createEffect, createMemo, createSignal, useContext } from "solid-js";
import { createServerAction$ } from "solid-start/server";
import { updateActorOnDB } from "./updateActorOnDB";
import { FormInput } from "../forms/FormInput"
import CustomTextarea from "../CustomTextarea";
import { DropZone } from "../forms/DropZone";
import HiddenInput from "../forms/HiddenInput";
import { AdminContext } from "~/routes/admin";

type Props = {
    data?: Actor
}
type NewType = {
    gameId: string;
    title: string;
    charName: string;
};
function copyData(data: Props['data']): Actor {
    return {
        actorId: data?.actorId ?? crypto.randomUUID(),
        photo: data?.photo ?? "",
        name: data?.name ?? "",
        summary: data?.summary ?? "",
    }
}
export default function ActorForm(props: Props) {
    const [actor, setActor] = createStore(copyData(props.data))
    const [state, setState] = createStore({
        isUploading: false,
        complete: false,
        uploadError: null as null | string,
        modalOpen: false
    })

    const [characters, setCharacters] = createStore({
        list: [] as NewType[],
        get set() {
            return getSet()
        }
    })
    const getSet = createMemo(() => new Set(characters.list.map(x => x.gameId)))

    createEffect(() => {
        setActor(copyData(props.data))
    })
    const [submitting, { Form }] = createServerAction$(updateActorOnDB, {
        invalidate: () => ['actors', props.data?.actorId]
    })
    return (
        <AdminForm
            class={styles.form}
            Form={Form}
            submitting={submitting}
            state={state}
            setState={setState}
            submitDisabled={
                !actor.name ||
                characters.list.some(x => x.charName === "")
            }
        >
            <FormInput
                name="name"
                value={actor.name}
                setter={setActor}
            />
            <DropZone
                endpoint="logo"
                onSuccess={res => setActor('photo', res[0].url)}
                images={[actor.photo ?? ""]}
                input={{
                    reference: actor.actorId,
                    table: 'actor'
                }}
                onError={e => setState('uploadError', e)}
                single
                text="Photo"
            />
            <CustomTextarea
                setter={val => setActor('summary', val)}
                name="summary"
                value={actor.summary ?? ""}
            />
            <div style={{ display: 'flex', position: 'relative' }}>
                <button onclick={() => setState('modalOpen', prev => !prev)} type="button">
                    Add Character
                </button>
                <GameSelector
                    setCharacters={setCharacters}
                    characters={characters}
                    modalOpen={state.modalOpen}
                />
            </div>
            <For each={characters.list}>
                {char =>
                    <li class={styles.charList}>
                        <span>{char.title}</span>
                        <input type="text" required placeholder={`Character in ${char.title}`} />
                    </li>
                }
            </For>
            <HiddenInput name="newItem" value={props.data ? 0 : 1} />
        </AdminForm>
    )
}

type P = {
    characters: {
        list: NewType[];
        readonly set: Set<string>;
    }
    setCharacters: SetStoreFunction<{
        list: NewType[];
        readonly set: Set<string>;
    }>
    modalOpen: boolean
}

function GameSelector(props: P) {
    const { games } = useContext(AdminContext)!
    const [input, setInput] = createSignal("w")
    const filtered = createMemo(() => games.filter(game => game.title.toLowerCase().includes(input().toLowerCase())))
    return (
        <ul class={styles.selector} classList={{[styles.open]: props.modalOpen}}>
            <input type="search"
                value={input()}
                onInput={e => setInput(e.target.value)}
            />
            <For each={filtered()}>
                {game =>
                    <Li
                        {...props}
                        game={game}
                    />
                }
            </For>
        </ul>
    )
}

function Li(props: P & { game: Game }) {
    const isSelected = createMemo(() => props.characters.set.has(props.game.gameId))
    function handleClick() {
        if (isSelected()) {
            props.setCharacters(prev => ({
                list: prev.list.filter(x => x.gameId != props.game.gameId)
            }))
        }
        else
            props.setCharacters(prev => ({
                list: [...prev.list, {
                    gameId: props.game.gameId,
                    title: props.game.title,
                    charName: ""
                }]
            }))
    }
    return (
        <li onclick={handleClick}>
            {props.game.title}
            <div role="checkbox" aria-selected={isSelected()} classList={{ [styles.selected]: isSelected() }} class={styles.checkbox} />
        </li>
    )
}