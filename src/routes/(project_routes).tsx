import { JSX, JSXElement } from "solid-js";
import Navigator from "~/components/Navigator/Navigator";

export default function ProjectLayout(props: {children: JSXElement}) {
    return (
        <>
            <Navigator />
            {props.children}
        </>
    )
}