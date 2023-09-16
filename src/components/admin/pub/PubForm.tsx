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
import { Popup } from "~/components/shared/Popup"

type Props = {
    data?: Publisher
}
function copyData(data: Props['data']): Publisher {
    return {
        country: data?.country ?? "",
        publisherId: data?.publisherId ?? crypto.randomUUID(),
        headquarters: data?.headquarters ?? "",
        logo: data?.logo ?? "",
        name: data?.name ?? "",
        summary: data?.summary ?? "",
    }
}
export function PubForm(props: Props) {
    const [pub, setPub] = createStore(copyData(props.data))

    const [file, setFile] = createSignal<File[]>([])
    const [state, setState] = createStore({
        isUploading: false,
        uploadOk: false,
        uploadError: null as null | string,
        logoHasChanged: () => pub.logo && pub.logo !== props.data?.logo
    })
    createEffect(() => {
        setPub(copyData(props.data))
    })
    createEffect(() => {
        if (!file()[0]) return;
        uploadLogo(
            file()[0]!,
            setState,
            { reference: pub.publisherId, table: 'publisher' },
            url => setPub('logo', url[0])
        )
    })
    const [submitting, { Form }] = createServerAction$(updatePubOnDB, {
        invalidate: () => ['publishers', props.data?.publisherId]
    })
    return (
        <>
            <Form id="pubForm" class={styles.form}>
                <div class={styles.heroImgs}>
                    <DropZoneWithPreview
                        onAdd={url => setPub('logo', url)}
                        setFiles={file => setFile(file)}
                        text="Logo"
                        img={pub.logo}
                    />
                </div>
                <Show when={state.logoHasChanged() && file().length > 0 && pub.name}>
                    <SubmitButton
                        disabled={submitting.pending}
                        loading={state.isUploading}
                        finished={state.uploadOk}
                        text="Upload"
                        onclick={() => uploadLogo(
                            file()[0]!,
                            setState,
                            { reference: pub.publisherId, table: 'publisher' },
                            url => setPub('logo', url[0])
                        )}
                    />
                </Show>
                <FormInput
                    name="name"
                    value={pub.name}
                    setter={setPub}
                />
                <FormInput
                    name="headquarters"
                    value={pub.headquarters}
                    setter={setPub}
                />
                <SelectInput
                    arr={countryList}
                    label="Country"
                    name="country"
                    value={pub.country}
                    setter={setPub}
                    default={countryList.find(x => x === pub.country)}
                />
                <FormTextarea
                    name="summary"
                    value={pub.summary}
                    setter={setPub}
                />
                <SubmitButton
                    finished={!!submitting.result}
                    loading={submitting.pending}
                    disabled={
                        !pub.country ||
                        state.isUploading ||
                        !pub.name ||
                        !pub.logo ||
                        !pub.headquarters ||
                        !pub.summary
                    }
                />
                <HiddenInput name="logo" value={pub.logo} />
                <HiddenInput name="publisherId" value={pub.publisherId} />
            </Form>
            <Popup
                when={state.uploadError || submitting.error}
                text={state.uploadError! || submitting.error.message}
                close={() => {
                    setState('uploadError', null);
                    submitting.clear()
                }}
            />
        </>
    )
}