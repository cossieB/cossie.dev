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
        <div
            class="popup"
        >
            <div>
                {props.text}
            </div>
        </div>
    )
}