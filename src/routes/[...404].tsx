import { Show } from "solid-js";
import { Title, useLocation } from "solid-start";
import { HttpStatusCode } from "solid-start/server";
import Navigator from "~/components/Navigator/Navigator";

export default function NotFound() {
    const location = useLocation()
    return (
        <>
            <main
                style={{
                    height: '100vh',
                    display: 'flex',
                    "justify-content": 'center',
                    "align-items": 'center'
                }}
            >
                <Title>Not Found</Title>
                <HttpStatusCode code={404} />
                <h1
                    style={{
                        "font-size": 'clamp(10rem, 25vw, 100vw)',
                        padding: '0',
                        margin: '0'
                    }}
                >
                    404
                </h1>
            </main>
            <Show when={!location.pathname.startsWith('/admin')}>
                <Navigator />
            </Show>
        </>
    );
}
