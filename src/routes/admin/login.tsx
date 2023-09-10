import { createHash } from "crypto";
import { createStore } from "solid-js/store";
import { RouteDataArgs, useRouteData } from "solid-start";
import { ServerError, ServerFunctionEvent, createServerAction$, createServerData$, redirect } from "solid-start/server";
import SubmitButton from "~/components/admin/SubmitButton";
import { FormInput } from "~/components/admin/forms/FormInput";
import styles from "~/components/admin/forms/forms.module.scss";
import { Popup } from "~/components/shared/Popup";
import { authenticate, storage } from "../../utils/authenticate";

export function routeData(args: RouteDataArgs) {
    return createServerData$(async (_, event) => {
        const user = await authenticate(event.request);console.log(user)
        if (user?.username === process.env.ADMIN_USERNAME)
            throw redirect('/admin/games')
    }, { key: 'auth' })
}
export default function AdminLogin() {
    const data = useRouteData(); data()
    const [user, setUser] = createStore({
        username: "",
        password: ""
    })
    const [submitting, { Form }] = createServerAction$(loginAction, { invalidate: ['auth'] })
    return (
        <>
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
        </>
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
    throw redirect('/admin/games', {
        headers: {
            'Set-Cookie': await storage.commitSession(session)
        }
    })
};