import { createSignal, mergeProps } from "solid-js";
import styles from "./DropZone.module.scss";
import { readFile } from "../../../lib/readFile";

export type Props = {
    onAdd(param: string): void
    text?: string
    fileLimit?: number
    currentNum?: number
    setFiles: (files: File[]) => void
}

export function DropZone(props: Props) {
    const [entered, setEntered] = createSignal(false)
    const merged = mergeProps({ text: "Drop Image Here", fileLimit: 1, currentNum: 0 }, props)
    return (
        <div
            class={styles.z}
            classList={{ [styles.enter]: entered() }}
            onDragOver={e => {
                e.preventDefault()
                setEntered(true)
            }}
            onDrop={e => {
                e.preventDefault()
                if (!e.dataTransfer) return;
                if (e.dataTransfer.getData("URL")) {
                    props.setFiles(Array.from(e.dataTransfer.files))
                    props.onAdd(e.dataTransfer.getData("URL"))
                }
                else {
                    const limit = merged.fileLimit - merged.currentNum;
                    const files = Array.from(e.dataTransfer.files)
                        .slice(0, limit)
                        .filter(file => file.type.startsWith("image/"))

                    files.forEach(file => readFile(props.onAdd, file))
                    props.setFiles(files)
                }
                setEntered(false)
            }}
            onDragLeave={() => setEntered(false)}
        >
            {props.text}
        </div >
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
