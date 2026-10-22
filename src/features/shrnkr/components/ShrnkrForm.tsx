import { GlobeIcon, ClipboardPasteIcon, CircleAlertIcon } from "@lucide/solid"
import { StoreSetter, Show, For } from "solid-js"
import { Input, LinkCategory } from "./types"
import styles from "./Shrnkr.module.css"
import titleCase from "~/lib/titleCase"

type P = {
    input: Input,
    setInput: StoreSetter<Input>
}

export function ShrnkrForm(props: P) {
    let inputRef!: HTMLInputElement

    return (
        <form>
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
                        value={props.input.url}
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
                <Show when={props.input.url && !/^https:\/\//.test(props.input.url)}>
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
                                style={{"border-radius": "unset"}}
                                type="text" 
                                class={styles.formInput} 
                                />
                        </div>
                    </div>
                    <div class={styles.formControl}>
                        <label>Category</label>
                        <select id="linkTag" class="form-select" onChange={(e) => { props.setInput(s => { s.category = e.currentTarget.value as LinkCategory }) }}>
                            <For each={["general", "marketing", "personal", "work", "social"]}>
                                {opt => <option value={opt}> {titleCase(opt)} </option>}
                            </For>
                        </select>
                    </div>
                </div>
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
        </form>
    )
}