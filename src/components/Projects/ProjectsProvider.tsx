import { type Accessor, type JSX, type Setter, createContext, createSignal } from "solid-js";
import { type Projs } from "./projectArray";

type Ctx = {
    selected: Accessor<Projs | null>
    setSelected: Setter<Projs | null>
}

export const ProjectsContext = createContext<Ctx>()

export function ProjectsProvider(props: {children: JSX.Element}) {
    const [selected, setSelected] = createSignal<Projs | null>(null)
    return (
        <ProjectsContext.Provider value={{selected, setSelected}} >
            {props.children}
        </ProjectsContext.Provider>
    )
}