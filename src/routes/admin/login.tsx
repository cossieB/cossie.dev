import { createStore } from "solid-js/store";
import SubmitButton from "~/components/admin/SubmitButton";
import { FormInput } from "~/components/admin/forms/FormInput";
import styles from "~/components/admin/forms/forms.module.scss";
import { Popup } from "~/components/shared/Popup";
import Page from "~/components/shared/Page";
import { action, redirect, useSubmission } from "@solidjs/router";
import { getSession } from "../../utils/getSession";
import { json } from "@solidjs/router"
import { createHash } from "node:crypto";
import { getUser } from "../data";

const loginAction = action(async (user: { username: string, password: string }) => {
    "use server";
    
    const hash = createHash('sha256').update(user.password).digest("hex");

    if (hash != process.env.ADMIN_PASSWORD || user.username != process.env.ADMIN_USERNAME)
        return json("Invalid Credentials", { status: 400 })

    const session = await getSession();
    await session.update({
        user: {
            username: user.username
        }
    });
    throw redirect("/admin", { revalidate: getUser.key })
});


export default function AdminLogin() {

    const [state, setState] = createStore({
        username: "",
        password: "",
    })
    const submission = useSubmission(loginAction)

    return (
        <Page title="Login">
            <form class={styles.form} method="post" action={loginAction.with({ username: state.username, password: state.password })}>
                <FormInput
                    name="username"
                    setter={setState}
                />
                <FormInput
                    name="password"
                    type="password"
                    setter={setState}
                />
                <SubmitButton
                    loading={submission.pending}
                    disabled={!state.username || !state.password}
                    finished={false}
                    text="Login"
                />
            </form>
            <Popup
                close={submission.clear}
                text={submission.result!}
                when={!!submission.result}
            />
        </Page>
    )
}
