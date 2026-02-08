import { type JSXElement } from "solid-js";
import { A } from "@solidjs/router";
import styles from "./navigator.module.css";

type Props = {
    href: string;
    children: JSXElement;
    external?: boolean
};
export function NavLink(props: Props) {
    const additionalProps = props.external ? {target:"_blank", rel:"noreferrer"} : undefined 
    return (
        <li>
            <A activeClass={styles.active} end href={props.href} {...additionalProps}>
                {props.children}
            </A>
        </li>
    );
}
