import { mergeProps } from "solid-js";
import titleCase from "~/lib/titleCase";
import styles from "./forms.module.scss";

type Props = {
    name: string;
    label?: string;
    required?: boolean;
    addItem(item: string): boolean
    disabled: boolean;
};

export function InputWithAddButton(props: Props) {
    let ref!: HTMLInputElement;
    const merged = mergeProps({ label: props.name, required: false }, props);
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
                autocomplete="off" />
            <label for={`${merged.name}`}>{titleCase(merged.label)}</label>
            <button
                type="button"
                style={{ "background-color": "var(--clrRed)" }}
                onclick={() => {
                    const success = props.addItem(ref.value);
                    success && (ref.value = "")
                }}>
                <i class="bi bi-patch-plus" />
            </button>
        </div>
    );
}
