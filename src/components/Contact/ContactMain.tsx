import { FormInput, FormTextarea } from "./FormInput";
import styles from "./Contact.module.scss"
import { Match, Show, Switch } from "solid-js";
import Loader from "../shared/Loader";
import { Presence } from "@motionone/solid";
import { createStore } from "solid-js/store";
import Popup from "../shared/Popup";
import { useNavigate } from "solid-start";
import { Checkmark } from "~/svgs";
import server$ from "solid-start/server";
import { sendMail } from "~/nodemailer";

export default function ContactMain() {
    const [state, setState] = createStore({
        sending: false,
        errored: false,
        message: "",
        success: false
    })
    const navigate = useNavigate()
    
    const send = server$(async (name: string, email: string, company: string, message: string) => {
        await sendMail(name, company, message, email)
    })
    async function submit(e: SubmitEvent & { currentTarget: HTMLFormElement }) {
        e.preventDefault()
        setState({ sending: true })
        const fd = new FormData(e.currentTarget);

        const body: any = {}
        fd.forEach((val, key) => {
            if (key == "organization")
                body.company = val
            else if (key == "message")
                body.msg = val
            else
                body[key] = val
        })
        try {
            await send(fd.get('name') as string,fd.get('email') as string, fd.get('organization') as string, fd.get('message') as string)
            setState({ message: "Your message has been sent. Thank you for reaching out to me. I will come back to you as soon as possible. Redirecting in 5 seconds" });
        } 
        catch (error) {
            setState({ errored: true })
            setState({ message: "Something went wrong. Please try again later" })
        }
        finally {
            setState({ sending: false })
        }
    }
    return (
        <main class="container" id={styles.container}>
            <h1>Contact Me</h1>
            <div id={styles.formDiv}>
                <form id={styles.form} onsubmit={submit}>
                    <FormInput
                        name="name"
                    />
                    <FormInput
                        name="organization"
                    />
                    <FormInput
                        name="email"
                    />
                    <FormTextarea
                        name="message"
                        required={false}
                    />
                    <button
                        disabled={state.sending || state.success || state.message.length > 0}
                        type="submit"
                    >
                        <Switch fallback="Submit">
                            <Match when={state.sending}>
                                <Loader />
                            </Match>
                            <Match when={state.success}>
                                <Checkmark />
                            </Match>
                        </Switch>
                    </button>
                </form>
            </div>
            <Presence>
                <Show when={state.message.length > 0}>
                    <Popup
                        close={() => {
                            setState({ message: "" });
                            if (!state.errored) {
                                navigate("/projects")
                            }
                        }}
                        text={state.message}
                    />
                </Show>
            </Presence>
        </main>
    )
}

