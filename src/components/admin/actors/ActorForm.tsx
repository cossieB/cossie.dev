import type { Actor, Game } from "~/drizzle/types";
import AdminForm from "../AdminForm";
import styles from "~/components/admin/forms/forms.module.scss";
import { type SetStoreFunction, createStore } from "solid-js/store";
import { For, Show, createEffect, createMemo, createSignal } from "solid-js";
import { updateActorOnDB } from "./updateActorOnDB";
import { FormInput } from "../forms/FormInput"
import CustomTextarea from "../CustomTextarea";
import { DropZone } from "../forms/DropZone";
import HiddenInput from "../forms/HiddenInput";
import { ChevronDown } from "~/svgs";
import clickOutside from "~/lib/clickOutside";
import { action, createAsync, useSubmission } from "@solidjs/router";
import { getGames } from "~/data/admin";
false && clickOutside

type Props = {
    data?: Actor & {
        characters: Character[]
    }
}
export type Character = {
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
        characters: data?.characters.slice() ?? []
    }
}

const updateAction = action(updateActorOnDB, 'updateActor')

export default function ActorForm(props: Props) {
    let ref!: HTMLFormElement;

    const games = createAsync(() => getGames())
    
    const [actor, setActor] = createStore(copyData(props.data))
    const [state, setState] = createStore({
        isUploading: false,
        complete: false,
        uploadError: null as null | string,
        modalOpen: false,
    })

    const charHashSet = createMemo(() => new Set(actor.characters.map(x => x.gameId)))

    createEffect(() => {
        setActor(copyData(props.data));
    })
    const submitting = useSubmission(updateAction)
    return (
        <AdminForm
            class={styles.form}
            action={updateAction.with(actor, {isNewActor: !props.data})}
            ref={ref}
            submitting={submitting}
            state={state}
            setState={setState}
            reset={() => setActor(copyData(props.data))}
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
                setImages={urls => setActor("photo", urls[0])}
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
                    use:clickOutside={() => setState('modalOpen', false)}
                >
                    Add Character{" "}
                    <ChevronDown />
                <GameSelector
                    setCharacters={(chars) => setActor('characters', chars)}
                    characters={actor.characters}
                    modalOpen={state.modalOpen}
                    characerSet={charHashSet()}
                    games={games() ?? []}
                />
                </button>
            </div>
            <For each={actor.characters}>
                {char =>
                    <Character
                        char={char}
                        setActor={setActor as any}
                        actor={actor}
                    />
                }
            </For>
        </AdminForm>
    )
}

type P = {
    characters: Character[]
    characerSet: Set<string>
    setCharacters(chars: Character[]): void
    modalOpen: boolean,
    games: Game[]
}

type P1 = {
    char: Character
    actor: Actor & {
        characters: Character[]
    }
    setActor: SetStoreFunction<Actor & { characters: Character[] }>
}

function Character(props: P1) {
    return (
        <li class={styles.charList}>
            <span>{props.char.gameTitle}</span>
            <input
                type="text" required
                placeholder={`Character in ${props.char.gameTitle}`}
                oninput={e => {
                    props.setActor('characters', props.actor.characters.findIndex(x => x.gameId === props.char.gameId), 'character', e.target.value);
                }}
                value={props.char.character} />
            <select
                onchange={e => {
                    props.setActor('characters', props.actor.characters.findIndex(x => x.gameId === props.char.gameId), 'importance', Number(e.target.value));
                }}
            >
                <optgroup label="Role Type">
                    <option selected={props.actor.characters.find(x => x.gameId === props.char.gameId)?.importance == 1} value="1">Player Character</option>
                    <option selected={props.actor.characters.find(x => x.gameId === props.char.gameId)?.importance == 2} value="2">Main Role</option>
                    <option selected={props.actor.characters.find(x => x.gameId === props.char.gameId)?.importance == 3} value="3">Supporting Character</option>
                    <option selected={props.actor.characters.find(x => x.gameId === props.char.gameId)?.importance == 4} value="4">Background Character</option>
                    <option selected={props.actor.characters.find(x => x.gameId === props.char.gameId)?.importance == 5} value="5">Extra</option>
                </optgroup>
            </select>
        </li>
    );
}

function GameSelector(props: P) {
    let ref!: HTMLInputElement
    const [input, setInput] = createSignal("")
    const filtered = createMemo(() => props.games.filter(game => game.title.toLowerCase().includes(input().toLowerCase())))
    createEffect(() => {
        if (props.modalOpen)
            ref.focus()
    })
    return (
        <ul
            class={styles.selector}
            classList={{ [styles.open]: props.modalOpen }}
            onclick={e => e.stopImmediatePropagation()}
        >
            <input type="search"
                value={input()}
                onInput={e => setInput(e.target.value)}
                ref={ref}
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
    const isSelected = createMemo(() => props.characerSet.has(props.game.gameId));
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
            }])
    }
    return (
        <li onclick={handleClick} classList={{ [styles.selected]: isSelected() }}>
            {props.game.title}
            <div role="checkbox" aria-selected={isSelected()} class={styles.checkbox} />
        </li>
    )
}