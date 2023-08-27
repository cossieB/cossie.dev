import { genUploader } from "uploadthing/client";
import { OurFileRouter } from "~/server/uploadthing";

const uploader = genUploader<OurFileRouter>();

export async function upload<T extends keyof OurFileRouter>(
    endpoint: T,
    title: string,
    field: OurFileRouter[T]['_def']['_input']['field'],
    setField: (list: string[]) => void,
    files: File[]) {
    //@ts-expect-error
    const res = await uploader({
        endpoint,
        files,
        input: {
            title,
            field
        }
    })
    setField(res.map(x => x.url))
}
export async function uploadMultiple<T extends keyof OurFileRouter>(
    endpoint: T,
    title: string,
    field: OurFileRouter[T]['_def']['_input']['field'],
    files: File[]
) {
    //@ts-expect-error
    return await uploader({
        endpoint,
        files,
        input: {
            title,
            field
        }
    })
}
