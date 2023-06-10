import { onCleanup, onMount } from "solid-js";

type Props = {
    text: string,
    close: () => void,
    colorDeg?: string
}

export default function Popup(props: Props) {
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
                style={{"--popClr": props.colorDeg ?? 50}}
            >
                {props.text}
            </div>
        </div>
    )
}