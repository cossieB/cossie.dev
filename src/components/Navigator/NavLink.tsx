import type { Element } from "solid-js";

type Props = {
    href: string;
    children: Element;
    external?: boolean
};
export function NavLink(props: Props) {
    const additionalProps = props.external ? { target: "_blank", rel: "noreferrer" } : undefined
    return (
        <a href={props.href} {...additionalProps}>
            <li>
                {props.children}
            </li>
        </a>
    );
}
