import { createContext, Element } from "solid-js";
import { PomodoroWrapper, initialState } from "../utils/store";
import { createStore } from "solid-js";
import { convert } from "../utils/convert";
import startWav from "../assets/start.mp3"
import endWav from "../assets/end.wav"

export const PomodoroContext = createContext<PomodoroWrapper>()

export default function PomodoroProvider(props: { children: Element }) {
    
    const endBeep = new Audio(endWav)
    const startBeep = new Audio(startWav)
    const [store, setState] = createStore({
        breakLength: 300,
        sessionLength: 1500,
        seconds: 1500,
        break: 300,
        left: () => convert(store.seconds),
        breakTime: () => convert(store.break),
        timer: -1
    })
    const state = new PomodoroWrapper(
        store,
        setState,
        endBeep,
        startBeep
    )
    return (
        <PomodoroContext value={state}>
            {props.children}
        </PomodoroContext>
    )
}