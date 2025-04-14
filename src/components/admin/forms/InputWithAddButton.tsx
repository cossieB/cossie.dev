import { mergeProps } from "solid-js";
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
        const val = ref.value.trim();
        if (!val) return;
        props.addItem(val);
        ref.value = ""
    }
    function handleEnter(e: KeyboardEvent) {

        if (e.key == 'Enter')
            addItem()
    }
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
                onKeyUp={handleEnter}
                onKeyPress={e => {
                    if (e.key == "Enter")
                        e.preventDefault()
                }}
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