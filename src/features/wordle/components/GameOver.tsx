import { nextWord, state } from "../utils/store"
import Blocks from "./Blocks"
import styles from "./Wordle.module.css"

export default function() {
    return (
        <>
            <Blocks />
            <div class={styles.gameOver}>
                <h1>{state.status == 'won' ? "You Win" : "You Lose"} </h1>
                <h4>{state.word().toUpperCase()}</h4>
                <button onClick={() => nextWord() }>
                    Next Word
                </button>
            </div>
        </>
    )
}