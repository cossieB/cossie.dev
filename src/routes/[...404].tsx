import { A, Navigate, useLocation } from "@solidjs/router";
import { HttpStatusCode } from "@solidjs/start";
import { Show } from "solid-js";
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
                <title>Not Found</title>
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
            <Navigator />
        </>
    );
}
