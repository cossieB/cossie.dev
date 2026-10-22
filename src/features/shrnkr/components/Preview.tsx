import { createMemo, isPending, Loading, Show } from "solid-js";
import styles from "./Preview.module.css";
import { validateUrl } from "~/lib/validateUrl";
import { LinkCategory } from "../api";

type Props = {
    url: string;
    category: LinkCategory;
};

type PreviewData = {
    image: string;
    title: string;
    description: string;
};

const defaults: PreviewData = {
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
    title: "Shrnkr",
    description: "Minify your links",
};

async function fetchPreview(rawUrl: string): Promise<PreviewData> {
    const url = validateUrl(rawUrl);
    if (!url) return defaults;

    try {
        const response = await fetch(url);
        if (!response.ok) return defaults;

        const html = await response.text();
        const doc = new DOMParser().parseFromString(html, "text/html");

        const getMeta = (property: string) =>
            doc.querySelector(`meta[property="${property}"]`)?.getAttribute("content") ||
            doc.querySelector(`meta[name="${property}"]`)?.getAttribute("content");

        const title = getMeta("og:title") || doc.querySelector("title")?.textContent || defaults.title;
        const description = getMeta("og:description") || getMeta("description") || defaults.description;
        const image = getMeta("og:image") || defaults.image;

        return { title, description, image };
    } catch (error) {
        console.error("Failed to fetch preview image:", error);
        return defaults;
    }
}

export function ShrnkrPreview(props: Props) {

    const preview = createMemo(() => fetchPreview(props.url))

    return (
        <div class={[styles.card, { [styles.refetching]: isPending(preview) }]}>
            <Loading>
                <div class={[styles.imageWrapper,]}>
                    <img

                        src={preview().image || defaults.image}
                        alt={preview().title || defaults.title}
                        class={styles.image}
                        loading="lazy"
                    />
                    <span class={`${styles.badge} ${styles[props.category]}`}>
                        {props.category}
                    </span>
                </div>

                <div class={styles.content}>

                    <h3 class={styles.title}>{preview().title}</h3>
                    <p class={styles.description}>{preview().description}</p>

                </div>
            </Loading>
        </div>
    );
}