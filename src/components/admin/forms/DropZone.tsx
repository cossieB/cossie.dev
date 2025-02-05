import { For, Match, Switch, createSignal, mergeProps, onCleanup } from "solid-js";
import styles from "./DropZone.module.scss";
import { OurFileRouter } from "~/server/uploadthing";
import { generateSolidHelpers } from "@uploadthing/solid";
import { ClientUploadedFileData } from "uploadthing/types";

type DZInput<T extends keyof OurFileRouter> = T extends 'game' ?
    {
        field: "cover" | "banner" | "images";
        reference: string
    } : {
        reference: string;
        table: "developer" | "publisher" | "platform" | "actor";
    };

export type Props<T extends keyof OurFileRouter> = {
    images: string[]
    text?: string
    fileLimit?: number
    endpoint: T
    input: DZInput<T>
    onError: (err: any) => void
    onSuccess: (res: ClientUploadedFileData<null>[]) => void
    setImages: (urls: string[]) => void
    single: boolean
}

const { createUploadThing } = generateSolidHelpers<OurFileRouter>();

export function DropZone<T extends keyof OurFileRouter>(props: Props<T>) {
    let input!: HTMLInputElement;
    const {isUploading, startUpload} = createUploadThing(props.endpoint, {
        onUploadError: e => {
            props.onError((e.cause as any)?.error ?? e.message)
        },
    })

    onCleanup(() => previews().forEach(URL.revokeObjectURL));

    const [entered, setEntered] = createSignal(false);
    const [previews, setPreviews] = createSignal<string[]>([])
    const merged = mergeProps({ text: "Drop Image Here", fileLimit: 1 }, props);

    async function selectFiles(fileList: File[]) {
        const limit = merged.fileLimit - merged.images.length;
        const urls = fileList
            .map(file => URL.createObjectURL(file))
        if (merged.fileLimit === 1)
            setPreviews(urls.slice(0, 1))
        else {
            setPreviews(p => [...p, ...urls].slice(0, limit))
        }
        setEntered(false)
        const res = await startUpload(fileList as any, props.input as any)
        if (!res) return;
        props.onSuccess(res)
    }

    return (
        <div
            class={`${styles.z}`}
            classList={{ 
                [styles.enter]: entered(), 
                [styles.uploading]: isUploading(), 
                [styles.multi]: !props.single 
            }}
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
            <Switch>
                <Match when={isUploading() && props.single}>
                    <img src={previews().at(0)} alt="" />
                </Match>
                <Match when={!isUploading() && props.single && props.images.at(0)}>
                    <img src={props.images.at(0)} alt="" />
                </Match>
                <Match when={!props.single && isUploading()}>
                    <For each={previews()}>
                        {img => <img src={img} />}
                    </For>
                </Match>
            </Switch>
            <label class={styles.label} >{props.text}</label>
            <input
                type="file"
                accept="image/*"
                hidden
                ref={input}
                multiple
                onchange={e => {
                    if (e.target.files)
                        selectFiles(Array.from(e.target.files))
                }}
            />
        </div>
    )
}