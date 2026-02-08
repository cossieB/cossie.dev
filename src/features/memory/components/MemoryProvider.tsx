import { type JSX, createContext } from "solid-js";
import { useMemory } from "../utils/store";

export const MemoryContext = createContext<ReturnType<typeof useMemory>>()

export default function MemoryProvider(props: { children: JSX.Element }) {

    return (
        <MemoryContext.Provider value={useMemory()}>
            {props.children}
        </MemoryContext.Provider>
    )
}

