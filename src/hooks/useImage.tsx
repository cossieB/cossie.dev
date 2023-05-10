import { onMount } from "solid-js"

export function useImage(src: string) {
    let image: HTMLImageElement
    onMount(() => {
        image = new Image()
        image.src = src
    })
    return image!
}

export function useImages(srcSet: string[]) {
    let images: HTMLImageElement[] = []
    onMount(() => {
        for (const src of srcSet) {
            const image = new Image()
            image.src = src
            images.push(image)
        }
    })
    return images
}