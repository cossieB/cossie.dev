import { mergeProps, onMount, onCleanup } from "solid-js";
import titleCase from "~/lib/titleCase";
import styles from "./forms.module.scss";
import { PatchPlusSvg } from "~/svgs";

type Props = {
    name: string;
    label?: string;
    required?: boolean;
    addItem(item: string): void
    disabled: boolean;
};

export function InputWithAddButton(props: Props) {
    let ref!: HTMLInputElement;
    const merged = mergeProps({ label: props.name, required: false }, props);
    function addItem () {
        props.addItem(ref.value.trim());
        ref.value = ""
    }
    function handleEnter(e: KeyboardEvent) {
        if (e.key == 'Enter')
            addItem()
    }
    onMount(() => {
        ref.addEventListener('keyup', handleEnter )
        
        onCleanup(() => {
            ref.removeEventListener('keyup', handleEnter)
        })
    })
    return (
        <div class={styles.formControl}>
            <input
                ref={ref}
                type="text"
                name={`${merged.name}Input`}
                id={`${merged.name}`}
                required={merged.required}
                placeholder=" "
                disabled={props.disabled}
                autocomplete="off" 
                />
            <label for={`${merged.name}`}>{titleCase(merged.label)}</label>
            <button
                type="button"
                class={styles.addBtn}
                onclick={addItem}>
                <PatchPlusSvg />
            </button>
        </div>
    );
}