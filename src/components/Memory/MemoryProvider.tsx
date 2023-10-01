import { type JSX, createContext } from "solid-js";
import { createStore } from "solid-js/store";
import { MemoryWrapper, initialState } from "./store";

export const MemoryContext = createContext<MemoryWrapper>()

export default function MemoryProvider(props: {children: JSX.Element}) {
    const [store, setState] = createStore({...initialState})
    const state = new MemoryWrapper(store, setState)
    return (
        <MemoryContext.Provider value={state}>
            {props.children}
        </MemoryContext.Provider>
    )
}