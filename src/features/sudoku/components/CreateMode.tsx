import { Show } from "solid-js";
import { useBoardKeys } from "../hooks/useBoardKeys";
import type { EditorStore } from "../state/editor";
import Board from "./Board";
import Button from "./Button";
import styles from "./CreateMode.module.css";
import NumberPad from "./NumberPad";

export default function CreateMode(props: { editor: EditorStore; onPlay: () => void }) {
  // Created once in App and never swapped, so this is a stable reference.
  const editor = props.editor;
  const state = editor.state;

  useBoardKeys({
    digit: editor.enter,
    erase: editor.erase,
    move: editor.move,
  });

  const hasSolution = () => state.status === "unique" || state.status === "multiple";

  return (
    <section class={styles.mode}>
      <p class={styles.intro}>
        Enter the clues for your own puzzle, then press Solve to see its solution.
      </p>

      <Board
        label="Puzzle editor"
        cells={state.cells}
        conflicts={editor.conflicts}
        selected={state.selected}
        onSelect={editor.select}
      />

      <p
        class={{
          [styles.message]: true,
          [styles.good]: editor.message().tone === "good",
          [styles.warn]: editor.message().tone === "warn",
          [styles.bad]: editor.message().tone === "bad",
        }}
        role="status"
      >
        {editor.message().text}
      </p>

      <NumberPad onPick={editor.enter} />

      <div class={styles.tools}>
        <Button onClick={editor.erase}>Erase</Button>
        <Show
          when={hasSolution()}
          fallback={<Button onClick={editor.clearAll}>Clear all</Button>}
        >
          <Button onClick={editor.clearSolution}>Clear solution</Button>
        </Show>
      </div>

      <div class={styles.actions}>
        <Button variant="primary" disabled={!editor.canSolve()} onClick={editor.solve}>
          Solve
        </Button>
        <Button disabled={!editor.canSolve()} onClick={props.onPlay}>
          Play this puzzle
        </Button>
      </div>
    </section>
  );
}
