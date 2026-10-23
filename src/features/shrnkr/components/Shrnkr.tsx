import { action, createStore, Loading, ParentProps, Show } from "solid-js";
import styles from "./Shrnkr.module.css"
import { user } from "~/features/auth/api";
import { AuthButtonsGroup } from "~/features/auth/components/AuthButtonGroup";
import { Hero } from "./Hero";
import { ShrnkrForm } from "./ShrnkrForm";
import { ShrnkrPreview } from "./Preview";
import { ShrnkrResult } from "./ShrnkrResult";
import { createShortUrl, LinkCategory } from "../api";
import { useSubmissions } from "@solidjs/router";
import { env } from "virtual:env/client";

export default function Shrnkr(props: ParentProps) {
    const [input, setInput] = createStore({
        url: "",
        customBackHalf: "",
        category: "general" as LinkCategory,
        campaignSource: "",
        campaignName: "",
        campaignMedium: "",
        campaignTerm: ""
    })

    const submission = useSubmissions(createShortUrl)

    return (
        <div class={styles.main}>
            <div class={styles.container}>
                <Hero />
                <div class={styles.workspace} >
                    <div class={[styles.formCard, styles.panel]}>
                        <Loading>
                            <Show
                                when={user()}
                                fallback={<AuthButtonsGroup />}
                            >
                                <ShrnkrForm input={input} setInput={setInput} />
                            </Show>
                        </Loading>
                    </div>
                    <div class={[styles.panel]}>
                        <ShrnkrPreview
                            url={input.url}
                            category={input.category}
                        />
                        <Show when={submission.at(-1)?.result}>
                            {res => <ShrnkrResult
                                shortenedUrl={`${env.VITE_APP_URL}/s/${res().shortCode}`}
                            />}
                        </Show>
                    </div>
                </div>
            </div>
        </div>
    )
}



