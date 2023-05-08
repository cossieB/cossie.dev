import { onCleanup, onMount, useContext } from "solid-js"
import Board from "./Board"
import { MemoryContext } from "./MemoryProvider"

export default function GameStart() {
    let timer: NodeJS.Timer
    const state = useContext(MemoryContext)!
    onMount(() => {
        timer = setInterval(() => {
            state.increaseTime()
        }, 1000)
    })

    onCleanup(() => {
        clearInterval(timer)
    })
    
    
    return (
        <>
            <Board />
        </>
    )
}
