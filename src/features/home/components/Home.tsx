import { ChevronDownIcon } from "lucide-solid"
import styles from "./home.module.css"
import { Header } from "./Header"
import { projectArray, Projs } from "../utils/projectArray"
import { createEffect, createSignal, For, onCleanup, onMount, Show } from "solid-js"
import { ProjectDetails } from "./ProjectDetails"
import { LargeProject, SmallProject } from "./Project"
import { ContactMe } from "./ContactMe"
import { STORAGE_DOMAIN } from "~/env"

export function HomePage() {
    const [selectedProject, setSelectedProject] = createSignal<Projs | undefined>()
    createEffect(() => {
        const body = document.body
        if (selectedProject())
            body.classList.add("no-scroll")
        else
            body.classList.remove("no-scroll")
    })
    onMount(() => {
        onCleanup(() => document.body.classList.remove("no-scroll"))
    })
    return (
        <div class={styles.main}>
            <section class={styles.landing}>
                <div class={styles.me}>
                    <h1>Buntu Cossie</h1>
                    <hr />
                    <h2> Full Stack Developer </h2>
                </div>
                <div class={styles.scroll} aria-label="scroll down">
                    <ChevronDownIcon />
                    <ChevronDownIcon />
                    <ChevronDownIcon />
                </div>
            </section>
            <section>
                <Header label="About" id="about" />
                <div class={styles.about} >
                    <img src={`${STORAGE_DOMAIN}/avatar.png`} alt="" />
                    <div class={styles.bio}>
                        <p>
                            I am Buntu Cossie a full-stack developer from South Africa. I make web apps in TypeScript, C#, React, Next.js, Solid.js and PostgreSQL amongst a whole list of other technologies. Soon I'll be adding Blazor Webassembly and Rust to my repertoire.
                        </p>
                        <p>
                            Perhaps my two greatest assets are my passion for software development and tech in general, and my ability to quickly learn new skills. These drive me to look for new and creative ways to develop software and solve real world problems.
                        </p>
                        <p>
                            Outside of coding, I enjoy video games, sci-fi and to a lesser extent fantasy. Specifically, I am a huge fan of the Mass Effect trilogy, The Expanse, Cyberpunk, Game of Thrones and The Boys TV series.
                        </p>
                    </div>
                </div>
            </section>
            <section >
                <Header label="Projects" id="projects" />
                <div class={styles.projects}>
                    <For each={projectArray.filter(proj => proj.type == "large")}>
                        {(proj, i) =>
                            <LargeProject
                                proj={proj}
                                reversed={i() % 2 == 0}
                                setSelectedProject={setSelectedProject}
                            />}
                    </For>
                </div>
            </section>
            <section>
                <Header label="Smaller Projects" id="small-projects" />
                <div class={styles.grid} >
                    <For each={projectArray.filter(project => project.type != "large")}>
                        {project =>
                            <SmallProject
                                proj={project}
                                reversed
                                setSelectedProject={setSelectedProject}
                            />
                        }
                    </For>
                </div>
            </section>
            <section>
                <Header label="Contact Me" id="contact" />
                <ContactMe />
            </section>
            <Show when={selectedProject()}>
                {project => <ProjectDetails proj={project()} close={() => setSelectedProject()} />}
            </Show>
        </div>
    )
}
