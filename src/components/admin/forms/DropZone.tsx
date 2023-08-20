import { createSignal } from "solid-js";
import styles from "./DropZone.module.scss";

export type Props = {
    onAdd(param: string): void
    text?: string
}

export function DropZone(props: Props) {
    const [entered, setEntered] = createSignal(false)
    return (
        <div
            class={styles.z}
            classList={{[styles.enter]: entered()}}
            onDragOver={e => {
                e.preventDefault()
                setEntered(true)
            }}
            onDrop={e => {
                e.preventDefault()
                if (!e.dataTransfer) return;
                console.log(e.dataTransfer.files[0])
                props.onAdd(e.dataTransfer?.getData("URL"))
                setEntered(false)
            }}
            onDragLeave={() => setEntered(false)}
        >
            {props.text || "Drop Image Here"}
        </div>
    )
}

export function DropZoneWithPreview(props: Props & { img?: string; }) {
    return (
        <div class={styles.preview}>
            <img src={props.img ?? "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/800px-Question_mark_%28black%29.svg.png"} alt="" />
            <DropZone {...props} />
        </div>
    );
}
