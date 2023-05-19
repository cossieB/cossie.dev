import AboutMe from "./AboutMe"
import Languages from "./Languages"
import { aboutNavBtns } from "./utils"
import { langs, frontend, backend, misc } from "./vars";
import styles from './about.module.scss'
import { For, Match, Switch, createSignal } from "solid-js";
import { Transition } from "solid-transition-group";

export default function AboutMain() {
    const [page, setPage] = createSignal<typeof aboutNavBtns[number][0]>(aboutNavBtns[0][0])
    return (
        <div id={styles.aboutMain}>
            {/* <div id={styles.aboutNav}>
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
            </div> */}
            <div id={styles.aboutContent}>
                <AboutMe />
                <Languages arr={langs} />
                <Languages arr={frontend} />
                <Languages arr={backend} />
                <Languages arr={misc} />
            </div>
        </div>
    )
}