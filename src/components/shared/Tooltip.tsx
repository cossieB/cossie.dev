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
        <span
            ref={ref} 
            class="tooltip"
            role="tooltip"
        >
            {props.text}
        </span>
    )
}