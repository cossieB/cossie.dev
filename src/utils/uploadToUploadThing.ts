import { genUploader } from "uploadthing/client";
import { OurFileRouter } from "~/server/uploadthing";

const uploader = genUploader();

export async function uploadAndUpdateUrl(
    endpoint: keyof OurFileRouter,
    file: File,
    entity: string,
    field: OurFileRouter[keyof OurFileRouter]['_def']['_input']['field'],
    setImage: (files: string[]) => void
) {
    const res = await upload(endpoint, entity, field, [file])
    setImage(res.map(x => x.url))
}

export async function upload<T extends keyof OurFileRouter>(
    endpoint: T,
    entity: string,
    field: OurFileRouter[T]['_def']['_input']['field'],
    files: File[]) {

    return await uploader({
        endpoint,
        files,

        input: {
            entity,
            field
        },
        
    })
}
