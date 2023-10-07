import { type JSX, createContext } from "solid-js";
import { createStore } from "solid-js/store";
import { MemoryWrapper } from "./store";

export const MemoryContext = createContext<MemoryWrapper>()

export default function MemoryProvider(props: {children: JSX.Element}) {
    const initialState = {
        activeCards: [] as { index: number, label: string }[],
        matches: new Set<string>(),
        inputDisabled: false,
        time: 0,
        flips: 0,
        finished: false,
        gameSize: 2
    }
    const [store, setState] = createStore({...initialState})
    const state = new MemoryWrapper(store, setState, initialState)
    return (
        <MemoryContext.Provider value={state}>
            {props.children}
        </MemoryContext.Provider>
    )
}