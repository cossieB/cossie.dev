import { CircleQuestionMarkIcon, CodeIcon, ExternalLinkIcon } from "@lucide/solid";
import { Projs } from "../utils/projectArray";
import styles from "./home.module.css"
import { Setter } from "solid-js";
import { ProjectDetails } from "./ProjectDetails";
import { dynamic, Dynamic } from "@solidjs/web";
import env from "virtual:env/client";


type Props = {
    proj: Projs;
    reversed: boolean;
    setSelectedProject: Setter<Projs | undefined>
};

export function LargeProject(props: Props) {
    const additionalProps = props.proj.external ? { target: "_blank", rel: "noopener" } : undefined
    return (
        <div class={[styles.project, { [styles.reversed]: props.reversed }]}  >
            <img class={styles.img} src={env.VITE_STORAGE_DOMAIN + props.proj.img} alt={props.proj.title} />
            <article >
                <h3> {props.proj.title} </h3>
                <div class={styles.desc}>                    
                    <Dynamic component={props.proj.description} />
                </div>
                <div class={styles.links}>
                    <button title="More information" popovertarget={`popover-${props.proj.title}`}> <CircleQuestionMarkIcon size={"2rem"} /> </button>
                    <a title="Github repo" href={props.proj.repo}  {...additionalProps}> <CodeIcon size={"2rem"} /> </a>
                    <a title="Link to demo" href={props.proj.path}  {...additionalProps}> <ExternalLinkIcon size={"2rem"} /> </a>
                </div>
            </article>
            <ProjectDetails
                proj={props.proj}
            />
        </div>
    )
}

export function SmallProject(props: Props) {
    const additionalProps = props.proj.external ? { target: "_blank", rel: "noopener" } : undefined
    return (
        <div class={styles.small}>
            <img src={env.VITE_STORAGE_DOMAIN + props.proj.img} alt={props.proj.title} />
            <h4> {props.proj.title} </h4>
            <div class={styles.links}>
                <button title="More information" popovertarget={`popover-${props.proj.title}`}> <CircleQuestionMarkIcon size={"2rem"} /> </button>
                <a title="Github repo" href={props.proj.repo} {...additionalProps}> <CodeIcon size={"2rem"} /> </a>
                <a title="Link to demo" href={props.proj.path} {...additionalProps}> <ExternalLinkIcon size={"2rem"} /> </a>
            </div>
            <ProjectDetails
                proj={props.proj}
            />
        </div>
    )
}