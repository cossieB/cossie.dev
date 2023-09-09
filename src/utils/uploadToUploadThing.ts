import { genUploader } from "uploadthing/client";
import { OurFileRouter } from "~/server/uploadthing";

const uploader = genUploader();

export async function uploadAndUpdateUrl<T extends keyof OurFileRouter>(
    endpoint: T,
    file: File,
    name: string,
    field: OurFileRouter[T]['_def']['_input']['field'],
    setImage: (files: string[]) => void
) {
    const res = await upload(endpoint, name, field, [file])
    setImage(res.map(x => x.url))
}

export async function upload<T extends keyof OurFileRouter>(
    endpoint: T,
    name: string,
    field: OurFileRouter[T]['_def']['_input']['field'],
    files: File[]) {

    return await uploader({
        endpoint,
        files,

        input: {
            name,
            field
        },
        
    })
}
