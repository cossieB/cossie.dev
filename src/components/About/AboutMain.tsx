import AboutMe from "./AboutMe"
import Languages from "./Languages"
import { aboutNavBtns } from "./utils"
import { langs, frontend, backend, misc } from "./vars";
import styles from './about.module.scss'
import { For, Match, Switch, createSignal } from "solid-js";

export default function AboutMain() {
    const [page, setPage] = createSignal<typeof aboutNavBtns[number][0]>(aboutNavBtns[0][0])
    return (
        <div id={styles.aboutMain}>
            <div id={styles.aboutNav}>
                <For each={aboutNavBtns}>
                    {item =>
                        <button
                            onClick={() => setPage(item[0])}
                            class={styles.aboutNavBtn}
                            classList={{ [styles.active]: page() == item[0] }}
                        >
                            <span class={styles.langIco}>
                                {item[1]}
                            </span>
                            <span class={styles.langName}>
                                {item[0]}
                            </span>
                        </button>
                    }
                </For>
            </div>
            <div id={styles.aboutContent}>
                <Switch>
                    <Match when={page() == 'About'}>
                        <AboutMe />
                    </Match>
                    <Match when={page() == 'Languages'}>
                        <Languages arr={langs} />
                    </Match>
                    <Match when={page() == 'Front-End'}>
                        <Languages arr={frontend} />
                    </Match>
                    <Match when={page() == 'Back-End'}>
                        <Languages arr={backend} />
                    </Match>
                    <Match when={page() == 'Misc'}>
                        <Languages arr={misc} />
                    </Match>
                </Switch>
            </div>
        </div>
    )
}