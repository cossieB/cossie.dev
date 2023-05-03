import { FormInput, FormTextarea } from "./FormInput";
import styles from "./Contact.module.scss"
import { Show } from "solid-js";
import Loader from "../shared/Loader";
import { Presence } from "@motionone/solid";
import { createStore } from "solid-js/store";
import Popup from "../shared/Popup";
import { useNavigate } from "solid-start";

export default function ContactMain() {
    const [state, setState] = createStore({
        sending: false,
        errored: false,
        message: "",
        success: false
    })
    const navigate = useNavigate()

    async function submit(e: SubmitEvent & { currentTarget: HTMLFormElement }) {
        setState({sending: true})
        e.preventDefault()
        const fd = new FormData(e.currentTarget);
        fd.append('msg', fd.get('message') || "")
        const body: any = {}
        fd.forEach((val, key) => {
            if (key == "organization")
                body.company = val
            else if (key == "message")
                body.msg = val
            else
                body[key] = val
        })
        const response = await fetch('/contact', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        setState({sending: false})
        if (response.ok) {
            setState({message:"Your message has been sent. Thank you for reaching out to me. I will come back to you as soon as possible. Redirecting in 5 seconds"});
        }
        else {
            setState({errored: true})
            setState({message:"Something went wrong. Please try again later"})
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
                        {state.sending ? <Loader /> : "Submit"}
                    </button>
                </form>
            </div>
            <Presence>
                <Show when={state.message.length > 0}>
                    <Popup
                        close={() => {
                            setState({message: ""});
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

