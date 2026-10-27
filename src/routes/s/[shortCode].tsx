import { query, useParams } from "@solidjs/router";
import styles from './[shortCode].module.css';
import { paths } from "~/router";
import { createMemo, Loading } from "solid-js";
import { APIEvent } from "filesystem-routing/api";
import { gotoLongUrl } from "~/features/shrnkr/services/linkService";
import { httpStatus } from "@solidjs/web";

export async function GET(event: APIEvent) {
    const { shortCode } = event.params!
    return gotoLongUrl(shortCode)
}

export default function ShrnkrNotFound() {
    const param = useParams()
    const res = createMemo(() => query(() => gotoLongUrl(param.shortCode!), "goto"), {
        deferStream: true,

    })
    httpStatus(404)
    return (
        <Loading>
            {res()}
            <div class={styles.container}>
                <div class={styles.card}>
                    {/* Brand Header */}
                    <div class={styles.logo}>Shrnkr</div>

                    {/* Visual Cue */}
                    <div class={styles.illustration}>
                        <span class={styles.badge}>4</span>
                        <svg
                            class={styles.brokenLinkIcon}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                            />
                        </svg>
                        <span class={styles.badge}>4</span>
                    </div>

                    {/* Message */}
                    <h1 class={styles.title}>Short URL Not Found</h1>
                    <p class={styles.description}>
                        The link you tried to access doesn't exist, has expired, or was typed incorrectly.
                    </p>

                    {/* Call to Actions */}
                    <div class={styles.actions}>
                        <a href={paths["shrnkr"]} class={styles.primaryButton}>
                            Create a New Short Link
                        </a>
                        <a href="/" class={styles.secondaryButton}>
                            Go Home
                        </a>
                    </div>
                </div>
            </div>
        </Loading>
    );
}