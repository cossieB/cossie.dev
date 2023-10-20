import { createHash } from "crypto";
import { createStore } from "solid-js/store";
import { ServerError, type ServerFunctionEvent, createServerAction$ } from "solid-start/server";
import SubmitButton from "~/components/admin/SubmitButton";
import { FormInput } from "~/components/admin/forms/FormInput";
import styles from "~/components/admin/forms/forms.module.scss";
import { Popup } from "~/components/shared/Popup";
import { storage } from "../../utils/authenticate";
import Page from "~/components/shared/Page";
import { useNavigate } from "solid-start";
import { createEffect } from "solid-js";

export default function AdminLogin() {
    const [, setUser] = createStore({
        username: "",
        password: ""
    })
    const [submitting, { Form }] = createServerAction$(loginAction, { invalidate: ['auth'] })
    const navigate = useNavigate()
    createEffect(() => {
        if (submitting.result?.ok)
            navigate(-1)
    })
    return (
        <Page title="Login">
            <Form class={styles.form}>
                <FormInput
                    name="username"
                    setter={setUser}
                />
                <FormInput
                    name="password"
                    type="password"
                    setter={setUser}
                />
                <SubmitButton
                    loading={submitting.pending}
                    disabled={false}
                    finished={false}
                    text="Login"
                />
            </Form>
            <Popup
                close={() => {submitting.clear() }}
                text={submitting.error.message}
                when={submitting.error}
            />
        </Page>
    )
}
async function loginAction(fd: FormData, { request }: ServerFunctionEvent) {

    const cookie = request.headers.get("Cookie");

    const session = await storage.getSession(cookie);
    const password = fd.get("password");
    const username = fd.get("username");
    if (!password || typeof password !== "string" || !username || typeof username !== "string") {
        throw new ServerError('Invalid Credentials', { status: 401 })
    }
    const hash = createHash('sha256').update(password).digest("hex");
    if (hash != process.env.ADMIN_PASSWORD || username != process.env.ADMIN_USERNAME)
        throw new ServerError("Invalid Credentials", { status: 401 })
    session.set("username", username);
    session.set('image', '/favicon.ico')
    return new Response('Login success', {
        headers: {
            'Set-Cookie': await storage.commitSession(session)
        }
    })
};