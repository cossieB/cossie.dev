import { JSXElement } from "solid-js";
import { A } from "solid-start";

type Props = {
    href: string;
    children: JSXElement;
};
export function NavLink(props: Props) {
    return (
        <li>
            <A href={props.href}>
                {props.children}
            </A>
        </li>
    );
}
