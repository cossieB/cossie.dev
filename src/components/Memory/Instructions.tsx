import { MemoryContext } from './MemoryProvider';
import styles from './memory.module.scss';
import { type Setter, useContext } from "solid-js";

type P = {
    setReadInstructions: Setter<boolean>
}
export default function Instructions(props: P) {
    const state = useContext(MemoryContext)!
    return (
        <div class={styles.rules}>
            <h1>Rules</h1>
            <h2>There are two of each symbol. Find the matches.</h2>
            <div class={styles.difficulty}>
                Game Size
                <div>
                    <button
                        disabled={state.state.gameSize == 1}
                        onClick={() => {
                            state.changeBoardSize(-1)
                        }}
                    >↓</button>
                    <button
                        disabled={state.state.gameSize == 4}
                        onClick={() => {
                            state.changeBoardSize(1)
                        }}
                    >↑</button>
                </div>
                {state.state.gameSize}
            </div>
            <h3>Ready?</h3>
            <button
                class={styles.button}
                onClick={() => props.setReadInstructions(true)}
            >
                I'm Ready.
            </button>
        </div>
    )
}