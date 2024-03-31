import { For, Match, Switch, createSignal, mergeProps } from "solid-js";
import styles from "./DropZone.module.scss";
import { createStore } from "solid-js/store";

export type Props = {
    images: { url: string, file: File | null }[]
    text?: string
    fileLimit?: number
    currentNum?: number
}

const MAX_FILE_SIZE = 8

export function DropZone(props: Props) {
    let input!: HTMLInputElement

    const [entered, setEntered] = createSignal(false);
    const [progress, setProgress] = createSignal(0)
    const merged = mergeProps({ text: "Drop Image Here", fileLimit: 1, currentNum: 0 }, props);
    const [files, setFiles] = createSignal<{ url: string, file: File }[]>([])
    const limit = merged.fileLimit - merged.currentNum;

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
            onclick={() => {
                input.click();
            }}
        >
            <div class={styles.preview}>
                <For each={files()}>
                    {file =>  <img src={file.url} alt="" />}
                </For>
               
            </div>
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

    function selectFiles(fileList: File[]) {
        const remainder = 8 - files().length
        const urls = fileList
            .filter(file => file.type.match(/(image|video)/) && file.size < MAX_FILE_SIZE * 1024 * 1024)
            .map(file => ({ url: URL.createObjectURL(file), file })).slice(0, remainder);
        setFiles(prev => [...prev, ...urls])
        setEntered(false)
    }
}