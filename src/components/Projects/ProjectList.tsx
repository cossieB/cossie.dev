import { For, Setter } from "solid-js";
import ProjectTile from "./ProjectTile";
import { splitArray } from "~/lib/splitArray";
import { Projs, projectArray } from "./projectArray";
import styles from "~/components/Projects/Projects.module.scss"

export const paginatedProjects = splitArray(projectArray, 6)

type Props = {
    page: number;
    setSelected: Setter<Projs | null>
};
export function ProjectList(props: Props) {
    const proj = () => paginatedProjects[props.page];
    return (
        <div id={styles.projects}>
            <For each={proj()}>
                {(proj, i) => <ProjectTile i={i} setSelected={props.setSelected} proj={proj} />}
            </For>
        </div>
    );
}
