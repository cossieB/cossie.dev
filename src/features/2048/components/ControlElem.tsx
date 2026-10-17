import { createEffect, onSettled } from 'solid-js';
import styles from "./2048.module.css"
import { useResize } from '~/hooks/useResize';


export type Block = {
    top: number
    left: number
    value: number
}



export function ControlElem(props: { item: Block }) {
    let ref!: HTMLDivElement;
    const windowWidth = useResize()

    const coords = () => {
        let htwt: number;
        let gap: number;
        if (windowWidth() > 1024) {
            htwt = 7.5;
            gap = 0.5
        }
        else {
            htwt = 4;
            gap = 0.25
        }
        return {
            top: props.item.top * htwt + gap * (props.item.top + 1),
            left: props.item.left * htwt + gap * (props.item.left + 1)
        }
    }

    onSettled(() => {
        setTimeout(() => {
            ref.style.opacity = "1"
        }, 250)
    })
    createEffect(
        () => props.item.value,
        () => {
            ref.style.transform = `scale(1.5)`
            setTimeout(() => {
                ref.style.setProperty('transform', null)
            }, 50)
        })

    return (
        <div
            ref={ref!}
            style={{
                '--val': props.item.value,
                top: `${coords().top}rem`,
                left: `${coords().left}rem`
            }}
            class={`${styles.controlElem} ${styles['val' + props.item.value]}`}
        >
            {props.item.value}
        </div>
    )
}