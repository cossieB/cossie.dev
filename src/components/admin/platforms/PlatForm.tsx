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
    })
    createEffect(() => {
        setPlatform(copyData(props.data))
    })

    const [submitting, { Form }] = createServerAction$(updatePlatformOnDB, {
        invalidate: () => ['platforms', props.data?.platformId]
    })
    return (
        <>
            <Form id="platForm" class={styles.form}>
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
                <HiddenInput name="newItem" value={props.data ? 0 : 1} />
            </Form>
            <Popup
                when={!!state.uploadError || submitting.error || submitting.result}
                text={state.uploadError! || submitting.error?.message || submitting.result}
                colorDeg={submitting.result ? "125" : undefined}
                close={() => {
                    setState('uploadError', null);
                    submitting.clear()
                }}
            />
        </>
    )
}