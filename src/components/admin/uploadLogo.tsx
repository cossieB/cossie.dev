import { SetStoreFunction } from "solid-js/store";
import { OurFileRouter } from "~/server/uploadthing";
import { uploadAndUpdateUrl } from "~/utils/uploadToUploadThing";

type State = {
    isUploading: boolean,
    uploadOk: boolean,
    uploadErrored: boolean,
}

export async function uploadLogo<T extends keyof OurFileRouter>(
    file: File,
    setState: SetStoreFunction<State>,
    name: string,
    field: OurFileRouter[T]['_def']['_input']['field'],
    setter: (file: string[]) => void,
) {
    setState({ isUploading: true });
    try {
        await uploadAndUpdateUrl(
            'logo',
            file,
            name,
            // @ts-expect-error
            field,
            file => setter(file)
        )
        setState({ uploadOk: true }); 
    }
    catch (error) {
        setState({ uploadErrored: true });
    }
    finally {
        setState({ isUploading: false });
    }
}