import { createMemo, createStore } from "solid-js";
import {
  CELLS,
  colOf,
  countSolutions,
  makeCells,
  rowOf,
  type CellData,
} from "../sudoku/logic";
import { createConflicts } from "./conflicts";

export type EditorStatus = "editing" | "unsolvable" | "multiple" | "unique";

export type EditorState = {
  cells: CellData[];
  selected: number | null;
  status: EditorStatus;
};

export type Message = { tone: "info" | "good" | "warn" | "bad"; text: string };

/** Turn solver-filled cells back into empty ones. */
function dropSolution(draft: EditorState) {
  for (let i = 0; i < CELLS; i++) {
    const cell = draft.cells[i];
    if (cell.kind === "solved") {
      cell.value = 0;
      cell.kind = "player";
    }
  }
  draft.status = "editing";
}

export function createEditorStore() {
  const initial: EditorState = { cells: makeCells(), selected: null, status: "editing" };
  const [editor, setEditor] = createStore(initial);

  // --- Derived state -------------------------------------------------------

  const conflicts = createConflicts(() => editor.cells);

  const clues = createMemo(() => {
    let n = 0;
    for (let i = 0; i < CELLS; i++) {
      const cell = editor.cells[i];
      if (cell.kind === "given" && cell.value) n++;
    }
    return n;
  });

  const hasConflicts = createMemo(() => {
    for (let i = 0; i < CELLS; i++) if (conflicts[i]) return true;
    return false;
  });

  const canSolve = createMemo(() => clues() > 0 && !hasConflicts());

  const message = createMemo<Message>(() => {
    if (hasConflicts()) {
      return {
        tone: "bad",
        text: "A digit repeats in a row, column or box. Fix the red cells to continue.",
      };
    }
    switch (editor.status) {
      case "unique":
        return { tone: "good", text: "Solved. This puzzle has exactly one solution." };
      case "multiple":
        return {
          tone: "warn",
          text: "Solved, but this puzzle has more than one solution and this is just one of them. Add clues to make it unique.",
        };
      case "unsolvable":
        return {
          tone: "bad",
          text: "No digit placement satisfies these clues. One of them is probably wrong.",
        };
      default:
        return clues() === 0
          ? { tone: "info", text: "Select a cell and enter your clues, then press Solve." }
          : { tone: "info", text: `${clues()} clue${clues() === 1 ? "" : "s"} entered.` };
    }
  });

  // --- Actions -------------------------------------------------------------

  function select(index: number) {
    setEditor((draft) => {
      draft.selected = index;
    });
  }

  function move(dRow: number, dCol: number) {
    setEditor((draft) => {
      if (draft.selected === null) {
        draft.selected = 40;
        return;
      }
      const row = Math.min(8, Math.max(0, rowOf(draft.selected) + dRow));
      const col = Math.min(8, Math.max(0, colOf(draft.selected) + dCol));
      draft.selected = row * 9 + col;
    });
  }

  function enter(n: number) {
    setEditor((draft) => {
      const i = draft.selected;
      if (i === null) return;
      // Editing a solved board discards the solution first.
      if (draft.status !== "editing") dropSolution(draft);

      const cell = draft.cells[i];
      if (cell.kind === "given" && cell.value === n) {
        cell.value = 0; // same digit again clears the clue
        cell.kind = "player";
      } else {
        cell.value = n;
        cell.kind = "given";
      }
    });
  }

  function erase() {
    setEditor((draft) => {
      const i = draft.selected;
      if (i === null) return;
      if (draft.status !== "editing") dropSolution(draft);
      draft.cells[i].value = 0;
      draft.cells[i].kind = "player";
    });
  }

  function clearSolution() {
    setEditor((draft) => {
      dropSolution(draft);
    });
  }

  function clearAll() {
    setEditor((draft) => {
      for (let i = 0; i < CELLS; i++) {
        draft.cells[i].value = 0;
        draft.cells[i].kind = "player";
      }
      draft.status = "editing";
      draft.selected = null;
    });
  }

  /** The clues the user typed, ignoring anything the solver filled in. */
  function givens(): number[] {
    return editor.cells.map((cell) => (cell.kind === "given" ? cell.value : 0));
  }

  function solve() {
    // Event handlers see committed state, so reading the store here is fine.
    const { count, first } = countSolutions(givens(), 2);
    setEditor((draft) => {
      if (count === 0 || !first) {
        draft.status = "unsolvable";
        return;
      }
      for (let i = 0; i < CELLS; i++) {
        const cell = draft.cells[i];
        if (cell.value === 0 || cell.kind === "solved") {
          cell.value = first[i];
          cell.kind = "solved";
        }
      }
      draft.status = count === 1 ? "unique" : "multiple";
    });
  }

  /**
   * Returns the puzzle and its solution if the clues have exactly one
   * solution. Otherwise runs Solve so the message explains what's wrong.
   */
  function exportPuzzle(): { puzzle: number[]; solution: number[] } | null {
    const puzzle = givens();
    const { count, first } = countSolutions(puzzle, 2);
    if (count !== 1 || !first) {
      solve();
      return null;
    }
    return { puzzle, solution: first };
  }

  return {
    state: editor,
    conflicts,
    clues,
    canSolve,
    message,
    select,
    move,
    enter,
    erase,
    clearSolution,
    clearAll,
    solve,
    exportPuzzle,
  };
}

export type EditorStore = ReturnType<typeof createEditorStore>;
