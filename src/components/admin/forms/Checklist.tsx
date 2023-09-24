import styles from "~/components/admin/forms/forms.module.scss";
import { For } from "solid-js";
import { KeysWithValuesOfType } from "~/lib/utilityTypes";

type P<T> = {
    items: T[]
    arr: string[]
    setArray: (newArr: string[]) => void
    idField: KeysWithValuesOfType<T, string>
    valueField: KeysWithValuesOfType<T, string>
}

export function Checklist<T>(props: P<T>) {
    return (
        <div class={styles.checklist}>
            <For each={props.items ?? []}>
                {item =>
                    <div class={styles.checkGroup}>
                        <input onchange={(e) => {
                            if (e.target.checked)
                                props.setArray([...props.arr, e.target.value])
                            else
                                props.setArray(props.arr.filter(x => x !== e.target.value))
                        }}
                            type="checkbox"
                            value={item[props.idField] as string}
                            id={item[props.idField] as string}
                            
                            checked={props.arr.includes(item[props.idField] as string)}
                        />
                        <label for={item[props.idField] as string}>{item[props.valueField] as string}</label>
                    </div>
                }
            </For>
        </div>
    )
}