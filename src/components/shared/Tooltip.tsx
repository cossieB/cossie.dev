import { Motion } from "@motionone/solid"
import { onMount } from "solid-js"

type Props = {
    x: number
    y: number
    text: string
}

export default function Tooltip(props: Props) {
    let ref!: HTMLSpanElement
    onMount(() => {
        ref.style.top = `${props.y}px`
        ref.style.left = `${props.x}px`
    })
    return (
        <Motion.span
            ref={ref} 
            class="tooltip"
            role="tooltip"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {props.text}
        </Motion.span>
    )
}