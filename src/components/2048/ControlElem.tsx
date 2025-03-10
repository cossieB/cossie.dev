import { createEffect, onMount } from 'solid-js';
import styles from "./2048.module.scss"
import { useResize } from '~/hooks/useResize';

export class Elem {
    readonly id = Math.floor(Math.random() * 1000000).toString()
    public value = Math.random() < 0.75 ? 2 : 4;
    public deleted?: boolean
    constructor(
        public top: number,
        public left: number,
    ){
        this.index = this.index.bind(this)
    }
    index() {
        return 4 * this.top + this.left
    }
}

export function ControlElem(props: {item: Elem}) {
    let ref!: HTMLDivElement;
    const windowWidth = useResize()
    onMount(() => {
        setTimeout(() => {
            ref.style.opacity = "1"
        }, 250)
    })
    createEffect(() => {
        if (props.item.value > 2) {
            ref.style.transform = `scale(1.5)`
            setTimeout(() => {
                ref.style.setProperty('transform', null)
            }, 50)
        }
    })
    createEffect(() => {
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
        ref.style.top = `${props.item.top * htwt + gap * (props.item.top + 1)}rem`
        ref.style.left = `${props.item.left * htwt + gap * (props.item.left + 1)}rem`
    })  
    return (
        <div
            ref={ref!}
            class={`${styles.controlElem} ${styles['val'+props.item.value]}`}
        >
            {props.item.value}
        </div>
    )
}