import { CircleXIcon, CodeIcon, ExternalLinkIcon } from "@lucide/solid";
import { For, Show } from "solid-js";
import { Projs } from "../utils/projectArray";
import styles from "./home.module.css"
import clickOutside from "~/lib/clickOutside";
import { STORAGE_DOMAIN } from "~/env";
import { dynamic, Dynamic } from "@solidjs/web";

false && clickOutside

type Props = {
    proj: Projs;
};

export function ProjectDetails(props: Props) {
    const additionalProps = props.proj.external ? { target: "_blank", rel: "noopener" } : undefined
    return (
        <article popover="auto" id={`popover-${props.proj.title}`} class={styles.details}>
            <div class={styles.projectHeader}>
                <h3> {props.proj.title} </h3>
                <div class={styles.links}>
                    <button title="Close" popovertarget={`popover-${props.proj.title}`} popovertargetaction="hide" > <CircleXIcon size={"2rem"} /> </button>
                    <a title="Github repo" href={props.proj.repo} {...additionalProps}> <CodeIcon size={"2rem"} /> </a>
                    <a title="Link to demo" href={props.proj.path} {...additionalProps}> <ExternalLinkIcon size={"2rem"} /> </a>
                </div>
            </div>
            <div class={styles.description}>
                <Dynamic component={props.proj.description} />
            </div>
            <div class={styles.screens} >
                <img src={STORAGE_DOMAIN + props.proj.img} alt="" />
                <Show when={props.proj.imgMobile}>
                    <img src={STORAGE_DOMAIN + props.proj.imgMobile} alt="" />
                </Show>
            </div>
            <div aria-label="Technologies used" class={styles.stack} >
                <For each={props.proj.stack}>
                    {tool => <img title={tool} class={styles.tool} src={`${STORAGE_DOMAIN}/stack/${tool}.png`} alt="" />}
                </For>
            </div>
        </article>
    )
}