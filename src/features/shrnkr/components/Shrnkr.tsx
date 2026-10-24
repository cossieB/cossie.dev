import { action, createSignal, createStore, Loading, ParentProps, Show } from "solid-js";
import styles from "./Shrnkr.module.css"
import { user } from "~/features/auth/api";
import { AuthButtonsGroup } from "~/features/auth/components/AuthButtonGroup";
import { Hero } from "./Hero";
import { ShrnkrForm } from "./ShrnkrForm";
import { ShrnkrPreview } from "./Preview";
import { ShrnkrResult } from "./ShrnkrResult";
import { env } from "virtual:env/client";
import { LinkCategory } from "../services/schema";

export type State = {
    url: string;
    customBackHalf: string;
    category: "general" | "marketing" | "personal" | "work" | "social-media";
    campaignSource: string;
    campaignName: string;
    campaignMedium: string;
    campaignTerm: string;
    expiry: {
        datetime: string;
        timeZone: string;
    };
}

export default function Shrnkr(props: ParentProps) {
    const [input, setInput] = createStore<State>({
        url: "",
        customBackHalf: "",
        category: "general" as LinkCategory,
        campaignSource: "",
        campaignName: "",
        campaignMedium: "",
        campaignTerm: "",
        expiry: {
            datetime: "",
            timeZone: "UTC"
        }
    })

    const [shortCode, setShortCode] = createSignal<string>("dksdfk")

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
                                <ShrnkrForm input={input} setInput={setInput} onCreate={setShortCode} />
                            </Show>
                        </Loading>
                    </div>
                    <div class={[styles.panel]}>
                        <ShrnkrPreview
                            url={input.url}
                            category={input.category}
                        />
                        <Show when={shortCode()}>
                            {shortCode => <ShrnkrResult
                                shortenedUrl={`${env.VITE_APP_URL}/s/${shortCode()}`}
                            />}
                        </Show>
                    </div>
                </div>
            </div>
        </div>
    )
}
