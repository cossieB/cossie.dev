import { getTouchHandlers } from "~/lib/getTouchHandlers";
import styles from "./2048.module.css"
import { ControlElem, Block } from './ControlElem';
import { For } from 'solid-js';

interface P {
    array: Block[]
    move?: (direction: 'up' | 'down' | 'left' | 'right') => void
}

export function Board(props: P) {

    const { handleTouchEnd, handleTouchStart } = getTouchHandlers({
        onSwipeDown: () => props.move!("down"),
        onSwipeLeft: () => props.move!("left"),
        onSwipeRight: () => props.move!("right"),
        onSwipeUp: () => props.move!("up")
    })

    return (
        <div class={styles.board}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <For each={new Array(16).fill(0)}>
                {() => <div class={styles.block} />}
            </For>
            <For each={props.array} >{item =>
                <ControlElem
                    item={item}
                />
            }
            </For>
        </div>
    );
}
