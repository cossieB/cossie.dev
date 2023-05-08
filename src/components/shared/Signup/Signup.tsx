import { createSignal, For, Show, useContext } from "solid-js"
import styles from "./signup.module.scss";
import { UserContext } from "./UserProvider";

type Props = {
    className: string
}

export default function Signup(props: Props) {
    const {username, setUsername} = useContext(UserContext)!
    const [tempname, setTempName] = createSignal(username())
    const [errorMsg, setErrorMsg] = createSignal<string[]>([])

    function submit() {
        let e = []
        if (tempname().length > 12 || tempname().length < 3) {
            e.push("Username must be between 3 and 12 characters long.")
        }
        if (/^[^a-z]/i.test(tempname())) {
            e.push("Username must start with a letter.")
        }
        if (/\W/.test(tempname())) {
            e.push("Username can only contain letters and numbers.")
        }

        if (e.length == 0) return setUsername(tempname())
        setErrorMsg(e)
    }
    return (
        <div id={styles.signupForm} class={props.className || ""} >
            <h4>Enter Your Name</h4>
            <input
                oninput={(e) => {
                    setErrorMsg([])
                    setTempName(e.currentTarget.value);
                }}
            /><br />
            <button class={styles.button2} onClick={submit}>Submit </button>
            <Show when={errorMsg().length > 0}>
                <div id={styles.errorDiv}>
                    <For each={errorMsg()} >
                        {item => <p> {item} </p>}
                    </For>
                </div>
            </Show>
        </div>
    )
}