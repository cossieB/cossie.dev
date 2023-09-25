import { Show, createSignal } from "solid-js";
import { validateUrl } from "../../../lib/validateUrl";

export function YouTubeIframe(props: { link: string | URL; }) {
    const [errorMsg, setErrorMsg] = createSignal("Failed to load YouTube")
    const url = () => props.link instanceof URL ? props.link : validateUrl(props.link);
    const params = () => {
        if (!url() ) {
            setErrorMsg("Invalid URL")
            return null
        }
        if (!url()?.hostname.includes("youtube")) {
            setErrorMsg("Only YouTube links supported")
            return null
        }
        const pathname = url()?.searchParams.get('v') ?? url()?.pathname
        if (!pathname) {
            setErrorMsg("Invalid URL")
            return null;
        }
        setErrorMsg("")
        if (url()?.searchParams.get('v'))
            return url()?.searchParams.get('v')
        return pathname.replace("/embed", "");
    }
    return (
        <div>
            <Show
                when={params()}
                fallback={<p> {errorMsg()} </p>}
            >
                <iframe width="560" height="315" src={`https://www.youtube.com/embed/${params()}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </Show>
        </div>
    );
}
