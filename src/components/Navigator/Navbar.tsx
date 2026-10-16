import { type Accessor, For, Match, type Setter, Switch } from "solid-js";
import { Category } from "./Category";
import { List } from "./List";
import { NavLink } from "./NavLink";
import { projectArray, type Projs } from "~/features/home/utils/projectArray";
import { ChevronLeftIcon } from "@lucide/solid";

export const map: { [k in Projs['type']]: string } = {
    backend: "Backend Projects",
    frontend: "Frontend Projects",
    "full-stack": "Full-Stack Projects"
}

const paths = [{
    title: "Home",
    path: '/'
}, {
    title: "About Me",
    path: '#about'
}, {
    title: "Projects",
    path: "#projects"
}, {
    title: "Contact Me",
    path: '#contact'
}]


type Props = {
    div: HTMLDivElement;
    setHeight: Setter<number>;
    isOpen: Accessor<boolean>;
    expanded: Accessor<"full-stack" | "backend" | "frontend" | null>;
    setExpanded: Setter<"full-stack" | "backend" | "frontend" | null>;
};
export function Navbar(props: Props) {
    return (
        <nav>
            <Switch>
                <Match when={props.isOpen() && !!props.expanded()}>
                    <ul>
                        <header onClick={() => props.setExpanded(null)}>
                            <ChevronLeftIcon />{" "}
                            <span>{map[props.expanded()!]}</span>
                        </header>
                        <List array={projectArray.filter(x => x.type === props.expanded())} />
                    </ul>
                </Match>
                <Match when={props.isOpen()}>
                    <ul>
                        <For each={paths}>
                            {path =>
                                <NavLink
                                    children={path.title}
                                    href={path.path}
                                />}
                        </For>
                        <Category setExpanded={props.setExpanded} type="full-stack" />
                        <Category setExpanded={props.setExpanded} type="backend" />
                        <Category setExpanded={props.setExpanded} type="frontend" />
                    </ul>
                </Match>
            </Switch>
        </nav>
    )
}
