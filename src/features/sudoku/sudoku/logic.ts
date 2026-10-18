// Pure Sudoku logic. No Solid imports here, so it's trivial to unit test.

export const CELLS = 81;
export const DIGITS = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

export type Difficulty = "easy" | "medium" | "hard";
export type CellKind = "given" | "player" | "solved";

export interface CellData {
  index: number;
  /** 0 means empty */
  value: number;
  kind: CellKind;
  /** Pencil marks. notes[n - 1] is true when digit n is marked. */
  notes: boolean[];
}

// ---------------------------------------------------------------------------
// Geometry
// ---------------------------------------------------------------------------

const ROW = Array.from({ length: CELLS }, (_, i) => Math.floor(i / 9));
const COL = Array.from({ length: CELLS }, (_, i) => i % 9);
const BOX = Array.from(
  { length: CELLS },
  (_, i) => Math.floor(ROW[i] / 3) * 3 + Math.floor(COL[i] / 3)
);

export const rowOf = (i: number) => ROW[i];
export const colOf = (i: number) => COL[i];

export function sharesUnit(a: number, b: number): boolean {
  return a !== b && (ROW[a] === ROW[b] || COL[a] === COL[b] || BOX[a] === BOX[b]);
}

/** For each cell, the 20 other cells that share its row, column or box. */
export const PEERS: readonly (readonly number[])[] = Array.from({ length: CELLS }, (_, i) => {
  const peers: number[] = [];
  for (let j = 0; j < CELLS; j++) if (sharesUnit(i, j)) peers.push(j);
  return peers;
});

// ---------------------------------------------------------------------------
// Cells
// ---------------------------------------------------------------------------

export function emptyNotes(): boolean[] {
  return Array<boolean>(9).fill(false);
}

export function makeCell(index: number, value = 0, kind: CellKind = "player"): CellData {
  return { index, value, kind, notes: emptyNotes() };
}

export function makeCells(): CellData[] {
  return Array.from({ length: CELLS }, (_, i) => makeCell(i));
}

// ---------------------------------------------------------------------------
// Rule checking
// ---------------------------------------------------------------------------

/** result[i] is true when cell i repeats a digit that a peer also holds. */
export function findConflicts(values: readonly number[]): boolean[] {
  const bad = Array<boolean>(CELLS).fill(false);
  for (let i = 0; i < CELLS; i++) {
    const v = values[i];
    if (!v) continue;
    for (const p of PEERS[i]) {
      if (values[p] === v) {
        bad[i] = true;
        break;
      }
    }
  }
  return bad;
}

// ---------------------------------------------------------------------------
// Solver (bitmask backtracking, always branches on the most constrained cell)
// ---------------------------------------------------------------------------

const ALL_DIGITS_MASK = 0b1111111110; // bits 1..9

function popcount(n: number): number {
  let c = 0;
  while (n) {
    n &= n - 1;
    c++;
  }
  return c;
}

export function shuffle<T>(items: readonly T[]): T[] {
  const out = items.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export interface SolveResult {
  /** Number of solutions found, stopping at `limit`. */
  count: number;
  /** The first solution found, or null when there is none. */
  first: number[] | null;
}

export function countSolutions(grid: readonly number[], limit = 2, randomize = false): SolveResult {
  const cells = grid.slice();
  const rows = Array<number>(9).fill(0);
  const cols = Array<number>(9).fill(0);
  const boxes = Array<number>(9).fill(0);

  for (let i = 0; i < CELLS; i++) {
    const v = cells[i];
    if (!v) continue;
    const bit = 1 << v;
    if ((rows[ROW[i]] | cols[COL[i]] | boxes[BOX[i]]) & bit) return { count: 0, first: null };
    rows[ROW[i]] |= bit;
    cols[COL[i]] |= bit;
    boxes[BOX[i]] |= bit;
  }

  let count = 0;
  let first: number[] | null = null;

  // Returns true when the search should stop (limit reached).
  const search = (): boolean => {
    let best = -1;
    let bestMask = 0;
    let bestCount = 10;

    for (let i = 0; i < CELLS; i++) {
      if (cells[i]) continue;
      const mask = ~(rows[ROW[i]] | cols[COL[i]] | boxes[BOX[i]]) & ALL_DIGITS_MASK;
      const n = popcount(mask);
      if (n === 0) return false; // dead end
      if (n < bestCount) {
        best = i;
        bestMask = mask;
        bestCount = n;
        if (n === 1) break;
      }
    }

    if (best === -1) {
      count++;
      if (!first) first = cells.slice();
      return count >= limit;
    }

    const r = ROW[best];
    const c = COL[best];
    const b = BOX[best];

    for (const v of randomize ? shuffle(DIGITS) : DIGITS) {
      const bit = 1 << v;
      if (!(bestMask & bit)) continue;
      cells[best] = v;
      rows[r] |= bit;
      cols[c] |= bit;
      boxes[b] |= bit;
      const stop = search();
      cells[best] = 0;
      rows[r] &= ~bit;
      cols[c] &= ~bit;
      boxes[b] &= ~bit;
      if (stop) return true;
    }
    return false;
  };

  search();
  return { count, first };
}

// ---------------------------------------------------------------------------
// Generator
// ---------------------------------------------------------------------------

/** How many clues to leave. Hard puzzles stop as soon as no more can be removed. */
export const CLUE_TARGET: Record<Difficulty, number> = {
  easy: 40,
  medium: 32,
  hard: 26,
};

function randomSolution(): number[] {
  const grid = Array<number>(CELLS).fill(0);
  // The three diagonal boxes don't constrain each other, so fill them
  // randomly, then let the solver complete the rest in random order.
  for (let box = 0; box < 3; box++) {
    const digits = shuffle(DIGITS);
    for (let k = 0; k < 9; k++) {
      const row = box * 3 + Math.floor(k / 3);
      const col = box * 3 + (k % 3);
      grid[row * 9 + col] = digits[k];
    }
  }
  return countSolutions(grid, 1, true).first!;
}

export function generatePuzzle(difficulty: Difficulty): { puzzle: number[]; solution: number[] } {
  const solution = randomSolution();
  const puzzle = solution.slice();
  const target = CLUE_TARGET[difficulty];
  let clues = CELLS;

  for (const i of shuffle(Array.from({ length: CELLS }, (_, k) => k))) {
    if (clues <= target) break;
    const keep = puzzle[i];
    puzzle[i] = 0;
    // Only keep the removal if the puzzle still has exactly one solution.
    if (countSolutions(puzzle, 2).count === 1) clues--;
    else puzzle[i] = keep;
  }

  return { puzzle, solution };
}
