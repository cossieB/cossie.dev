import { Show, createEffect, createSignal } from "solid-js"
import { createServerAction$ } from "solid-start/server"
import { Developer } from "~/drizzle/types"
import { FormInput, FormTextarea, SelectInput } from "../forms/FormInput"
import { createStore } from "solid-js/store"
import styles from "~/components/admin/forms/forms.module.scss";
import { countryList } from "../forms/countryList"
import SubmitButton from "../SubmitButton"
import { DropZoneWithPreview } from "../forms/DropZone"
import { uploadLogo } from "../uploadLogo"
import { updateDevOnDB as updateDevsOnDB } from "./updateDevsOnDB"
import HiddenInput from "../forms/HiddenInput"
import { Popup } from "~/components/shared/Popup"

type Props = {
    data?: Developer
}
function copyData(data: Props['data']): Developer {
    return {
        country: data?.country ?? "",
        developerId: data?.developerId ?? crypto.randomUUID(),
        location: data?.location ?? "",
        logo: data?.logo ?? "",
        name: data?.name ?? "",
        summary: data?.summary ?? "",
    }
}
export function DevForm(props: Props) {
    const [dev, setDev] = createStore(copyData(props.data))

    const [file, setFile] = createSignal<File[]>([])
    const [state, setState] = createStore({
        isUploading: false,
        uploadOk: false,
        uploadError: null as null | string,
        logoHasChanged: () => dev.logo && dev.logo !== props.data?.logo
    })
    createEffect(() => {
        setDev(copyData(props.data))
    })
    createEffect(() => {
        if (!file()[0]) return;
        uploadLogo(
            file()[0]!,
            setState,
            { reference: dev.developerId, table: 'developer' },
            url => setDev('logo', url[0])
        )
    })
    const [submitting, { Form }] = createServerAction$(updateDevsOnDB, {
        invalidate: () => ['developers', props.data?.developerId]
    })
    return (
        <>
            <Form id="devForm" class={styles.form}>
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
                            { reference: dev.developerId, table: 'developer' },
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
                    name="location"
                    value={dev.location}
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
                        !dev.location ||
                        !dev.summary
                    }
                />
                <HiddenInput name="logo" value={dev.logo} />
                <HiddenInput name="developerId" value={dev.developerId} />
            </Form>
            <Popup
                when={!!state.uploadError || submitting.error}
                text={state.uploadError! || submitting.error}
                close={() => {
                    setState('uploadError', null);
                    submitting.clear()
                }}
            />
        </>
    )
}