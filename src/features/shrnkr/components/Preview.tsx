import { createMemo, isPending } from "solid-js";
import styles from "./Preview.module.css";
import { LinkCategory } from "../services/schema";
import { defaults, fetchPreview, validateUrl } from "../utils/previewUrl";

type Props = {
    url: string;
    category: LinkCategory;
};

export function ShrnkrPreview(props: Props) {

    const preview = createMemo(() => {
        const url = validateUrl(props.url)
        if (!url) return defaults
        return fetchPreview(url)
    }, {
        loadingValue: defaults,        
    })

    return (
        <div class={[styles.card, { [styles.refetching]: isPending(preview) }]}>            
                <div class={[styles.imageWrapper,]}>
                    <img
                        src={preview().image}
                        alt={preview().title}
                        class={styles.image}
                        loading="lazy"
                    />
                    <span class={[styles.badge, styles[props.category]]}>
                        {props.category}
                    </span>
                </div>

                <div class={styles.content}>

                    <h3 class={styles.title}>{preview().title}</h3>
                    <p class={styles.description}>{preview().description}</p>

                </div>
            
        </div>
    );
}