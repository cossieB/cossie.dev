import { Show, createSignal } from "solid-js";
import { useBoardKeys } from "../hooks/useBoardKeys";
import type { PlayStore } from "../state/play";
import type { Difficulty } from "../sudoku/logic";
import Board from "./Board";
import Button from "./Button";
import NumberPad from "./NumberPad";
import styles from "./PlayMode.module.css";

const LEVELS: { id: Difficulty; label: string }[] = [
  { id: "easy", label: "Easy" },
  { id: "medium", label: "Medium" },
  { id: "hard", label: "Hard" },
];

export default function PlayMode(props: { play: PlayStore }) {
  // Created once in App and never swapped, so this is a stable reference.
  const play = props.play;
  const game = play.game;

  // UI-only choice for the *next* game, so a signal is the right tool here.
  const [level, setLevel] = createSignal<Difficulty>("medium");

  useBoardKeys({
    digit: play.enter,
    erase: play.erase,
    move: play.move,
    toggleNotes: play.toggleNotes,
  });

  const title = () =>
    game.difficulty === "custom"
      ? "Your puzzle"
      : `${LEVELS.find((l) => l.id === game.difficulty)?.label} puzzle`;

  const hintText = () =>
    game.hintsUsed === 0
      ? "No hints used"
      : `${game.hintsUsed} hint${game.hintsUsed === 1 ? "" : "s"} used`;

  return (
    <section class={styles.mode}>
      <div class={styles.setup}>
        <div class={styles.levels} role="group" aria-label="Difficulty for the next game">
          {LEVELS.map((l) => (
            <Button pressed={level() === l.id} onClick={() => setLevel(l.id)}>
              {l.label}
            </Button>
          ))}
        </div>
        <Button variant="primary" onClick={() => play.newGame(level())}>
          New game
        </Button>
      </div>

      <p class={styles.status}>
        <strong>{title()}</strong>
        <span>{hintText()}</span>
      </p>

      <Board
        label="Sudoku board"
        cells={game.cells}
        conflicts={play.conflicts}
        selected={game.selected}
        onSelect={play.select}
      />

      <Show when={play.solved()}>
        <div class={styles.win} role="status">
          <p class={styles.winText}>
            Solved. {hintText()}.
          </p>
          <Button variant="primary" onClick={() => play.newGame(level())}>
            Play again
          </Button>
        </div>
      </Show>

      <div class={styles.tools}>
        <Button pressed={game.notesMode} onClick={play.toggleNotes}>
          Notes {game.notesMode ? "on" : "off"}
        </Button>
        <Button onClick={play.erase}>Erase</Button>
        <Button onClick={play.hint}>Hint</Button>
      </div>

      <NumberPad remaining={play.remaining} onPick={play.enter} />

      <p class={styles.keys}>Keys: 1–9 to enter, arrows to move, N for notes, Backspace to erase.</p>
    </section>
  );
}
