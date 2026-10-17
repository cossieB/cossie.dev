import { Setter, onSettled, onCleanup, StoreSetter, flush } from "solid-js";
import { Block } from "../components/ControlElem";
import { createBlock, SIZE } from "./createBlock";

const validKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'] as const;
interface P {
    addScore(s: number): void
    setGameOver: Setter<boolean>
    array: Block[]
    setArray: StoreSetter<Block[]>
}



export function use2048Logic(props: P) {
    onSettled(() => {
        document.addEventListener('keydown', handleKeyPress);
        props.setArray(state => {
            createBlock(state)
            createBlock(state)
        })
        return () => document.removeEventListener('keydown', handleKeyPress)
    })

    function handleKeyPress(e: KeyboardEvent) {
        type Key = typeof validKeys[number];
        if (!validKeys.includes(e.key as Key)) return;
        const key = e.key as Key;

        switch (key) {
            case 'ArrowDown':
                move('down');
                break;
            case 'ArrowUp':
                move('up');
                break;
            case 'ArrowLeft':
                move('left');
                break;
            case 'ArrowRight':
                move('right');
                break;
        }
    }


    /** True when the grid is full and no neighbouring blocks share a value. */
    function isGameOver(draft: Block[]): boolean {
        if (draft.length < SIZE * SIZE) return false

        const grid: number[][] = Array.from({ length: SIZE }, () =>
            new Array<number>(SIZE).fill(0)
        )
        for (const b of draft) grid[b.top][b.left] = b.value

        for (let r = 0; r < SIZE; r++) {
            for (let c = 0; c < SIZE; c++) {
                if (c + 1 < SIZE && grid[r][c] === grid[r][c + 1]) return false
                if (r + 1 < SIZE && grid[r][c] === grid[r + 1][c]) return false
            }
        }
        return true
    }
    type Direction = 'up' | 'down' | 'left' | 'right'

    function move(direction: Direction): boolean {
        const horizontal = direction === 'left' || direction === 'right'
        const towardStart = direction === 'left' || direction === 'up'
        const axis = horizontal ? 'left' : 'top'
        const line = horizontal ? 'top' : 'left'

        let moved = false
        let score = 0
        let gameOver = false

        props.setArray((draft) => {
            const lines = new Map<number, number[]>()
            for (let i = 0; i < draft.length; i++) {
                const key = draft[i][line]
                const group = lines.get(key)
                if (group) group.push(i)
                else lines.set(key, [i])
            }

            const removed: number[] = []

            for (const indices of lines.values()) {
                indices.sort((a, b) =>
                    towardStart
                        ? draft[a][axis] - draft[b][axis]
                        : draft[b][axis] - draft[a][axis]
                )

                let slot = towardStart ? 0 : SIZE - 1
                const step = towardStart ? 1 : -1
                let last = -1
                let lastMerged = false

                for (const i of indices) {
                    const block = draft[i]

                    if (last !== -1 && !lastMerged && draft[last].value === block.value) {
                        draft[last].value *= 2
                        score += draft[last].value // sum of both merged blocks
                        block[axis] = draft[last][axis]
                        removed.push(i)
                        lastMerged = true
                        moved = true
                    } else {
                        if (block[axis] !== slot) {
                            block[axis] = slot
                            moved = true
                        }
                        last = i
                        lastMerged = false
                        slot += step
                    }
                }
            }

            removed.sort((a, b) => b - a)
            for (const i of removed) draft.splice(i, 1)

            // Only a move that changed something spawns a block / can end the game
            if (moved) {
                createBlock(draft)
                gameOver = isGameOver(draft)
            }
        })

        if (score > 0) props.addScore(score)
        if (gameOver) props.setGameOver(true)

        return moved
    }



    return move
}

