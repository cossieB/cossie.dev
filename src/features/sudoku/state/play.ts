import { createMemo, createProjection, createStore } from "solid-js";
import {
  CELLS,
  PEERS,
  colOf,
  generatePuzzle,
  makeCell,
  rowOf,
  type CellData,
  type Difficulty,
} from "../sudoku/logic";
import { createConflicts } from "./conflicts";

export type PlayState = {
  cells: CellData[];
  solution: number[];
  selected: number | null;
  notesMode: boolean;
  difficulty: Difficulty | "custom";
  hintsUsed: number;
};

function freshState(difficulty: Difficulty): PlayState {
  const { puzzle, solution } = generatePuzzle(difficulty);
  return {
    cells: puzzle.map((value, index) => makeCell(index, value, value ? "given" : "player")),
    solution,
    selected: null,
    notesMode: false,
    difficulty,
    hintsUsed: 0,
  };
}

/**
 * Overwrite the board in place. Writing to the existing cell objects (instead
 * of assigning a new `cells` array) means the 81 DOM cells are reused and only
 * the properties that changed update.
 */
function loadInto(
  draft: PlayState,
  puzzle: readonly number[],
  solution: readonly number[],
  difficulty: PlayState["difficulty"]
) {
  for (let i = 0; i < CELLS; i++) {
    const cell = draft.cells[i];
    cell.value = puzzle[i];
    cell.kind = puzzle[i] ? "given" : "player";
    for (let n = 0; n < 9; n++) cell.notes[n] = false;
    draft.solution[i] = solution[i];
  }
  draft.selected = null;
  draft.notesMode = false;
  draft.difficulty = difficulty;
  draft.hintsUsed = 0;
}

/** Place a digit and sweep that digit's pencil marks out of the cell's peers. */
function place(draft: PlayState, index: number, value: number) {
  const cell = draft.cells[index];
  cell.value = value;
  cell.kind = "player";
  for (let n = 0; n < 9; n++) cell.notes[n] = false;
  for (const p of PEERS[index]) draft.cells[p].notes[value - 1] = false;
}

export function createPlayStore() {
  const [game, setGame] = createStore<PlayState>(freshState("medium"));

  // --- Derived state -------------------------------------------------------

  const conflicts = createConflicts(() => game.cells);

  /** How many of each digit are still to place (index 1..9; index 0 unused). */
  const remaining = createProjection<number[]>(
    (draft) => {
      const left = Array<number>(10).fill(9);
      for (let i = 0; i < CELLS; i++) {
        const v = game.cells[i].value;
        if (v) left[v]--;
      }
      for (let n = 1; n <= 9; n++) draft[n] = Math.max(0, left[n]);
    },
    Array<number>(10).fill(9)
  );

  /** Solved = every cell filled and no rule broken. */
  const solved = createMemo(() => {
    for (let i = 0; i < CELLS; i++) {
      if (!game.cells[i].value || conflicts[i]) return false;
    }
    return true;
  });

  // --- Actions (all writes go through the draft setter) ---------------------

  function select(index: number) {
    setGame((draft) => {
      draft.selected = index;
    });
  }

  function move(dRow: number, dCol: number) {
    setGame((draft) => {
      if (draft.selected === null) {
        draft.selected = 40; // centre cell
        return;
      }
      const row = Math.min(8, Math.max(0, rowOf(draft.selected) + dRow));
      const col = Math.min(8, Math.max(0, colOf(draft.selected) + dCol));
      draft.selected = row * 9 + col;
    });
  }

  function enter(n: number) {
    if (solved()) return;
    setGame((draft) => {
      const i = draft.selected;
      if (i === null) return;
      const cell = draft.cells[i];
      if (cell.kind === "given") return;

      if (draft.notesMode) {
        if (cell.value === 0) cell.notes[n - 1] = !cell.notes[n - 1];
        return;
      }
      if (cell.value === n) {
        cell.value = 0; // pressing the same digit again clears it
        return;
      }
      place(draft, i, n);
    });
  }

  function erase() {
    if (solved()) return;
    setGame((draft) => {
      const i = draft.selected;
      if (i === null) return;
      const cell = draft.cells[i];
      if (cell.kind === "given") return;
      cell.value = 0;
      for (let n = 0; n < 9; n++) cell.notes[n] = false;
    });
  }

  function toggleNotes() {
    setGame((draft) => {
      draft.notesMode = !draft.notesMode;
    });
  }

  /** Fill the selected cell if it's empty or wrong, otherwise the first such cell. */
  function hint() {
    if (solved()) return;
    setGame((draft) => {
      const needsHelp = (i: number) =>
        draft.cells[i].kind !== "given" && draft.cells[i].value !== draft.solution[i];

      let target = draft.selected !== null && needsHelp(draft.selected) ? draft.selected : -1;
      for (let i = 0; target === -1 && i < CELLS; i++) if (needsHelp(i)) target = i;
      if (target === -1) return;

      place(draft, target, draft.solution[target]);
      draft.selected = target;
      draft.hintsUsed++;
    });
  }

  function newGame(difficulty: Difficulty) {
    const { puzzle, solution } = generatePuzzle(difficulty);
    setGame((draft) => {
      loadInto(draft, puzzle, solution, difficulty);
    });
  }

  /** Used by the editor's "Play this puzzle" button. */
  function loadPuzzle(puzzle: readonly number[], solution: readonly number[]) {
    setGame((draft) => {
      loadInto(draft, puzzle, solution, "custom");
    });
  }

  return {
    game,
    conflicts,
    remaining,
    solved,
    select,
    move,
    enter,
    erase,
    toggleNotes,
    hint,
    newGame,
    loadPuzzle,
  };
}

export type PlayStore = ReturnType<typeof createPlayStore>;
