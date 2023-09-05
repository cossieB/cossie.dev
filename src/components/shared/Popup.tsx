import { Show, onCleanup, onMount } from "solid-js";
import { Transition } from "solid-transition-group";
import { state } from "../Wordle/store";

type Props = {
    text: string,
    close: () => void,
    colorDeg?: string,
    when: boolean
}

export function Popup(props: Props) {
    return (
        <Transition name="fade" >
            <Show when={props.when}>
                <Alert
                    {...props}
                />
            </Show>
        </Transition>
    )
}

function Alert(props: Props) {
    const t = setTimeout(() => {
        props.close()
    }, 5000)

    onCleanup(() => {
        clearTimeout(t)
    })
    return (
        <div
            class="popup"
        >
            <div
                style={{ "--popClr": props.colorDeg ?? 50 }}
            >
                {props.text}
            </div>
        </div>
    )
}