import { SetStoreFunction } from "solid-js/store";
import { OurFileRouter } from "~/server/uploadthing";
import { uploadAndUpdateUrl } from "~/utils/uploadToUploadThing";

type State = {
    isUploading: boolean,
    uploadOk: boolean,
    uploadError: null | string,
}

export async function uploadLogo(
    file: File,
    setState: SetStoreFunction<State>,
    input: OurFileRouter['logo']['_def']['_input'],
    setter: (file: string[]) => void,
) {
    setState({ isUploading: true });
    try {
        await uploadAndUpdateUrl(
            'logo',
            file,
            input,
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