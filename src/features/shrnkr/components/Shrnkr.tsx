import { action, createStore, Loading, ParentProps, Show } from "solid-js";
import styles from "./Shrnkr.module.css"
import { user } from "~/features/auth/api";
import { AuthButtonsGroup } from "~/features/auth/components/AuthButtonGroup";
import { Hero } from "./Hero";
import { ShrnkrForm } from "./ShrnkrForm";
import { ShrnkrPreview } from "./Preview";
import { LinkCategory } from "./types";
import { ShrnkrResult } from "./ShrnkrResult";

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

    const a = action(function*() {
        'use server'
    })

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
                        
                    </div>
                </div>
            </div>
        </div>
    )
}



