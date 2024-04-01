import { For, Match, Show, Switch, createSignal, mergeProps } from "solid-js";
import styles from "./DropZone.module.scss";
import { createStore } from "solid-js/store";

export type Props = {
    images: { url: string, file: File | null }[]
    setImages: (obj: { url: string, file: File | null }[]) => void
    text?: string
    fileLimit?: number
    currentNum?: number
}

const MAX_FILE_SIZE = 8

export function DropZone(props: Props) {
    let input!: HTMLInputElement

    const [entered, setEntered] = createSignal(false);
    const merged = mergeProps({ text: "Drop Image Here", fileLimit: 1, currentNum: 0 }, props);
    const limit = merged.fileLimit - merged.currentNum;

    function selectFiles(fileList: File[]) {
        const remainder = 8 - props.images.length
        const urls = fileList
            .filter(file => file.type.match(/(image|video)/) && file.size < MAX_FILE_SIZE * 1024 * 1024)
            .map(file => ({ url: URL.createObjectURL(file), file }))
        if (merged.fileLimit === 1) 
            props.setImages(urls.slice(0, 1))
        else {
            props.setImages([...props.images, ...urls].slice(0, merged.fileLimit))
        }
        setEntered(false)
    }

    return (
        <div
            class={`${styles.z}`}
            classList={{ [styles.enter]: entered() }}
            onDragOver={e => {
                e.preventDefault()
                setEntered(true)
            }}
            onDrop={async e => {
                e.preventDefault()
                if (!e.dataTransfer?.files) return;
                selectFiles(Array.from(e.dataTransfer?.files))
            }}
            onDragLeave={() => setEntered(false)}
            onclick={() => input.click()}
        >
            <Show when={props.images.length === 1}>
                <img src={props.images[0].url} />
            </Show>
            <label class={styles.label} >{props.text}</label>
            <input
                type="file"
                accept="image/*"
                hidden
                ref={input}
                multiple
                onchange={e => {
                    if (!e.target.files) return;
                    selectFiles(Array.from(e.target.files))
                }}
            />
        </div>
    )
}