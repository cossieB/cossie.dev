import { For, Match, Switch, createSignal, mergeProps } from "solid-js";
import styles from "./DropZone.module.scss";
import { readFile } from "../../../lib/readFile";
import { generateSolidHelpers } from "@uploadthing/solid";
import type { OurFileRouter } from "~/server/uploadthing";
import type { UploadFileResponse } from "uploadthing/client";
import { createStore } from "solid-js/store";

export type Props<T extends keyof OurFileRouter> = {
    images: string[]
    text?: string
    fileLimit?: number
    currentNum?: number
    endpoint: T
    input: OurFileRouter[T]['_def']['_input']
    onError: (err: any) => void
    onSuccess: (res: UploadFileResponse[]) => void
    single: boolean
}

const { useUploadThing } = generateSolidHelpers<OurFileRouter>();

export function DropZone<T extends keyof OurFileRouter>(props: Props<T>) {
    let input!: HTMLInputElement
    const { isUploading, startUpload } = useUploadThing(props.endpoint, {
        onClientUploadComplete(res) {
            props.onSuccess(res ?? [])
        },
        onUploadProgress(p) {
            setProgress(p)
        },
        onUploadError(e) {
            props.onError(e.message);
            setPreviewImgs([])
        },
    })
    const [entered, setEntered] = createSignal(false);
    const [progress, setProgress] = createSignal(0)
    const merged = mergeProps({ text: "Drop Image Here", fileLimit: 1, currentNum: 0 }, props);
    const [previewImgs, setPreviewImgs] = createStore<string[]>([]);
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
                if (!e.dataTransfer) return;
                let files: File[]
                if (e.dataTransfer.getData("URL")) {
                    files = Array.from(e.dataTransfer.files)
                        .filter(file => file.type.startsWith("image/"))
                    setPreviewImgs(e.dataTransfer.getData("URL"))
                }
                else {
                    files = Array.from(e.dataTransfer.files)
                        .slice(0, limit)
                        .filter(file => file.type.startsWith("image/"))
                    files.forEach(file => readFile(src => setPreviewImgs(prev => [...prev, src]), file))
                }
                setEntered(false)
                await upload(files);
            }}
            onDragLeave={() => setEntered(false)}
            onclick={() => {
                input.click();
            }}
        >
            <Switch>
                <Match when={isUploading() && props.single}>
                    <UploadState
                        img={previewImgs[0]}
                        progress={progress()}
                        single
                    />
                </Match>
                <Match when={isUploading()}>
                    <For each={previewImgs}>
                        {image =>
                            <UploadState
                                img={image}
                                progress={progress()}
                                single={props.single}
                            />
                        }
                    </For>
                </Match>
                <Match when={!isUploading() && props.single}>
                    <div class={styles.preview}>
                        <img src={props.images[0]} alt="" />
                    </div>
                </Match>
            </Switch>
            <label >{props.text}</label>
            <input
                type="file"
                accept="image/*"
                hidden
                ref={input}
                multiple
                onchange={e => {
                    const files = Array.from(e.target.files ?? [])
                        .slice(0, limit)
                        .filter(file => file.type.startsWith("image/"))
                    files.forEach(file => readFile(src => setPreviewImgs(prev => [...prev, src]), file));
                    upload(files)
                }}
            />
        </div>
    )

    async function upload(files: File[]) {
        await startUpload(files, props.input as any);
        setPreviewImgs([]);
        setProgress(0);
    }
}

type UpState = {
    img: string
    progress: number
    single: boolean
}
type P2 = {
    preview: UpState
}

function UploadState(props: UpState) {
    return (
        <div
            class={`${styles.preview} ${props.single ? "" : styles.multi}`}
            style={{ '--prog': props.progress }}
        >
            <img src={props.img} alt="" />
        </div>
    )
}