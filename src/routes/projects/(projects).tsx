import { createSignal } from "solid-js";
import { projectArray } from "~/components/Projects/projectArray";
import MySiteTitle from "~/components/shared/MySiteTitle";
import { splitArray } from "~/lib/splitArray";
import { ProjectList } from "../../components/Projects/ProjectList";
import styles from "~/components/Projects/Projects.module.scss"

export default function ProjectsPage() {
    const [page, setPage] = createSignal(0);
    return (
        <main class="container" id={styles.container}>
            <h1>Projects</h1>
            <MySiteTitle>Projects</MySiteTitle>
            <ProjectList page={page()}/>
        </main>
    )
}


