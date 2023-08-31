import { Show, createEffect, createSignal } from "solid-js"
import { createServerAction$ } from "solid-start/server"
import { Publisher } from "~/drizzle/types"
import { FormInput, FormTextarea, SelectInput } from "../forms/FormInput"
import { createStore } from "solid-js/store"
import styles from "~/components/admin/forms/forms.module.scss";
import { countryList } from "../forms/countryList"
import SubmitButton from "../SubmitButton"
import { DropZoneWithPreview } from "../forms/DropZone"
import { uploadLogo } from "../uploadLogo"
import { updatePubOnDB } from "./updatePubOnDB"
import HiddenInput from "../forms/HiddenInput"

type Props = {
    data?: Publisher
}
function copyData(data: Props['data']): Publisher {
    return {
        country: data?.country ?? "",
        publisherId: data?.publisherId ?? "",
        headquarters: data?.headquarters ?? "",
        logo: data?.logo ?? "",
        name: data?.name ?? "",
        summary: data?.summary ?? "",
    }
}
export function PubForm(props: Props) {
    const [dev, setDev] = createStore(copyData(props.data))

    const [file, setFile] = createSignal<File[]>([])
    const [state, setState] = createStore({
        isUploading: false,
        uploadOk: false,
        uploadErrored: false,
        logoHasChanged: () => dev.logo && dev.logo !== props.data?.logo
    })
    createEffect(() => {
        setDev(copyData(props.data))
    })
    const [submitting, { Form }] = createServerAction$(updatePubOnDB, {
        invalidate: () => ['publishers', props.data?.publisherId]
    })
    return (
        <Form id="pubForm" class={styles.form}>
            <div class={styles.heroImgs}>
                <DropZoneWithPreview
                    onAdd={url => setDev('logo', url)}
                    setFiles={file => setFile(file)}
                    text="Logo"
                    img={dev.logo}
                />
            </div>
            <Show when={state.logoHasChanged() && file().length > 0 && !!dev.name}>
                <SubmitButton
                    disabled={submitting.pending}
                    loading={state.isUploading}
                    finished={state.uploadOk}
                    text="Upload"
                    onclick={() => uploadLogo(
                        file()[0]!,
                        setState,
                        dev.name,
                        'publisher',
                        url => setDev('logo', url[0])
                    )}
                />
            </Show>
            <FormInput
                name="name"
                value={dev.name}
                setter={setDev}
            />
            <FormInput
                name="headquarters"
                value={dev.headquarters}
                setter={setDev}
            />
            <SelectInput
                arr={countryList}
                label="Country"
                name="country"
                value={dev.country}
                setter={setDev}
                default={countryList.find(x => x === dev.country)}
            />
            <FormTextarea
                name="summary"
                value={dev.summary}
                setter={setDev}
            />
            <SubmitButton
                finished={!!submitting.result}
                loading={submitting.pending}
                disabled={
                    !dev.country ||
                    state.isUploading ||
                    !dev.name ||
                    !dev.logo ||
                    !dev.headquarters ||
                    !dev.summary
                }
            />
            <HiddenInput name="logo" value={dev.logo} />
            <HiddenInput name="publisherId" value={dev.publisherId} />
        </Form>
    )
}