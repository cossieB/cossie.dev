import styles from "~/components/admin/forms/forms.module.scss";

type Props = {
    name: string
    value: string
    setter: (val: string) => void
    ref?: HTMLDivElement
}

export default function CustomTextarea(props: Props) {
    return (
        <div
            contentEditable
            innerHTML={props.value}
            onblur={e => props.setter(e.target.innerHTML)}
            class={styles.editable}
            ref={props.ref}
        />
    )
}
