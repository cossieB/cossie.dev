import { A } from "@solidjs/router";
import { type Projs } from "~/components/Projects/projectArray";
import styles from "~/components/Projects/Projects.module.scss"
import { External } from "~/svgs";
import ExternalLink from "../shared/ExternalLink";
import { Links } from "./Links";
import { Transition } from "solid-transition-group";
import { type Accessor } from "solid-js";

export type Props = {
    proj: Projs,
    i: Accessor<number>
}

export default function ProjectTile(props: Props) {
    return (
        <Transition
            appear
            onBeforeEnter={(el) => {
                (el as HTMLDivElement).style.opacity = "0"
            }}
            onEnter={(el, done) => {
                const a = el.animate([{ transform: `translateY(50px)`, opacity: 0 }, { transform: `translateY(0px)`, opacity: 1 }], {
                    duration: 250,
                    delay: props.i() * 50,
                    easing: 'ease'
                });
                a.finished.then(done);
            }}
            onAfterEnter={el => {
                (el as HTMLDivElement).style.opacity = "1"
            }}
        >
            <div
                class={styles.tile}
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
                            <A href={props.proj.path} >
                                {props.proj.title}
                            </A> :
                            <span >
                                {props.proj.title}
                            </span>
                        }
                    </>
                }
                {<Links {...props} />}
            </div>
        </Transition>
    )
}
