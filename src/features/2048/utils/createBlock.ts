import { type Block } from "../components/ControlElem";

export const SIZE = 4
let nextId = 0

/** Adds a block on a random empty cell. Works on a draft so it can run inside move's batch. */
export function createBlock(draft: Block[]) {
    const occupied = new Set(draft.map((b) => b.top * SIZE + b.left))
    const empty: number[] = []
    for (let cell = 0; cell < SIZE * SIZE; cell++) {
        if (!occupied.has(cell)) empty.push(cell)
    }
    if (empty.length === 0) return

    const cell = empty[Math.floor(Math.random() * empty.length)]
    const id = nextId++
    draft.push({
        top: Math.floor(cell / SIZE),
        left: cell % SIZE,
        value: Math.random() < 0.75 ? 2 : 4,
    })
}
