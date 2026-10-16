import { onCleanup, onSettled, useContext } from "solid-js"
import Board from "./Board"
import { MemoryContext } from "./MemoryProvider"

export default function GameStart() {
    let timer: NodeJS.Timeout
    const state = useContext(MemoryContext)!
    onSettled(() => {
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
