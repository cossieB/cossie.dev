import { genUploader } from "uploadthing/client";
import { OurFileRouter } from "~/server/uploadthing";

const uploader = genUploader();

export async function uploadAndUpdateUrl<T extends keyof OurFileRouter>(
    endpoint: T,
    file: File,
    input: OurFileRouter[T]['_def']['_input'],
    setImage: (files: string[]) => void
) {
    const res = await upload(endpoint, input, [file])
    setImage(res.map(x => x.url))
}

export async function upload<T extends keyof OurFileRouter>(
    endpoint: T,
    input: OurFileRouter[T]['_def']['_input'],
    files: File[]
) {
    return await uploader({
        endpoint,
        files,
        input,
    })
}
