import { createHash } from "crypto";
import { createStore } from "solid-js/store";
import { RouteDataArgs, createSessionStorage, useRouteData } from "solid-start";
import { ServerError, createServerAction$, createServerData$, redirect } from "solid-start/server";
import SubmitButton from "~/components/admin/SubmitButton";
import { FormInput } from "~/components/admin/forms/FormInput";
import styles from "~/components/admin/forms/forms.module.scss";
import { Popup } from "~/components/shared/Popup";
import MongoConnection from "~/mongo/mongo";
import { authenticate } from "../../utils/authenticate";

const mongo = new MongoConnection

export const storage = createSessionStorage({
    async createData(data, expires) {
        const now = new Date();
        now.setMinutes(now.getMinutes() + 1);
        return mongo.addSession(data, expires ?? now)
    },
    async deleteData(id) {
        return mongo.deleteSession(id)
    },
    async readData(id) {
        return await mongo.getSession(id)
    },
    async updateData(id, data, expires) {
        const now = new Date();
        now.setMinutes(now.getMinutes() + 15);
        return mongo.updateSession(id, data, expires ?? now)
    },
});
export function routeData(args: RouteDataArgs) {
    return createServerData$(async (_, event) => {
        const user = await authenticate(event);
        if (user == process.env.ADMIN_USERNAME)
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
            <Popup
                close={() => submitting.clear()}
                text={submitting.error.message}
                when={submitting.error}
            />
        </Form>
    )
}
async function loginAction(fd: FormData, { request }: { request: Request }) {

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
    throw redirect('/admin/games', {
        headers: {
            'Set-Cookie': await storage.commitSession(session)
        }
    })
};