import { createSignal, useContext } from "solid-js";
import MySiteTitle from "~/components/shared/MySiteTitle";
import { ProjectList } from "./ProjectList";
import styles from "~/components/Projects/Projects.module.scss"
import PageBtn from "~/components/Projects/pageBtn";
import Details from "~/components/Projects/Details";
import { ProjectsContext, ProjectsProvider } from "./ProjectsProvider";

export default function ProjectsMain() {
    return (
        <ProjectsProvider>
            <Main />
        </ProjectsProvider>
    )
}
function Main() {
    const [page, setPage] = createSignal(0);
    const { selected } = useContext(ProjectsContext)!
    return (
        <main class="container" id={styles.container}>
            <MySiteTitle>Projects</MySiteTitle>
            <div class={styles.main} classList={{ [styles.hide]: !!selected() }}>
                <h1>Projects</h1>
                <ProjectList page={page()} />
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