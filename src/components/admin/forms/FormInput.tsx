import { For, JSX, mergeProps } from "solid-js";
import styles from "./forms.module.scss"
import titleCase from "~/lib/titleCase";
import {type  Require } from "~/lib/utilityTypes";
import { ChangeEvent } from "~/lib/solidTypes";
import { SetStoreFunction } from "solid-js/store";

function getOnChange<X extends INPUTS>(props: Pick<Props<X>, 'name' | 'setter'>) {
    return function onchange(e: ChangeEvent<X>) {
        props.setter(props.name, e.target.value.trim());
    }
}
export function FormInput(props: Props) {
    const merged = mergeProps({ label: props.name, required: true }, props)
    return (
        <div class={styles.formControl}>
            <input {...props} onchange={getOnChange(props)} type={props.type ?? 'text'} autocomplete="off" name={merged.name} id={merged.name} required={merged.required} placeholder=" " />
            <label for={merged.name}>{titleCase(merged.label)}</label>
        </div>
    )
}

export function FormTextarea(props: Props<HTMLTextAreaElement>) {
    const merged = mergeProps({ label: props.name, required: true }, props)
    return (
        <div class={styles.formControl}>
            <textarea {...props} name={merged.name} onchange={getOnChange(props)} id={merged.name} required={merged.required} placeholder=" " />
            <label for={merged.name}>{titleCase(merged.label)}</label>
        </div>
    )
}

export function SelectInput(props: P) {
    const merged = mergeProps({ label: props.name, required: true }, props)
    return (
        <div class={styles.formControl}>
            <select name={merged.name} id={merged.name} onchange={getOnChange(props)}>
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
type P = Require<InputProps<HTMLSelectElement>, 'name'> & {
    setter: SetStoreFunction<any>
    default?: string
    label: string
    arr:
    | string[]
    | {
        value: string,
        label: string
    }[]
}
type P1 = {
    item: P['arr'][number]
    default?: string
}
type INPUTS =  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
type InputProps<X extends INPUTS > = JSX.InputHTMLAttributes<X>
type Props<X extends INPUTS = HTMLInputElement> = Require<InputProps<X>, 'name'> & {
    setter: SetStoreFunction<any>
}