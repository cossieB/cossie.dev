import { type RowProps } from "./Row";
import styles from "./Wordle.module.css"
import { createEffect } from "solid-js";

interface P extends RowProps {
    letter: string
    index: number
}

export default function LetterBlock(props: P) {
    let ref!: HTMLDivElement
    createEffect(() => {
        const classes: string[] = []
        if (props.guessList.length > props.row) {
            if (props.correctWord[props.index] == props.letter) {
                classes.push(styles.correct)
            }
            else if (props.correctWord.includes(props.letter)) {
                classes.push(styles.ok)
            }
            else {
                classes.push(styles.wrong)
            }
            classes.push(styles[`block${props.index}`])
            ref.className = classes.join(" ")
        }
    })
    return (
        <div class={styles.letterblock} >
            <div class={styles.colorblock} ref={ref!} />
            <div >
                {props.letter && props.letter.toUpperCase()}
            </div>
        </div>
    )
}