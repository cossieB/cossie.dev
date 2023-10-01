import { LocalScores, GlobalScores } from "./memoryScores";
import styles from './memory.module.scss';
import { type Setter, useContext } from "solid-js";
import { UserContext } from "../shared/Signup/UserProvider";
import { MemoryContext } from "./MemoryProvider";

interface P {
    setReadInstructions: Setter<boolean>
}

export default function Finished(props: P) {
    const {username, setUsername} = useContext(UserContext)!
    const state = useContext(MemoryContext)!
    return (
        <div id={styles.finished}>
            <div style={{ 'text-align': 'center' }}>
                <h1>A winner is you!!!</h1>
                <h4>{username()}, you finished in {state.state.time} seconds and {state.state.flips} flips.</h4><br />
                <h4>Total score: {state.state.flips + state.state.time}</h4>
            </div>
            <button
                onClick={() => {
                    state.playAgain()
                    props.setReadInstructions(false)
                } }
                style={{ width: '50%', 'align-self': 'center' }}
                class={styles.niceButton}
            >
                Play Again
            </button>
            <button
                onClick={() => { 
                    setUsername("")
                    props.setReadInstructions(false)
                    state.playAgain()
                }}
                style={{ width: '50%', 'align-self': 'center' }}
                class={styles.niceButton}
            >
                Change Name
            </button>
            <h2 style={{ 'text-align': 'center' }}>Best Scores</h2>
            <div id={styles.highScores}>
                <LocalScores />
                <GlobalScores />
            </div>
        </div>
    )
}