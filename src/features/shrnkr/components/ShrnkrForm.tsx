import { GlobeIcon, ClipboardPasteIcon, CircleAlertIcon } from "@lucide/solid"
import { StoreSetter, Show, For, latest, createMemo, createOptimistic, action, useContext, onSettled, refresh } from "solid-js"
import styles from "./Shrnkr.module.css"
import titleCase from "~/lib/titleCase"
import { user } from "~/features/auth/api"
import { ToastContext } from "~/components/Toast/ToastContext"
import { State } from "./Shrnkr"
import 'temporal-polyfill/global'
import { createShortUrl } from "../api"
import { LinkCategory } from "../services/schema"
import { links } from "./LinkList"

type P = {
    input: State,
    setInput: StoreSetter<State>
    onCreate: (shortenedUrl: string) => void
}

const TIMEZONES = Intl.supportedValuesOf("timeZone");
if (!TIMEZONES.includes("UTC")) TIMEZONES.push("UTC")

export function ShrnkrForm(props: P) {
    let inputRef!: HTMLInputElement
    const url = createMemo(() => latest(() => props.input.url))
    const invalidUrl = () => url() && !/^https:\/\//.test(url())
    const [submitting, setSubmitting] = createOptimistic(false);
    const { addToast } = useContext(ToastContext)

    const expiry = () => props.input.expiry.datetime ? Temporal.ZonedDateTime.from(`${props.input.expiry.datetime}[${props.input.expiry.timeZone}]`).epochMilliseconds : null

    // check is intentionally higher than the server's 15 minutes to account for latency, clock skew and time spent filling the form
    const isInvalidExpiry = () => (expiry() ?? Number.MAX_SAFE_INTEGER) - Date.now() < 30 * 60 * 1000

    const submit = action(async function* () {
        setSubmitting(true)
        
        if (isInvalidExpiry()) {
            return addToast({
                text: "Expiry date must be at least 15 minutes in the future",
                type: "warning"
            })
        }
        
        const res = await createShortUrl({
            ...props.input,
            expiry: expiry()
        })
        yield;
        if (res instanceof Error) {
            return addToast({
                text: res.message,
                type: "warning",
                autoFades: false
            })
        }
        props.onCreate(res.shortCode);
        refresh(links)
    })

    onSettled(() => {
        props.setInput(s => {
            s.expiry.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC"
        })
    })

    return (
        <form
            method="post"
            onSubmit={async e => {
                e.preventDefault();
                submit()
            }}
        >
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
                        onChange={e => props.setInput(s => { s.url = e.currentTarget.value.trim() })}
                        placeholder="https://example.com/long-article-or-campaign-page"
                        value={url()}
                    />
                    <button
                        class={styles.pasteBtn}
                        title="Paste URL"
                        onClick={async () => {
                            try {
                                const content = await navigator.clipboard.readText();
                                props.setInput(s => { s.url = content.trim() })
                            }
                            catch (error) { }
                        }}
                    >
                        <ClipboardPasteIcon />
                    </button>

                </div>
                <Show when={invalidUrl()}>
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
                <div class={styles.inputGroup}>
                    <div class={styles.formControl} >
                        <label >Custom Back-Half</label>
                        <div class={styles.custom}>
                            <span>cossie.dev/s/</span>
                            <input
                                onChange={e => {
                                    props.setInput(s => {
                                        s.customBackHalf = e.currentTarget.value
                                    })
                                }}
                                style={{ "border-radius": "unset" }}
                                type="text"
                                class={styles.formInput}
                                disabled={user()?.isAnonymous ?? true}
                                title={user()?.isAnonymous ? "Anonymous users cannot use this feature" : undefined}
                            />
                        </div>
                    </div>
                    <div class={styles.formControl}>
                        <label>Category</label>
                        <select id="linkTag" onChange={(e) => { props.setInput(s => { s.category = e.currentTarget.value as LinkCategory }) }}>
                            <For each={["general", "marketing", "personal", "work", "social-media"]}>
                                {opt => <option value={opt}> {titleCase(opt)} </option>}
                            </For>
                        </select>
                    </div>
                </div>


                <div class={styles.inputGroup} style={{ "margin-top": "1rem" }}>
                    <div class={styles.formControl} >
                        <label >Expires</label>
                        <input
                            type="datetime-local"
                            onChange={e => {
                                props.setInput(s => {
                                    s.expiry.datetime = e.currentTarget.value
                                })
                            }}
                        />
                    </div>
                    <div class={styles.formControl} >
                        <label >Time Zone</label>
                        <select
                            id="linkTag"
                            style={{
                                height: "49px"
                            }}
                            onChange={e => {
                                props.setInput(s => {
                                    s.expiry.timeZone = e.currentTarget.value
                                })
                            }}
                        >
                            <For each={TIMEZONES}>
                                {opt => <option value={opt} selected={opt === props.input.expiry.timeZone}> {opt} </option>}
                            </For>
                        </select>
                    </div>
                </div>
                <Show when={isInvalidExpiry()}>
                    <div
                        style={{
                            color: "var(--danger)",
                            "font-size": "0.75rem",
                            "margin-top": "6px",
                            display: "flex",
                            "align-items": "center"
                        }}>
                        <CircleAlertIcon /> &nbsp; Expiry date must be at least 15 minutes in the future
                    </div>
                </Show>

                <div class={styles.inputGroup} >
                    <div class={styles.formControl}>
                        <label >Campaign Source</label>
                        <input
                            onChange={e => {
                                props.setInput(s => {
                                    s.campaignSource = e.currentTarget.value
                                })
                            }}
                            placeholder="e.g. google, newsletter"
                            class={styles.formInput}
                            type="text" />
                    </div>
                    <div class={styles.formControl}>
                        <label >Campaign Name</label>
                        <input
                            onChange={e => {
                                props.setInput(s => {
                                    s.campaignName = e.currentTarget.value
                                })
                            }}
                            placeholder="e.g summer_of_saving"
                            class={styles.formInput}
                            type="text" />
                    </div>
                </div>
                <div class={styles.inputGroup} >
                    <div class={styles.formControl}>
                        <label >Campaign Medium</label>
                        <input
                            onChange={e => {
                                props.setInput(s => {
                                    s.campaignMedium = e.currentTarget.value
                                })
                            }}
                            placeholder="e.g banner, email"
                            class={styles.formInput}
                            type="text" />
                    </div>
                    <div class={styles.formControl}>
                        <label >Campaign Term</label>
                        <input
                            onChange={e => {
                                props.setInput(s => {
                                    s.campaignTerm = e.currentTarget.value
                                })
                            }}
                            class={styles.formInput}
                            type="text" />
                    </div>
                </div>
            </div>
            <button
                type="submit"
                disabled={
                    !url() ||
                    submitting() ||
                    invalidUrl() ||
                    props.input.customBackHalf!.length > 0 && props.input.customBackHalf!.length < 5
                }
            >
                Create Short URL
            </button>
        </form>
    )
}