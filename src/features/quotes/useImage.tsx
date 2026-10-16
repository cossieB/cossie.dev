import { onSettled } from "solid-js";

export function useImage() {
    const bgs: HTMLImageElement[] = [];
    onSettled(() => {
        for (let i = 1; i <= 5; i++) {
            const image = new Image();
            image.src = `/assets/image${i}.jpg`;
            bgs.push(image);
        }
    });
    return bgs;
}
