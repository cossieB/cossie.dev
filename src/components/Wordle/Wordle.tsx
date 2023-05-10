import WordleLogic from "./WordleLogic";
import styles from "./Wordle.module.scss"
import GameOver from "./GameOver";
import { state } from "./store";

export default function Wordle() {  
    return (
        <div
            class={styles.container}
        >
            {state.status == 'playing' ?
                <WordleLogic /> :
                <GameOver />}
        </div>
    )
}