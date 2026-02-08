import { action, useSubmission } from "@solidjs/router";
import { createStore } from "solid-js/store";
import { sendMail } from "~/utils/nodemailer";
import styles from "./home.module.css"
import { Match, Show, Switch } from "solid-js";
import Loader from "~/components/Loader/Loader";
import { CheckIcon } from "lucide-solid";

const sendAction = action(async (body: { name: string, email: string, company: string, message: string }) => {
    'use server'
    try {
        const errors: string[] = [];
        Object.entries(body).forEach(([key, val]) => {
            if (val === "") {
                errors.push(key);
            }
        })
        if (errors.length > 0) {
            return new Error(`The following fields are required but are missing in your submission: ${errors.join(", ")}`)
        }
        const options = {
            from: `Cossie Bot <${process.env.FROM}>`,
            to: process.env.TO,
            subject: `${body.name} - ${body.company} :: Portfolio`,
            html: `<div style="text-align: center"><h1>${body.company}</h1><h2>${body.name}</h2><h2>${body.email}</h2><p>${body.message}</p></div>`
        }
        await sendMail(options)
        return true
    }
    catch (error) {
        console.error(error)
        return false
    }
})

export function ContactMe() {
    const [body, setBody] = createStore({
        name: "",
        email: "",
        company: "",
        message: "",
    })
    const disabled = () => Object.values(body).some(val => !val)
    const submission = useSubmission(sendAction)

    return (
        <div>

            <form class={styles.contact} method="post" action={sendAction.with(body)}>
                <div class={styles.formControl} >
                    <input onchange={e => setBody({ name: e.currentTarget.value })} type="text" required placeholder=" " />
                    <label> Name </label>
                </div>
                <div class={styles.formControl} >
                    <input onchange={e => setBody({ email: e.currentTarget.value })} type="email" required placeholder=" " />
                    <label> Email </label>
                </div>
                <div class={styles.formControl} >
                    <input onchange={e => setBody({ company: e.currentTarget.value })} type="text" required placeholder=" " />
                    <label> Company </label>
                </div>
                <div class={styles.formControl}>
                    <textarea onchange={e => setBody({ message: e.currentTarget.value })} required minLength={3} placeholder=" " />
                    <label> Message </label>
                </div>
                <button
                    type="submit"
                    disabled={disabled() || submission.result == true}
                >
                    <Switch fallback="Submit">
                        <Match when={submission.pending}>
                            <Loader />
                        </Match>
                        <Match when={submission.result === true}>
                            <CheckIcon />
                        </Match>
                    </Switch>
                </button>

                <Switch >
                    <Match when={submission.result === true}>
                        <div>
                            Hello, {body.name}, your message has been sent. Thank you for reaching out to me. I will come back to you as soon as possible. In the meantime feel free to poke around this portfolio and my GitHub to check out my cool projects
                        </div>
                    </Match>
                    <Match when={submission.result === false}>
                        <div>
                            Oh boy something went wrong. I'm on the case, please try again later.
                        </div>
                    </Match>
                </Switch>
            </form>
        </div>
    )
}