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
        breakMin: 5,
        sessionMin: 25,
        seconds: 1500,
        break: 300,
        left: () => convert(store.seconds),
        breakTime: () => convert(store.break),
        sessionLength: 1500,
        timer: null as NodeJS.Timeout | null
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