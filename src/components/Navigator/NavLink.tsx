import { JSXElement } from "solid-js";
import { A } from "solid-start";
import styles from "./navigator.module.scss";

type Props = {
    href: string;
    children: JSXElement;
};
export function NavLink(props: Props) {
    return (
        <li>
            <A activeClass={styles.active} end href={props.href}>
                {props.children}
            </A>
        </li>
    );
}
