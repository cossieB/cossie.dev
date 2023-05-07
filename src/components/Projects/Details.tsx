import styles from "~/components/Projects/Projects.module.scss"
import { Links } from "./Links"
import { For, useContext } from "solid-js"
import { StackLogo } from "./StackLogo"
import { ProjectsContext } from "./ProjectsProvider"

export default function Details() {
    const {selected} = useContext(ProjectsContext)!
    return (
        <div
            class={styles.details}
            classList={{ [styles.show]: !!selected() }}
        >
            <div>
                <div>
                    <h2> {selected()?.title ?? ""} </h2>
                    {selected() && <Links
                        proj={selected()!}
                    />}
                </div>
                <article> {selected()?.description} </article>
                <div class={styles.images}>
                    <img class={styles.desktopImg} src={selected()?.img} alt={`${selected()?.title} computer screenshot`} />
                    {selected()?.imgMobile && <img class={styles.mobileImg} src={selected()!.imgMobile} alt={`${selected()?.title} mobile screenshot`} />}
                </div>
                <div class={styles.stack}>
                    <For each={(selected()?.stack ?? [])}>
                        {framework => <StackLogo framework={framework} />}
                    </For>
                </div>
            </div>
        </div>
    )
}
