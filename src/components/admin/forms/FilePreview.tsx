import { For, createSignal } from "solid-js"
import styles from "./forms.module.scss";

type P = {
    images: {url: string, file: File | null}[]
    setImages: (arr: {url: string, file: File | null}[]) => void
}
export function ImagePreview(props: P) {
    const [lastDragIndex, setLastDragIndex] = createSignal(-1)

    return (
        <div class={styles.previews}>
            <For each={props.images}>
                {(image, i) =>
                    <div
                        draggable
                        onDragEnd={() => {
                            if (lastDragIndex() == i()) return;
                            const newArr: {url: string, file: File | null}[] = []
                            let currIdx = 0

                            for (let j = 0; j < props.images.length; j++) {
                                if (j === i()) continue;
                                if (currIdx == lastDragIndex()) {
                                    newArr.push(image);
                                }
                                newArr.push(props.images[j])
                                currIdx++
                            }
                            if (newArr.length < props.images.length)
                                newArr.push(image);
                            props.setImages(newArr)
                            setLastDragIndex(-1)
                        }}
                        onDragEnter={e => {
                            const element = e.target as HTMLImageElement
                            setLastDragIndex(Number(element.dataset.i))
                        }}
                    >
                        <svg onclick={() => props.setImages(props.images.filter((_, j) => i() != j))} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-lg" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8Z" />
                        </svg>
                        <img data-i={i()} src={image.url} class="screenshotImg" />
                    </div>
                }
            </For>
        </div>
    )
}