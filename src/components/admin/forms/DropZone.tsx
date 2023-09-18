import { createSignal, mergeProps } from "solid-js";
import styles from "./DropZone.module.scss";
import { readFile } from "../../../lib/readFile";
import { generateSolidHelpers } from "@uploadthing/solid";
import { OurFileRouter } from "~/server/uploadthing";
import { UploadFileResponse } from "uploadthing/client";

export type Props<T extends keyof OurFileRouter> = {
    text?: string
    fileLimit?: number
    currentNum?: number
    endpoint: T
    input: OurFileRouter[T]['_def']['_input']
    onError: (err: any) => void
    onSuccess: (res: UploadFileResponse[]) => void
}

const { uploadFiles } = generateSolidHelpers<OurFileRouter>();

export function UploadZoneWithPreview<T extends keyof OurFileRouter>(props: Props<T> & {img?: string}) {
    return (
        <div class={styles.preview}>
              <img src={props.img ?? "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/800px-Question_mark_%28black%29.svg.png"} alt="" />
              <UploadZone {...props} />
        </div>
    )
}

export function UploadZone<T extends keyof OurFileRouter>(props: Props<T>) {
    const [entered, setEntered] = createSignal(false)
    const merged = mergeProps({ text: "Drop Image Here", fileLimit: 1, currentNum: 0 }, props);

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
                let files: File[]
                if (e.dataTransfer.getData("URL")) {
                    files = Array.from(e.dataTransfer.files)
                        .filter(file => file.type.startsWith("image/"))
                    props.onAdd(e.dataTransfer.getData("URL"))
                }
                else {
                    const limit = merged.fileLimit - merged.currentNum;
                    files = Array.from(e.dataTransfer.files)
                        .slice(0, limit)
                        .filter(file => file.type.startsWith("image/"))

                    files.forEach(file => readFile(props.onAdd, file))
                }
                setEntered(false)

                upd({
                    endpoint: props.endpoint,
                    files,
                    input: props.input as any,
                    onUploadProgress: file => console.log(file),
                },
                    props.onError,
                    props.onSuccess
                )
            }}
            onDragLeave={() => setEntered(false)}
        >
            {props.text}
        </div >
    )
}

async function upd(
    obj: Parameters<typeof uploadFiles>[0],
    onErr: (err: any) => void,
    onSuccess: (res: UploadFileResponse[]) => void
) {
    try {
        const res = await uploadFiles(obj)
        onSuccess(res)
    }
    catch (error: any) {
        console.log(error)
        onErr(error.message)
    }
}

function UploadProgress(props: {url: string, progress: number}) {
    return (
        <div>
            <img src={props.url}/>
        </div>
    )
}