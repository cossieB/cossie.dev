import { onSettled, useContext } from "solid-js"
import Board from "./Board"
import { MemoryContext } from "./MemoryProvider"

export default function GameStart() {

    const state = useContext(MemoryContext)!
    onSettled(() => {
        const timer = setInterval(() => {
            state.increaseTime()
        }, 1000)
        return () => clearInterval(timer)
    })

    return <Board />

}
