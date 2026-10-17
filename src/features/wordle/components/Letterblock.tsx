import { type RowProps } from "./Row";
import styles from "./Wordle.module.css"
import { createEffect } from "solid-js";

interface P extends RowProps {
    letter: string
    index: number
}

export default function LetterBlock(props: P) {
    let ref!: HTMLDivElement
    // createEffect(
    //     () => [props.guessList, props.row, props.index, props.letter],
    //     ([guessList, row, index, letter]) => {
    //     const classes: string[] = []
    //     if (guessList.length > row) {
    //         if (props.correctWord[index] == letter) {
    //             classes.push(styles.correct)
    //         }
    //         else if (props.correctWord.includes(letter)) {
    //             classes.push(styles.ok)
    //         }
    //         else {
    //             classes.push(styles.wrong)
    //         }
    //         classes.push(styles[`block${index}`])
    //         ref.className = classes.join(" ")
    //     }
    // })
    const cls = () => {
        if (props.correctWord[props.index] == props.letter) return styles.correct
        if (props.correctWord.includes(props.letter)) return styles.ok
        return styles.wrong
    }
    return (
        <div class={styles.letterblock} >
            <div class={[styles.colorblock, cls(), {[styles.show]: props.guessList.length > props.row}]}  style={{"--delay": props.index}} ref={ref!} />
            <div >
                { props.letter?.toUpperCase()}
            </div>
        </div>
    )
}