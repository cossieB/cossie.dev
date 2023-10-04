import { Actor, Game } from "~/drizzle/types";
import AdminForm from "../AdminForm";
import styles from "~/components/admin/forms/forms.module.scss";
import { createStore } from "solid-js/store";
import { For, Show, createEffect, createMemo, createSignal } from "solid-js";
import { createServerAction$ } from "solid-start/server";
import { updateActorOnDB } from "./updateActorOnDB";
import { FormInput } from "../forms/FormInput"
import CustomTextarea from "../CustomTextarea";
import { DropZone } from "../forms/DropZone";
import HiddenInput from "../forms/HiddenInput";
import { ChevronDown } from "~/svgs";
import clickOutside from "~/lib/clickOutside";
false && clickOutside
type Props = {
    data?: Actor & {
        characters: NewType[]
    }
    games: Game[]
}
type NewType = {
    gameId: string;
    gameTitle: string;
    character: string;
    importance: number
};
function copyData(data: Props['data']) {
    return {
        actorId: data?.actorId ?? crypto.randomUUID(),
        photo: data?.photo ?? "",
        name: data?.name ?? "",
        summary: data?.summary ?? "",
        characters: data?.characters ?? []
    }
}
export default function ActorForm(props: Props) {
    const [actor, setActor] = createStore(copyData(props.data))
    const [state, setState] = createStore({
        isUploading: false,
        complete: false,
        uploadError: null as null | string,
        modalOpen: false,
    })

    const getSet = createMemo(() => new Set(actor.characters.map(x => x.gameId)))

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
                actor.characters.some(x => !x.character)
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
            <div class={styles.btnDiv}>
                <button
                    onclick={() => setState('modalOpen', prev => !prev)}
                    type="button"
                    classList={{ [styles.open]: state.modalOpen }}
                >
                    Add Character{" "}
                    <ChevronDown />
                </button>
                <GameSelector
                    setCharacters={(chars) => setActor('characters', chars)}
                    characters={actor.characters}
                    modalOpen={state.modalOpen}
                    closeModal={() => setState('modalOpen', false)}
                    characerSet={getSet()}
                    games={props.games}
                />
            </div>
            <For each={actor.characters}>
                {char =>
                    <li class={styles.charList}>
                        <span>{char.gameTitle}</span>
                        <input
                            type="text" required
                            placeholder={`Character in ${char.gameTitle}`}
                            oninput={e => {
                                setActor('characters', actor.characters.findIndex(x => x.gameId === char.gameId), 'character', e.target.value)
                            }}
                            value={char.character}
                        />
                        <select
                            onchange={e => {
                                setActor('characters', actor.characters.findIndex(x => x.gameId === char.gameId), 'importance', Number(e.target.value));
                            }}
                        >
                            <optgroup label="Role Type">
                                <option selected={actor.characters.find(x => x.gameId === char.gameId)?.importance == 1} value="1">Player Character</option>
                                <option selected={actor.characters.find(x => x.gameId === char.gameId)?.importance == 2} value="2">Main Role</option>
                                <option selected={actor.characters.find(x => x.gameId === char.gameId)?.importance == 3} value="3">Supporting Character</option>
                                <option selected={actor.characters.find(x => x.gameId === char.gameId)?.importance == 4} value="4">Background Character</option>
                                <option selected={actor.characters.find(x => x.gameId === char.gameId)?.importance == 5} value="5">Extra</option>
                            </optgroup>
                        </select>
                    </li>
                }
            </For>
            <Show when={actor.photo}>
                <HiddenInput name="photo" value={actor.photo!} />
            </Show>
            <HiddenInput name="actorId" value={actor.actorId} />
            <HiddenInput name="characters" value={JSON.stringify(actor.characters)} />
            <HiddenInput name="newItem" value={props.data ? 0 : 1} />
        </AdminForm>
    )
}

type P = {
    characters: NewType[]
    characerSet: Set<string>
    setCharacters(chars: NewType[]): void
    modalOpen: boolean,
    closeModal(): void,
    games: Game[]
}

function GameSelector(props: P) {

    const [input, setInput] = createSignal("")
    const filtered = createMemo(() => props.games.filter(game => game.title.toLowerCase().includes(input().toLowerCase())))
    return (
        <ul
            class={styles.selector}
            classList={{ [styles.open]: props.modalOpen }}
            use:clickOutside={props.closeModal}
        >
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
    const isSelected = createMemo(() => props.characerSet.has(props.game.gameId))
    function handleClick() {
        if (isSelected()) {
            props.setCharacters(props.characters.filter(x => x.gameId != props.game.gameId))
        }
        else
            props.setCharacters([...props.characters, {
                    gameId: props.game.gameId,
                    gameTitle: props.game.title,
                    character: "",
                    importance: 2
                }]
            )
    }
    return (
        <li onclick={handleClick}>
            {props.game.title}
            <div role="checkbox" aria-selected={isSelected()} classList={{ [styles.selected]: isSelected() }} class={styles.checkbox} />
        </li>
    )
}