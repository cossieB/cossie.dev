import { createEffect } from "solid-js"
import { createStore } from "solid-js/store"
import { createServerAction$ } from "solid-start/server"
import { Platform } from "~/drizzle/types"
import SubmitButton from "../SubmitButton"
import { DropZone } from "../forms/DropZone"
import { FormInput, FormTextarea } from "../forms/FormInput"
import HiddenInput from "../forms/HiddenInput"
import styles from "~/components/admin/forms/forms.module.scss";
import { updatePlatformOnDB } from "./updatePlatformOnDB"
import { formatDateForInputElement } from "~/lib/formatDate"
import { Popup } from "~/components/shared/Popup"
import AdminForm from "../AdminForm"
import CustomTextarea from "../CustomTextarea"

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

    const [state, setState] = createStore({
        isUploading: false,
        uploadError: null as null | string,
        complete: false
    })
    createEffect(() => {
        setPlatform(copyData(props.data))
    })

    const [submitting, { Form }] = createServerAction$(updatePlatformOnDB, {
        invalidate: () => ['platforms', props.data?.platformId]
    })
    return (
        <AdminForm
            Form={Form}
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
                        table: 'developer'
                    }}
                    onError={e => setState('uploadError', e)}
                    single
                    text="Logo"
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
            <HiddenInput name="logo" value={platform.logo} />
            <HiddenInput name="platformId" value={platform.platformId} />
            <HiddenInput name="newItem" value={props.data ? 0 : 1} />
        </AdminForm>
    )
}