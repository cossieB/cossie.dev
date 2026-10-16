import { createContext, Element } from "solid-js";
import { useMemory } from "../utils/store";

export const MemoryContext = createContext<ReturnType<typeof useMemory>>()

export default function MemoryProvider(props: { children: Element }) {

    return (
        <MemoryContext value={useMemory()}>
            {props.children}
        </MemoryContext>
    )
}

