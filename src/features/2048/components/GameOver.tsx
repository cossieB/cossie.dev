import styles from "./2048.module.css"
import { Board } from "./Board";
import { onMount, type Setter, useContext } from "solid-js";
import type { Elem } from "./ControlElem";
import type { Scores } from "../types/types";
import { addDoc, collection } from "firebase/firestore";
import { db } from "~/integrations/firebase";
import { useSearchParams } from "@solidjs/router";
import { useGetUsernameFromSearchParams } from "~/hooks/useUsername";

interface P {
    score: number
    array: Elem[]
    setScore: Setter<number>
    setGameOver: Setter<boolean>
}

export default function GameOver(props: P) {
    onMount(() => {
        // setLocal();
        // setGlobal()
    })
    const username = useGetUsernameFromSearchParams()
    const [_, setSearchParams] = useSearchParams()

    function setLocal() {
        let localLeaders = localStorage.getItem('g2048');
        if (localLeaders) {
            let leaders: Scores[] = JSON.parse(localLeaders)
            leaders.push({ name: username(), date: new Date(), score: props.score })
            leaders.sort((a, b) => b.score - a.score).slice(0, 1000);
            localStorage.setItem('g2048', JSON.stringify(leaders))
        }
        else {
            let leaders: Scores[] = [{ name: username(), date: new Date(), score: props.score }]
            localStorage.setItem('g2048', JSON.stringify(leaders))
        }
    }
    async function setGlobal() {
        try {
            await addDoc(collection(db, 'g2048'), {
                name: username(), date: new Date(), score: props.score
            })
        }
        catch (e: any) {
            console.log(e.message)
        }
    }

    return (
        <>
            <div class={styles.gameOver}>
                <div>
                    <h4>{username()}</h4>
                    <h3>Game Over</h3>
                    <h4> {props.score} </h4>
                </div>
                <div class={styles.buttons}>
                    <button onClick={() => {
                        props.setGameOver(false);
                        props.setScore(0)
                        while (props.array.length > 0) props.array.pop()
                    }}>
                        Play Again
                    </button>
                    <button onClick={() => {
                        props.setGameOver(false);
                        props.setScore(0)
                        setSearchParams({ name: undefined })
                        while (props.array.length > 0) props.array.pop()
                    }}>
                        Change Name
                    </button>
                </div>
            </div>
            <div class={styles.game}>
                <Board array={props.array} />
            </div>
        </>
    )
}