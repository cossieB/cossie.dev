import { createStore } from "solid-js/store";
import { createCookieSessionStorage, createSessionStorage } from "solid-start";
import { createServerAction$, createServerData$ } from "solid-start/server";
import SubmitButton from "~/components/admin/SubmitButton";
import { FormInput } from "~/components/admin/forms/FormInput";
import styles from "~/components/admin/forms/forms.module.scss";

const storage = createCookieSessionStorage({
    cookie: {
        name: "session",
        secure: process.env.NODE_ENV === "production",
        secrets: ["process.env.SESSION_SECRET"],
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 3600,
        httpOnly: true,
        
    },
});

export default function AdminLogin() {
    const data = createServerData$(async () => {

    })
    const [user, setUser] = createStore({
        username: "",
        password: ""
    })
    const [submitting, { Form }] = createServerAction$(async (fd: FormData, { request }) => {
        const cookie = request.headers.get("Cookie");


        const session = await storage.getSession(cookie);
        console.log(session.get("username"))
        session.set("username", fd.get("username"));
        session.set("password", fd.get("password"))
        return new Response("Test", {
            headers: {
                "Set-Cookie": await storage.commitSession(session)
            },
        })
    })
    return (
        <Form class={styles.form}>
            <FormInput
                name="username"
                setter={setUser}
            />
            <FormInput
                name="password"
                setter={setUser}
            />
            <SubmitButton
                loading={submitting.pending}
                disabled={false}
                finished={false}
                text="Login"
            />
        </Form>
    )
}