import { A } from "@solidjs/router";
import { CircleQuestionMarkIcon, CodeIcon, ExternalLinkIcon } from "lucide-solid";
import { Projs } from "../utils/projectArray";
import styles from "./home.module.css"
import { Setter } from "solid-js";
import { STORAGE_DOMAIN } from "~/env";

type Props = {
    proj: Projs;
    reversed: boolean;
    setSelectedProject: Setter<Projs | undefined>
};

export function LargeProject(props: Props) {
    const additionalProps = props.proj.external ? {target:"_blank", rel:"noreferrer"} : undefined
    return (
        <div class={styles.project} classList={{ [styles.reversed]: props.reversed }} >
            <img src={STORAGE_DOMAIN + props.proj.img} />
            <div class={styles.description}>
                <h3> {props.proj.title} </h3>
                <div class={styles.desc}>
                {props.proj.description}
                </div>
                <div class={styles.links}>
                    <button title="More information" onclick={() => props.setSelectedProject(props.proj)}> <CircleQuestionMarkIcon size={"2rem"} /> </button>
                    <A title="Github repo" href={props.proj.repo}  {...additionalProps}> <CodeIcon size={"2rem"} /> </A>
                    <A title="Link to demo" href={props.proj.path}  {...additionalProps}> <ExternalLinkIcon size={"2rem"} /> </A>
                </div>
            </div>
        </div>
    )
}

export function SmallProject(props: Props) {
    const additionalProps = props.proj.external ? {target:"_blank", rel:"noreferrer"} : undefined    
    return (
        <div class={styles.small}>
            <img src={STORAGE_DOMAIN + props.proj.img} />
            <h4> {props.proj.title} </h4>
            <div class={styles.links}>
                <button title="More information" onclick={() => props.setSelectedProject(props.proj)}> <CircleQuestionMarkIcon size={"2rem"} /> </button>
                <A title="Github repo" href={props.proj.repo} {...additionalProps}> <CodeIcon size={"2rem"} /> </A>
                <A title="Link to demo" href={props.proj.path} {...additionalProps}> <ExternalLinkIcon size={"2rem"} /> </A>
            </div>
        </div>
    )
}