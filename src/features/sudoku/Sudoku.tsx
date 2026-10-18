import { Show, createSignal } from "solid-js";
import styles from "./Sudoku.module.css";
import CreateMode from "./components/CreateMode";
import PlayMode from "./components/PlayMode";
import { createEditorStore } from "./state/editor";
import { createPlayStore } from "./state/play";

type Mode = "play" | "create";

export default function Sudoku() {
  // Both stores live here so switching tabs never loses your board.
  const play = createPlayStore();
  const editor = createEditorStore();

  const [mode, setMode] = createSignal<Mode>("play");

  function playCustomPuzzle() {
    const exported = editor.exportPuzzle();
    if (!exported) return; // the editor's message explains why
    play.loadPuzzle(exported.puzzle, exported.solution);
    setMode("play");
  }

  return (
    <div class={styles.app}>
      <header class={styles.header}>
        <h1 class={styles.title}>Sudoku</h1>
        <div class={styles.tabs} role="tablist" aria-label="Mode">
          <button
            type="button"
            role="tab"
            class={{ [styles.tab]: true, [styles.active]: mode() === "play" }}
            onClick={() => setMode("play")}
          >
            Play
          </button>
          <button
            type="button"
            role="tab"
            class={{ [styles.tab]: true, [styles.active]: mode() === "create" }}
            onClick={() => setMode("create")}
          >
            Create
          </button>
        </div>
      </header>

      <main>
        <Show
          when={mode() === "play"}
          fallback={<CreateMode editor={editor} onPlay={playCustomPuzzle} />}
        >
          <PlayMode play={play} />
        </Show>
      </main>
    </div>
  );
}
