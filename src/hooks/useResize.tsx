import { createSignal, onCleanup, onMount } from "solid-js";

export function useResize() {
    const [windowWidth, setWindowWidth] = createSignal(0);
    onMount(() => {
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
