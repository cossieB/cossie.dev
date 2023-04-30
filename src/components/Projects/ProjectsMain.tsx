import { createSignal } from "solid-js";
import { Projs } from "~/components/Projects/projectArray";
import MySiteTitle from "~/components/shared/MySiteTitle";
import { ProjectList } from "./ProjectList";
import styles from "~/components/Projects/Projects.module.scss"
import PageBtn from "~/components/Projects/pageBtn";
import Details from "~/components/Projects/Details";

export const [selected, setSelected] = createSignal<Projs | null>(null)

export default function ProjectsMain() {
    const [page, setPage] = createSignal(0);
    return (
        <main class="container" id={styles.container}>
            <MySiteTitle>Projects</MySiteTitle>
            <div class={styles.main} classList={{[styles.hide]: !!selected()}}>
                <h1>Projects</h1>
                <ProjectList page={page()} setSelected={setSelected} />
                <PageBtn
                    setPage={setPage}
                    isNextBtn={false}
                    label="&#171;"
                    page={page}
                />
                <PageBtn
                    setPage={setPage}
                    isNextBtn
                    label="&#187;"
                    page={page}
                />
            </div>
            <Details />
        </main>
    )
}


