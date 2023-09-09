import { JSXElement } from "solid-js";
import { Form } from "solid-start/data/Form";
import { Popup } from "../shared/Popup";
import { SetStoreFunction } from "solid-js/store";

type Props = {
    children: JSXElement
    state: {
        isUploading: boolean;
        uploadOk: boolean;
        uploadError: string | null;
    }
    submitting: {
        error?: any
        clear: () => void
    }
    setState: SetStoreFunction<{uploadError: null | string}>
}

export default function AdminForm(props: Props) {
    return (
        <>
            <Form>
                {props.children}
            </Form>
            <Popup
                when={props.state.uploadError || props.submitting.error}
                text={props.state.uploadError! || props.submitting.error.message}
                close={() => {
                    props.setState('uploadError', null);
                    props.submitting.clear()
                }}
            />
        </>
    )
}