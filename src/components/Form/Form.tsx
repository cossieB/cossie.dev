import type { Element } from "solid-js";
import { FormInput } from "./FormInput";
import styles from "./Form.module.css"

type Props = {
    handleSubmit: () => void
    children?: Element;
    disabled: boolean
};

export function Form(props: Props) {
    return (
        <form
            class={styles.form}
            onSubmit={e => {
                e.preventDefault()
                props.handleSubmit()
            }}
        >
            {props.children}
            <button
                type="submit"
                disabled={props.disabled}
            >
                Submit
            </button>
        </form>
    )
}

Form.FormInput = FormInput