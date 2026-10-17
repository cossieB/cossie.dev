import { createSignal, createStore, Match, Show, Switch } from "solid-js";
import styles from "./2048.module.css"
import type { Block } from "./ControlElem";
import GameOver from "./GameOver";
import { GlobalLeaders, LocalLeaders } from "./Leaders";
import { useResize } from "~/hooks/useResize";
import { useSearchParams } from "@solidjs/router";
import { Form } from "~/components/Form/Form";
import { Board } from "./Board";
import { use2048Logic } from "../utils/use2048Logic";

export default function Game2048() {
    const [name, setName] = createSignal("")
    const [searchParams, setSearchParams] = useSearchParams()
    const [score, setScore] = createSignal(0);
    const [gameOver, setGameOver] = createSignal(false);
    const [array, setArray] = createStore<Block[]>([])
    const windowWidth = useResize()
    const move = use2048Logic({
        array,
        setGameOver,
        addScore: s => setScore(prev => prev + s),
        setArray
    })
    return (
        <div class="container" id={styles.container} >
            <Switch >
                <Match when={!searchParams.name}>
                    <Form
                        handleSubmit={() => setSearchParams({ name: name() })}
                        disabled={!name()}
                    >
                        <Form.FormInput
                            label="Name"
                            onInput={e => setName(e.currentTarget.value)}
                            value={name()}
                        />
                    </Form>
                </Match>
                <Match when={gameOver()}>
                    <GameOver
                        score={score()}
                        setScore={setScore}
                        setGameOver={setGameOver}
                        array={array}
                        setArray={setArray}
                    />
                </Match>
                <Match when={searchParams.name && !gameOver()}>
                    <div class={styles.game}>
                        <div class={styles.score}>
                            {score() > 0 ?
                                <span> {score()} </span> :
                                <aside>
                                    {window.matchMedia("(pointer: coarse)").matches ? "Swipe across the screen " : "Use the arrow buttons"}  to smash two blocks of the same value together.
                                </aside>}
                        </div>
                        <Board
                            array={array}
                            move={move}
                        />
                        <Show when={windowWidth() < 1024}>
                            <button
                                class={styles.HSToggle}
                                onClick={() => {
                                    const panel = document.getElementsByClassName(styles.leadersPanel)[0]! as HTMLDivElement
                                    panel.style.transform = `translateX(0)`
                                }}
                            >
                                High Scores {" "}
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                                </svg>
                            </button>
                        </Show>
                        <div class={styles.leadersPanel}>
                            <Show when={windowWidth() < 1024}>
                                <button
                                    class={styles.HSToggle}
                                    onClick={() => {
                                        const panel = document.getElementsByClassName(styles.leadersPanel)[0]! as HTMLDivElement
                                        panel.style.transform = `translateX(100vw)`
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                                    </svg>
                                    Back
                                </button>
                            </Show>
                            <LocalLeaders />
                            <GlobalLeaders />
                        </div>
                    </div>
                </Match>
            </Switch>
        </div>
    )
}