import { createHash } from "crypto";
import { createStore } from "solid-js/store";
import SubmitButton from "~/components/admin/SubmitButton";
import { FormInput } from "~/components/admin/forms/FormInput";
import styles from "~/components/admin/forms/forms.module.scss";
import { Popup } from "~/components/shared/Popup";
import Page from "~/components/shared/Page";
import { createEffect } from "solid-js";
import { action, useAction, useNavigate, useSubmission } from "@solidjs/router";
import { getRequestEvent } from "solid-js/web";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "~/firebase";

async function login(fd: FormData) {

    try {
        await signInWithEmailAndPassword(auth, fd.get('email') as string, fd.get('password') as string)
        return "OK"
    } 
    catch (error) {
        console.log(error)
        if (error instanceof Error) return error
        return new Error("Something went wrong")
    }
};

const loginAction = action(login, 'auth')

export default function AdminLogin() {

    const submission = useSubmission(loginAction)
    const [, setUser] = createStore({
        username: "",
        password: ""
    })

    return (
        <Page title="Login">
            <form action={loginAction} class={styles.form} method="post">
                <FormInput
                    name="email"
                    setter={setUser}
                />
                <FormInput
                    name="password"
                    type="password"
                    setter={setUser}
                />
                <SubmitButton
                    loading={submission.pending}
                    disabled={false}
                    finished={false}
                    text="Login"
                />
            </form>
            <Popup
                close={() => {submission.clear() }}
                text={(submission.result as Error).message}
                when={submission.result instanceof Error}
            /> 
        </Page>
    )
}
