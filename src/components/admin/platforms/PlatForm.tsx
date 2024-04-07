import { createEffect } from "solid-js"
import { createStore } from "solid-js/store"
import type { Platform } from "~/drizzle/types"
import { DropZone } from "../forms/DropZone"
import { FormInput } from "../forms/FormInput"
import HiddenInput from "../forms/HiddenInput"
import styles from "~/components/admin/forms/forms.module.scss";
import { updatePlatformOnDB } from "./updatePlatformOnDB"
import { formatDateForInputElement } from "~/lib/formatDate"
import AdminForm from "../AdminForm"
import CustomTextarea from "../CustomTextarea"
import { action, useSubmission } from "@solidjs/router"

type Props = {
    data?: Platform
}
const updateAction = action(updatePlatformOnDB, 'updatePlatform')
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
    let ref!: HTMLFormElement
    const [platform, setPlatform] = createStore(copyData(props.data))

    const [state, setState] = createStore({
        isUploading: false,
        uploadError: null as null | string,
        complete: false
    })
    createEffect(() => {
        setPlatform(copyData(props.data))
    })
    const submitting = useSubmission(updateAction)
    return (
        <AdminForm
            ref={ref}
            action={updateAction.with(platform, {isNewPlatform: !props.data})}
            state={state}
            setState={setState}
            submitDisabled={
                !platform.name ||
                !platform.logo ||
                !platform.summary
            }
            submitting={submitting}
            id="platForm"
        >
            <div class={styles.heroImgs}>
                <DropZone
                    endpoint="logo"
                    onSuccess={res => setPlatform('logo', res[0].url)}
                    images={[platform.logo]}
                    input={{
                        reference: platform.platformId,
                        table: 'platform'
                    }}
                    onError={e => setState('uploadError', e)}
                    single
                    text="Logo"
                    setImages={urls => setPlatform('logo', urls[0])}
                />
            </div>
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
            <CustomTextarea
                setter={val => setPlatform('summary', val)}
                name="summary"
                value={platform.summary}
            />
        </AdminForm>
    )
}