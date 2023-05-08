import Finished from "./Finished"
import GameStart from "./GameStart"
import styles from './memory.module.scss';
import Board from "./Board"
import { createSignal, Match, Switch, useContext } from "solid-js";
import Instructions from "./Instructions";
import Signup from "../shared/Signup/Signup";
import { UserContext } from "../shared/Signup/UserProvider";
import MemoryProvider, { MemoryContext } from "./MemoryProvider";

export default function MemoryMain() {
    return (
        <MemoryProvider>
            <Main />
        </MemoryProvider>
    )
}

function Main() {
    const { username } = useContext(UserContext)!
    const { state } = useContext(MemoryContext)!
    const [readInstructions, setReadInstructions] = createSignal(false);
    return (
        <div class="container" id={styles.memory}>
            <Switch fallback={<GameStart />} >
                <Match when={!username()} >
                    <Signup className={styles.signup} />
                </Match>
                <Match when={!readInstructions()}>
                    <Instructions setReadInstructions={setReadInstructions} />
                    <Board />
                </Match>
                <Match when={state.finished} >
                    <Finished
                        setReadInstructions={setReadInstructions}
                    />
                </Match>
            </Switch>
        </div>
    )
}
