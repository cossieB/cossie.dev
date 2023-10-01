import { type JSXElement, type ParentComponent, createEffect } from "solid-js";
import type { FormProps } from "solid-start/data/Form";
import { Popup } from "../shared/Popup";
import type { SetStoreFunction } from "solid-js/store";
import SubmitButton from "./SubmitButton";
import styles from "~/components/admin/forms/forms.module.scss";

type Props = {
    Form: ParentComponent<FormData | FormProps>
    children: JSXElement
    state: {
        isUploading: boolean;
        uploadError: string | null;
        complete: boolean
    }
    submitting: {
        error?: any
        clear: () => void
        result?: unknown
        pending: boolean
    }
    setState: SetStoreFunction<{ uploadError: null | string, complete: boolean }>
    submitDisabled: boolean
} & FormProps

export default function AdminForm(props: Props) {
    createEffect(() => {
        if (props.submitting.result)
            props.setState('complete', true)
    })
    return (
        <>
            <props.Form class={styles.form} {...props}>
                {props.children}
                <SubmitButton
                    finished={props.state.complete}
                    loading={props.submitting.pending}
                    disabled={
                        props.state.complete ||
                        props.state.isUploading ||
                        props.submitDisabled
                    }
                />
            </props.Form>
            <Popup
                when={props.state.uploadError || props.submitting.error || props.submitting.result}
                text={props.state.uploadError! || props.submitting.error?.message || props.submitting.result}
                colorDeg={props.submitting.result ? "125" : undefined}
                close={() => {
                    props.setState('uploadError', null);
                    props.submitting.clear()
                }}
            />
        </>
    )
}