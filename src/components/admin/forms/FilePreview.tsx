import { Accessor, For, Setter, createSignal } from "solid-js"
import styles from "./forms.module.scss";

type P = {
    images: Accessor<string[]>
    setImages: Setter<string[]>
}
export function ImagePreview(props: P) {
    const [lastDragIndex, setLastDragIndex] = createSignal(-1)
    return (
        <div class={styles.previews}>
            <For each={props.images()}>
                {(image, i) =>
                    <div
                        draggable
                        onDragEnd={() => {
                            if (lastDragIndex() == i()) return;
                            const newArr: string[] = []
                            let currIdx = 0

                            for (let j = 0; j < props.images().length; j++) {
                                if (j === i()) continue;
                                if (currIdx == lastDragIndex()) {
                                    newArr.push(image);
                                }
                                newArr.push(props.images()[j])
                                currIdx++
                            }
                            if (newArr.length < props.images().length)
                                newArr.push(image);
                            props.setImages(newArr)
                            setLastDragIndex(-1)
                        }}
                        onDragEnter={e => {
                            const element = e.target as HTMLImageElement
                            setLastDragIndex(Number(element.dataset.i))
                        }}
                    >
                        <i class={`bi bi-dash-lg ${styles.delBtn}`} onclick={() => props.setImages(prev => prev.filter((_, j) => i() != j))} />
                        <img data-i={i()} src={image} />
                    </div>
                }
            </For>
        </div>
    )
}