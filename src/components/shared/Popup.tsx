import { Motion } from "@motionone/solid";
import { onCleanup, onMount } from "solid-js";

type Props = {
    text: string,
    close: () => void
}

export default function Popup(props: Props) {
    let t: NodeJS.Timeout
    onMount(() => {
        t = setTimeout(() => {
            props.close()
        }, 5000)
    })
    onCleanup(() => {
        clearTimeout(t)
    })
    return (
        <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            class="popup"
        >
            <div>
                {props.text}
            </div>
        </Motion.div>
    )
}