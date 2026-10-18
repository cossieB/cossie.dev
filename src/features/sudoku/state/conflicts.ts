import { createProjection } from "solid-js";
import { CELLS, findConflicts, type CellData } from "../sudoku/logic";

/**
 * A derived store of 81 booleans: conflicts[i] is true when cell i repeats a
 * digit held by one of its peers.
 *
 * It's a projection (not a memo returning a new array) so each flag is tracked
 * separately. When you type a digit, only the cells whose conflict status
 * actually flipped re-render, because writing an unchanged value to the draft
 * notifies nobody.
 *
 * `cells` is a getter so the store read happens inside the tracking scope.
 */
export function createConflicts(cells: () => CellData[]) {
  return createProjection<boolean[]>(
    (draft) => {
      const next = findConflicts(cells().map((cell) => cell.value));
      for (let i = 0; i < CELLS; i++) draft[i] = next[i];
    },
    Array<boolean>(CELLS).fill(false)
  );
}
