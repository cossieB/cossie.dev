import { mergeProps } from "solid-js";
import styles from "./Contact.module.scss"
import titleCase from "~/lib/titleCase";

type Props = {
    name: string
    label?: string,
    required?: boolean
}

export function FormInput(props: Props) {
    const merged = mergeProps({ label: props.name, required: true }, props)
    return (
        <div class={styles.formControl}>
            <input type={props.name.toLowerCase().includes("email") ? 'email' : 'text'} name={merged.name} id={merged.name} required={merged.required} placeholder=" " />
            <label for={merged.name}>{titleCase(merged.label)}</label>
        </div>
    )
}

export function FormTextarea(props: Props) {
    const merged = mergeProps({ label: props.name, required: true }, props)
    return (
        <div class={styles.formControl}>
            <textarea name={merged.name} id={merged.name} required={merged.required} placeholder=" " />
            <label for={merged.name}>{titleCase(merged.label)}</label>
        </div>
    )
}