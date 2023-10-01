import { SetStoreFunction } from "solid-js/store";
import styles from "~/components/admin/forms/forms.module.scss";
import HiddenInput from "./forms/HiddenInput";

type Props = {
    name: string
    value: string
    setter: (val: string) => void
}

export default function CustomTextarea(props: Props) {
    return (
        <>
            <div
                contentEditable
                innerHTML={props.value}
                onblur={e => props.setter(e.target.innerHTML)}
                class={styles.editable}
            />
            <HiddenInput name={props.name} value={props.value} />
        </>
    )
}
