import { For, JSX, mergeProps } from "solid-js";
import styles from "./forms.module.scss"
import titleCase from "~/lib/titleCase";
import {type  Require } from "~/lib/utilityTypes";

type T = JSX.InputHTMLAttributes<HTMLInputElement>

export function FormInput(props: Require<T, 'name'>) {
    const merged = mergeProps({ label: props.name, required: true }, props)
    return (
        <div class={styles.formControl}>
            <input {...props} type={props.type ?? 'text'} autocomplete="off" name={merged.name} id={merged.name} required={merged.required} placeholder=" " />
            <label for={merged.name}>{titleCase(merged.label)}</label>
        </div>
    )
}

type U = JSX.InputHTMLAttributes<HTMLTextAreaElement>

export function FormTextarea(props: U & { label: string }) {
    const merged = mergeProps({ label: props.name, required: true }, props)
    return (
        <div class={styles.formControl}>
            <textarea {...props} name={merged.name} id={merged.name} required={merged.required} placeholder=" " />
            <label for={merged.name}>{titleCase(merged.label)}</label>
        </div>
    )
}
type P = Require<T, 'name'> & {
    default?: string
    label: string
    arr:
    | string[]
    | {
        value: string,
        label: string
    }[]
}
export function SelectInput(props: P) {
    const merged = mergeProps({ label: props.name, required: true }, props)
    return (
        <div class={styles.formControl}>
            <select name={merged.name} id={merged.name}>
                <option value="" disabled selected={!!!props.default}>{titleCase(props.label)}</option>
                <For each={props.arr}>
                    {item =>
                        <SelectOption
                            item={item}
                            default={props.default}
                        />
                    }
                </For>
            </select>
        </div>
    )
}

type P1 = {
    item: P['arr'][number]
    default?: string
}
function SelectOption(props: P1) {
    const value = typeof props.item == 'string' ? props.item : props.item.value
    const label = typeof props.item == 'string' ? props.item : props.item.label
    const selected = () => props.default === value
    return (
        <option
            value={value}
            selected={selected()}
        >
            {label}
        </option>
    )
}