import styles from "./Contact.module.scss"
import { Match, Switch } from "solid-js";
import Loader from "../shared/Loader/Loader";
import { Checkmark } from "~/svgs";
import { sendMail } from "~/nodemailer";
import { createStore } from "solid-js/store";
import { Popup } from "../shared/Popup";
import { action,  useNavigate, useSubmission } from "@solidjs/router";
import { FormInput, FormTextarea } from "../admin/forms/FormInput";

const sendAction = action(async (body: {name: string, email: string, organization: string, message: string}) => {
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
        await sendMail(body.name, body.organization, body.message, body.email)
        return "Your message has been sent. Thank you for reaching out to me. I will come back to you as soon as possible. Redirecting in 5 seconds"
    } 
    catch (error) {
        console.error(error)
        return new Error("Something went wrong. Please try again later")
    }
})

export default function ContactMain() {

    const [body, setBody] = createStore({
        name: "",
        email: "",
        organization: "",
        message: "",
    })

    const disabled = () => Object.values(body).some( val => !val)
    const navigate = useNavigate()
    const submission = useSubmission(sendAction)
     
    return (
        <main class="container" id={styles.container}>
            <h1>Contact Me</h1>
            <div id={styles.formDiv}>
                <form id={styles.form} action={sendAction.with(body)} method="post">
                    <FormInput
                        name="name"
                        setter={setBody}
                    />
                    <FormInput
                        name="organization"
                        setter={setBody}
                    />
                    <FormInput
                        name="email"
                        setter={setBody}
                    />
                    <FormTextarea
                        name="message"
                        setter={setBody}
                        required={false}
                    />
                    <button
                        disabled={submission.pending || typeof submission.result === 'string' || disabled()}
                        type="submit"
                    >
                        <Switch fallback="Submit">
                            <Match when={submission.pending}>
                                <Loader />
                            </Match>
                            <Match when={typeof submission.result === 'string'}>
                                <Checkmark />
                            </Match>
                        </Switch>
                    </button>
                </form>
            </div>
            <Popup
                when={!!submission.result}
                close={() => {
                    submission.clear()
                    navigate("/projects")
                }}
                text={typeof submission.result === 'string' ? submission.result : submission.result!.message}
                colorDeg={typeof submission.result === 'string' ? "120" : "0"}
            />
        </main>
    )
}

