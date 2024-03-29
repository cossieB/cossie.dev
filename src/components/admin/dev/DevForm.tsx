import { createEffect } from "solid-js"
import { createServerAction$ } from "solid-start/server"
import type { Developer } from "~/drizzle/types"
import { FormInput, SelectInput } from "../forms/FormInput"
import { createStore } from "solid-js/store"
import styles from "~/components/admin/forms/forms.module.scss";
import { countryList } from "../forms/countryList"
import { updateDevOnDB as updateDevsOnDB } from "./updateDevsOnDB"
import HiddenInput from "../forms/HiddenInput"
import { DropZone } from "../forms/DropZone"
import AdminForm from "../AdminForm"
import CustomTextarea from "../CustomTextarea"

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

    const [state, setState] = createStore({
        isUploading: false,
        complete: false,
        uploadError: null as null | string,
        logoHasChanged: () => dev.logo && dev.logo !== props.data?.logo
    })
    createEffect(() => {
        setDev(copyData(props.data))
    })
    const [submitting, { Form }] = createServerAction$(updateDevsOnDB, {
        invalidate: () => ['developers', props.data?.developerId]
    })
    return (
        <AdminForm
            id="devForm"
            class={styles.form}
            Form={Form}
            submitting={submitting}
            state={state}
            setState={setState}
            submitDisabled={
                !dev.country ||
                !dev.name ||
                !dev.logo ||
                !dev.location ||
                !dev.summary
            }
        >
            <DropZone
                endpoint="logo"
                onSuccess={res => setDev('logo', res[0].url)}
                images={[dev.logo]}
                input={{
                    reference: dev.developerId,
                    table: 'developer'
                }}
                onError={e => setState('uploadError', e)}
                single
                text="Logo"
            />
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
            <CustomTextarea
                setter={val => setDev('summary', val)}
                name="summary"
                value={dev.summary}
            />
            <HiddenInput name="logo" value={dev.logo} />
            <HiddenInput name="developerId" value={dev.developerId} />
            <HiddenInput name="newDev" value={props.data ? 0 : 1} />
        </AdminForm>
    )
}