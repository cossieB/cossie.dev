import { createSignal, onMount } from "solid-js"

export function useAudio(src: string) {
    let audio: HTMLAudioElement
    onMount(() => {
        audio = new Audio(src)
    })
    return audio!
}

export function useAudios(srcSet: string[]) {
    const [audios, setAudios] = createSignal<HTMLAudioElement[]>([])
    onMount(() => {
        setAudios(srcSet.map(src => new Audio(src)))
    })
    console.log(audios())
    return audios()
}