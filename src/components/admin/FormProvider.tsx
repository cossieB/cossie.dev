import { Accessor, JSX, Setter, createContext } from "solid-js"

export type FormCtx<T> = {
    selected: Accessor<T | null>
    setSelected: Setter<T | null>
}
type P<T> = {
    children: JSX.Element
    selected: Accessor<T | null>
    setSelected: Setter<T | null>
}
export const FormContext = createContext<FormCtx<any>>()

export default function FormProvider<T>(props: P<T>) {
    return (
        <FormContext.Provider value={{ selected: props.selected, setSelected: props.setSelected } as FormCtx<T>}>
            {props.children}
        </FormContext.Provider>
    )
}