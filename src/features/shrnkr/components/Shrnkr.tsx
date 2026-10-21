import { createEffect, createSignal, Loading, ParentProps, Show } from "solid-js";
import styles from "./Shrnkr.module.css"
import { user } from "~/features/auth/api";
import { AuthButtonsGroup } from "~/features/auth/components/AuthButtonGroup";
import { CircleAlertIcon, ClipboardPasteIcon, GlobeIcon } from "@lucide/solid";

export default function Shrnkr(props: ParentProps) {

    return (
        <div class={styles.main}>
            <div class={styles.container}>
                <Hero />
                <Loading>

                    <div class={styles.workspace} >
                        <div class={[styles.formCard, styles.panel]}>
                            <Show
                                when={user()}
                                fallback={<AuthButtonsGroup />}
                            >
                                <ShrnkrForm />
                            </Show>
                        </div>
                    </div>
                </Loading>
            </div>
        </div>
    )
}

export function Hero() {
    return (
        <>
            <h1 class={styles.title}>
                Shorten Links with Live Intelligence
            </h1>
            <p class={styles.description}>
                Transform long, cumbersome URLs into powerful, brandable short links with
                real-time metadata previews, QR code exports, and instant analytics tracking.
            </p>
        </>
    );
}

export function ShrnkrForm() {
    let inputRef!: HTMLInputElement
    const [input, setInput] = createSignal("")

    return (
        <div>
            <div class={styles.formControl}>
                <label for="destinationUrl">Destination URL <span style="color:var(--danger)">*</span></label>
                <div class={styles.inputWrapper}>
                    <GlobeIcon />
                    <input
                        ref={inputRef}
                        type="url"
                        id="destinationUrl"
                        class={styles.formInput}
                        required
                        onChange={e => setInput(e.currentTarget.value.trim())}
                        placeholder="https://example.com/long-article-or-campaign-page"
                        value={input()}
                    />
                    <button
                        class={styles.pasteBtn}
                        onClick={async () => {
                            try {
                                const content = await navigator.clipboard.readText();
                                setInput(content.trim())
                            }
                            catch (error) { }
                        }}
                    >
                        <ClipboardPasteIcon />
                    </button>

                </div>
                <Show when={input() && !/^https:\/\//.test(input())}>
                    <p
                        id="urlError"
                        style={{
                            color: "var(--danger)",
                            "font-size": "0.75rem",
                            "margin-top": "6px",
                            display: "flex",
                            "align-items": "center"
                        }}>
                        <CircleAlertIcon /> &nbsp; Please enter a valid URL (including https://). Only secure URLs are supported
                    </p>
                </Show>
                
            </div>
        </div>
    )
}

