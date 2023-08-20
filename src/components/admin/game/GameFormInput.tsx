import { JSX, Setter } from "solid-js"
import { Require } from "~/lib/utilityTypes"
import { FormInput } from "../forms/FormInput"

type X = JSX.InputHTMLAttributes<HTMLInputElement>
type Y = JSX.InputHTMLAttributes<HTMLTextAreaElement>

type Props<T> = {
    obj: T
    name: keyof T & string
    mutate?: Setter<T>
} & X

export function MutationFormInput<T>(props: Props<T>) {
    return <FormInput
        {...props}
        onchange={e => props.mutate(prev => ({ ...prev, Game: { ...prev.Game, [props.name]: e.target.value } }))}
    />
}