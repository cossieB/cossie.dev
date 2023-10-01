import { skillsMap } from "./skillsMap";
import Tooltip from "../shared/Tooltip";
import type { Lang } from "./vars";
import styles from './about.module.scss'
import { type Accessor, For, Show, createSignal } from "solid-js";

export default function Languages({ arr }: { arr: Lang[] }) {
    return (
        <For each={arr}>
            {(lingo, i) =>
                <LangDiv
                    i={i}
                    length={arr.length}
                    lingo={lingo}
                />
            }
        </For>
    )
}

function LangDiv(props: { lingo: Lang, i: Accessor<number>, length: number }) {
    const [strokeColour, summary] = skillsMap(props.lingo.skill)
    const [mousePosition, setMousePosition] = createSignal({ x: 0, y: 0 })
    const [showTooltip, setShowTooltip] = createSignal(false)
    let ref!: HTMLDivElement
    return (
        <div
            class={styles.skillDiv}
            ref={ref}
            onMouseEnter={e => {
                const rect = e.currentTarget!.getBoundingClientRect()
                setMousePosition({ x: e.pageX - rect.left, y: rect.height * 0.5 })
                setShowTooltip(true)
            }}
            onMouseLeave={() => setShowTooltip(false)}
        >
            <img
                class={styles.langLogos}
                src={props.lingo.logo}
                alt={`${props.lingo.language} logo`}
            />
            <svg xlink-title="skill level"
                class={styles.skill}
                height={100}
                width={100}
            >
                <circle
                    stroke={strokeColour}
                    stroke-dashoffset={260 - props.lingo.skill / 10 * 260}
                    cx={50}
                    cy={50}
                    r={40}
                />
                <title> {summary} </title>
            </svg>
            <Show when={showTooltip()}>
                <Tooltip text={props.lingo.language} x={mousePosition().x} y={mousePosition().y} />
            </Show>
        </div>
    )
}