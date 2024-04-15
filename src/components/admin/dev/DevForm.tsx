import { createEffect } from "solid-js"
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
import { action, useSubmission } from "@solidjs/router";

type Props = {
    data?: Developer
}
const updateAction = action(updateDevsOnDB, 'updateDev');

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
    let ref!: HTMLFormElement

    const [dev, setDev] = createStore(copyData(props.data))

    const [state, setState] = createStore({
        isUploading: false,
        complete: false,
        uploadError: null as null | string,
    })
    const submitting = useSubmission(updateAction);

    createEffect(() => {
        setDev(copyData(props.data))
    })

    return (
        <AdminForm
            id="devForm"
            action={updateAction.with(dev, { isNewDev: !props.data })}
            class={styles.form}
            submitting={submitting}
            state={state}
            setState={setState}
            reset={() => setDev(copyData(props.data))}
            ref={ref}
            submitDisabled={
                !dev.country ||
                !dev.name ||
                !dev.logo ||
                !dev.location ||
                !dev.summary
            }
        >
            <div class={styles.heroImgs}>
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
                    setImages={urls => setDev('logo', urls[0])}
                />
            </div>
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
        </AdminForm>
    )
}