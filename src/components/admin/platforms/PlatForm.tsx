import { createSignal, createEffect, Show } from "solid-js"
import { createStore } from "solid-js/store"
import { createServerAction$ } from "solid-start/server"
import { Platform } from "~/drizzle/types"
import SubmitButton from "../SubmitButton"
import { DropZoneWithPreview } from "../forms/DropZone"
import { FormInput, FormTextarea } from "../forms/FormInput"
import HiddenInput from "../forms/HiddenInput"
import { uploadLogo } from "../uploadLogo"
import styles from "~/components/admin/forms/forms.module.scss";
import { updatePlatformOnDB } from "./updatePlatformOnDB"
import { formatDateForInputElement } from "~/lib/formatDate"
import { Popup } from "~/components/shared/Popup"

type Props = {
    data?: Platform
}
function copyData(data: Props['data']): Platform {
    return {
        platformId: data?.platformId ?? crypto.randomUUID(),
        logo: data?.logo ?? "",
        name: data?.name ?? "",
        summary: data?.summary ?? "",
        release: data?.release ?? "",
    }
}
export function PlatForm(props: Props) {
    const [platform, setPlatform] = createStore(copyData(props.data))

    const [file, setFile] = createSignal<File[]>([])
    const [state, setState] = createStore({
        isUploading: false,
        uploadOk: false,
        uploadError: null as null | string,
        logoHasChanged: () => platform.logo && platform.logo !== props.data?.logo
    })
    createEffect(() => {
        setPlatform(copyData(props.data))
    })
    createEffect(() => {
        if (!file()[0]) return;
        uploadLogo(
            file()[0]!,
            setState,
            { reference: platform.platformId, table: 'platform' },
            url => setPlatform('logo', url[0])
        )
    })
    const [submitting, { Form }] = createServerAction$(updatePlatformOnDB, {
        invalidate: () => ['platforms', props.data?.platformId]
    })
    return (
        <>
            <Form id="platForm" class={styles.form}>
                <div class={styles.heroImgs}>
                    <DropZoneWithPreview
                        onAdd={url => setPlatform('logo', url)}
                        setFiles={file => setFile(file)}
                        text="Logo"
                        img={platform.logo}
                    />
                </div>
                <Show when={state.logoHasChanged() && file().length > 0 && !!platform.name}>
                    <SubmitButton
                        disabled={submitting.pending}
                        loading={state.isUploading}
                        finished={state.uploadOk}
                        text="Upload"
                        onclick={() => uploadLogo(
                            file()[0]!,
                            setState,
                            { reference: platform.platformId, table: 'platform' },
                            url => setPlatform('logo', url[0])
                        )}
                    />
                </Show>
                <FormInput
                    name="name"
                    value={platform.name}
                    setter={setPlatform}
                />
                <FormInput
                    name="release"
                    value={formatDateForInputElement(new Date(platform.release))}
                    setter={setPlatform}
                    type="date"
                />
                <FormTextarea
                    name="summary"
                    value={platform.summary}
                    setter={setPlatform}
                />
                <SubmitButton
                    finished={!!submitting.result}
                    loading={submitting.pending}
                    disabled={
                        state.isUploading ||
                        !platform.name ||
                        !platform.logo ||
                        !platform.summary
                    }
                />
                <HiddenInput name="logo" value={platform.logo} />
                <HiddenInput name="platformId" value={platform.platformId} />
            </Form>
            <Popup
                when={state.uploadError || submitting.error}
                text="Unauthorized"
                close={() => {
                    setState('uploadError', null);
                    submitting.clear()
                }}
            />
        </>
    )
}