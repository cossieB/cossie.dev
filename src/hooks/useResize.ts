import { createSignal, onCleanup, onSettled } from "solid-js";

export function useResize() {
    const [windowWidth, setWindowWidth] = createSignal(0);
    onSettled(() => {
        setWindowWidth(window.innerWidth);
        window.addEventListener('resize', resize);
    });
    onCleanup(() => {
        window.removeEventListener('resize', resize);
    });
    function resize() {
        setWindowWidth(window.innerWidth);
    }
    return windowWidth
}