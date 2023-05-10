import { JSX, createContext } from "solid-js";
import { PomodoroWrapper, initialState } from "./store";
import { createStore } from "solid-js/store";
import { useAudio, useAudios } from "~/hooks/useAudio";
import { convert } from "./convert";

export const PomodoroContext = createContext<PomodoroWrapper>()

export default function PomodoroProvider(props: { children: JSX.Element }) {
    // const [endBeep, startBeep] = useAudios(["https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav", "https://www.soundjay.com/buttons/beep-05.wav"])
    const endBeep = new Audio("https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav")
    const startBeep = new Audio("https://www.soundjay.com/buttons/beep-05.wav")
    const [store, setState] = createStore({
        breakMin: 5,
        sessionMin: 25,
        seconds: 1500,
        break: 300,
        left: () => convert(store.seconds),
        breakTime: () => convert(store.break),
        sessionLength: 1500,
        timer: null as NodeJS.Timer | null
    })
    const state = new PomodoroWrapper(
        store,
        setState,
        endBeep,
        startBeep
    )
    return (
        <PomodoroContext.Provider value={state}>
            {props.children}
        </PomodoroContext.Provider>
    )
}