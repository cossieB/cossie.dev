import { Show } from "solid-js";
import { DIGITS } from "../sudoku/logic";
import styles from "./NumberPad.module.css";

export interface NumberPadProps {
  onPick: (n: number) => void;
  /** Index n holds how many of digit n are still to place. Omit to hide counts. */
  remaining?: number[];
}

export default function NumberPad(props: NumberPadProps) {
  return (
    <div class={styles.pad}>
      {DIGITS.map((n) => (
        <button
          type="button"
          class={{ [styles.key]: true, [styles.done]: props.remaining?.[n] === 0 }}
          onClick={() => props.onPick(n)}
        >
          <span class={styles.digit}>{n}</span>
          <Show when={props.remaining}>
            <span class={styles.left}>{props.remaining?.[n]}</span>
          </Show>
        </button>
      ))}
    </div>
  );
}
