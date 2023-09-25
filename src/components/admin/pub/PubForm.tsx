import { createEffect } from "solid-js"
import { createServerAction$ } from "solid-start/server"
import { Publisher } from "~/drizzle/types"
import { FormInput, FormTextarea, SelectInput } from "../forms/FormInput"
import { createStore } from "solid-js/store"
import styles from "~/components/admin/forms/forms.module.scss";
import { countryList } from "../forms/countryList"
import SubmitButton from "../SubmitButton"
import { DropZone } from "../forms/DropZone"
import { updatePubOnDB } from "./updatePubOnDB"
import HiddenInput from "../forms/HiddenInput"
import { Popup } from "~/components/shared/Popup"
import AdminForm from "../AdminForm"

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

    const [state, setState] = createStore({
        complete: false,
        isUploading: false,
        uploadError: null as null | string,
    })
    createEffect(() => {
        setPub(copyData(props.data))
    })
    const [submitting, { Form }] = createServerAction$(updatePubOnDB, {
        invalidate: () => ['publishers', props.data?.publisherId]
    })
    return (
        <>
            <AdminForm
                id="pubForm"
                class={styles.form}
                Form={Form}
                state={state}
                setState={setState}
                submitting={submitting}
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
                            table: 'developer'
                        }}
                        onError={e => setState('uploadError', e)}
                        single
                        text="Logo"
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
                <FormTextarea
                    name="summary"
                    value={pub.summary}
                    setter={setPub}
                />
                <HiddenInput name="logo" value={pub.logo} />
                <HiddenInput name="publisherId" value={pub.publisherId} />
                <HiddenInput name="newItem" value={props.data ? 0 : 1} />
            </AdminForm>
        </>
    )
}