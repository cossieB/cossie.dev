import styles from "~/components/Projects/Projects.module.scss"
import { Links } from "./Links"
import { selected } from "./ProjectsMain"


export default function Details() {

    return (
        <div
            class={styles.details}
            classList={{ [styles.show]: !!selected() }}
        >
            <div>
                <h2> {selected()?.title ?? ""} </h2>
                {selected() && <Links
                    proj={selected()!}
                />}
            </div>
            <article> {selected()?.description} </article>
        </div>
    )
}