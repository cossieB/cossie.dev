import styles from "./Form.module.css"
import { type SetStoreFunction } from "solid-js/store"
import titleCase from "~/lib/titleCase"
import { KeysWithValuesOfType } from "~/lib/utilityTypes"

type Props<T extends object> = {
    label?: string
    setter: SetStoreFunction<T>
    value: string
    field: string & KeysWithValuesOfType<T, string>
}

export function FormInput<T extends object>(props: Props<T>) {
    return (
        <div class={styles.formControl}>
            <input
                type="text"
                oninput={e => props.setter(props.field as any, e.currentTarget.value)}
                value={props.value}
            />
            <label> {props.label ?? titleCase(props.field)} </label>
        </div>
    )
}