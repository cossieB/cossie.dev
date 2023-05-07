import { Motion, Presence } from "@motionone/solid";
import { Link } from "@solidjs/router";
import { Accessor, Setter } from "solid-js";
import { Projs } from "~/components/Projects/projectArray";
import styles from "~/components/Projects/Projects.module.scss"
import { External } from "~/svgs";
import ExternalLink from "../shared/ExternalLink";
import { Links } from "./Links";

export type Props = {
    proj: Projs,
    i: Accessor<number>
}

export default function ProjectTile(props: Props) {
    return (
        <Presence exitBeforeEnter>
            <Motion.div
                class={styles.tile}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -100 }}
                transition={{delay: props.i() * 0.05}}
            >
                <img src={props.proj.img} alt={props.proj.path} />
                {props.proj.external ?
                    <>
                        <ExternalLink href={props.proj.path}>
                            {props.proj.title} &nbsp;
                            <span>{<External />}</span>
                        </ExternalLink>
                    </> :
                    <>
                        {props.proj.path ?
                            <Link href={props.proj.path} >
                                {props.proj.title}
                            </Link> :
                            <span >
                                {props.proj.title}
                            </span>

                        }
                    </>
                }
                {<Links {...props} />}
            </Motion.div>
        </Presence>
    )
}
