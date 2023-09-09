import { SetStoreFunction } from "solid-js/store";
import { OurFileRouter } from "~/server/uploadthing";
import { uploadAndUpdateUrl } from "~/utils/uploadToUploadThing";

type State = {
    isUploading: boolean,
    uploadOk: boolean,
    uploadError: null | string,
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
    catch (error: any) {
        setState({ uploadError: error.message });
    }
    finally {
        setState({ isUploading: false });
    }
}