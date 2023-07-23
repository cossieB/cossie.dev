import { ICellEditorParams, ICellEditor } from "ag-grid-community"
import { createEffect } from "solid-js"
import { ChangeEvent } from "~/lib/solidTypes"
import styles from "./DataEditor.module.scss"

export default function DataEditor(props: ICellEditorParams) {
    let value = props.value
    let inputRef!: HTMLInputElement
    const api: ICellEditor = {
        getValue: () => value,

    };
    
    (props as any).ref(api)
    const onValueChanged = (event: ChangeEvent<HTMLInputElement>) => {
        value = event.target.value
        console.log("value now is " + value)
    };

    createEffect(() => {
        inputRef.focus();
    });

    return (
        <input
            class={styles.input}
            ref={inputRef}
            value={value}
            onChange={onValueChanged}
        />
    );
}