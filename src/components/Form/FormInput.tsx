import styles from "./Form.module.css"
import { JSX } from "@solidjs/web/jsx-runtime"

type Props<T extends object> = {
    label: string
    onInput: JSX.InputHTMLAttributes<HTMLInputElement>['onInput'];    
    value: string
}

export function FormInput<T extends object>(props: Props<T>) {
    return (
        <div class={styles.formControl}>
            <input
                type="text"
                onInput={props.onInput}
                value={props.value}
            />
            <label> {props.label} </label>
        </div>
    )
}