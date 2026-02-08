import { LocalScores, GlobalScores } from "./memoryScores";
import styles from './memory.module.css';
import { type Setter, useContext } from "solid-js";
import { MemoryContext } from "./MemoryProvider";
import { useSearchParams } from "@solidjs/router";

interface P {
    setReadInstructions: Setter<boolean>
}

export default function Finished(props: P) {

    const { state, ...fn } = useContext(MemoryContext)!
    const [searchParams] = useSearchParams()
    return (
        <div id={styles.finished}>
            <div style={{ 'text-align': 'center' }}>
                <h1>A winner is you!!!</h1>
                <h4>{searchParams.name}, you finished in {state.time} seconds and {state.flips} flips.</h4><br />
                <h4>Total score: {state.flips + state.time}</h4>
            </div>
            <button
                onClick={() => {
                    fn.playAgain()
                    props.setReadInstructions(false)
                }}
                style={{ width: '50%', 'align-self': 'center' }}
                class={styles.niceButton}
            >
                Play Again
            </button>
            <h2 style={{ 'text-align': 'center' }}>Best Scores</h2>
            <div id={styles.highScores}>
                <LocalScores />
                <GlobalScores />
            </div>
        </div>
    )
}