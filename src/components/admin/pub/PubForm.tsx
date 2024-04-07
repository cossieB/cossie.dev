import { createEffect } from "solid-js"
import type { Publisher } from "~/drizzle/types"
import { FormInput, SelectInput } from "../forms/FormInput"
import { createStore } from "solid-js/store"
import styles from "~/components/admin/forms/forms.module.scss";
import { countryList } from "../forms/countryList"
import { DropZone } from "../forms/DropZone"
import HiddenInput from "../forms/HiddenInput"
import AdminForm from "../AdminForm"
import CustomTextarea from "../CustomTextarea"
import { action, useSubmission } from "@solidjs/router";
import { updatePubOnDB } from "./updatePubOnDB";

type Props = {
    data?: Publisher
}

const updateAction = action(updatePubOnDB, 'updatePub')

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
    let ref!: HTMLFormElement
    const [pub, setPub] = createStore(copyData(props.data))

    const [state, setState] = createStore({
        complete: false,
        isUploading: false,
        uploadError: null as null | string,
    })
    createEffect(() => {
        setPub(copyData(props.data))
    })
    const submitting = useSubmission(updateAction)

    return (
        <AdminForm
            id="pubForm"
            class={styles.form}
            state={state}
            setState={setState}
            submitting={submitting}
            action={updateAction.with(pub, { isNewPub: !props.data })}
            ref={ref}
            submitDisabled={
                !pub.country ||
                !pub.name ||
                !pub.logo ||
                !pub.headquarters ||
                !pub.summary
            }
        >
            <div class={styles.heroImgs}>
                <DropZone
                    endpoint="logo"
                    onSuccess={res => setPub('logo', res[0].url)}
                    images={[pub.logo]}
                    input={{
                        reference: pub.publisherId,
                        table: 'publisher'
                    }}
                    onError={e => setState('uploadError', e)}
                    single
                    text="Logo"
                    setImages={urls => setPub('logo', urls[0])}
                />
            </div>
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
            <CustomTextarea
                setter={val => setPub('summary', val)}
                name="summary"
                value={pub.summary}
            />
        </AdminForm>
    )
}