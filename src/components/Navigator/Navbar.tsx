import { type Accessor, For, Match, type Setter, Switch } from "solid-js";
import { type Projs, projectArray } from "../Projects/projectArray";
import { LeftArrowSvg } from "~/svgs";
import { Transition } from "solid-transition-group";
import { Category } from "./Category";
import { List } from "./List";
import { NavLink } from "./NavLink";

export const map: { [k in Projs['type']]: string } = {
    api: "API",
    game: "Games",
    interactive: "Interactive",
    large: "Larger Scale Projects"
}

const paths = [{
    title: "Home",
    path: '/'
}, {
    title: "About Me",
    path: '/about'
}, {
    title: "Contact Me",
    path: '/contact'
}, {
    title: "Projects",
    path: "/projects"
}]


type Props = {
    div: HTMLDivElement;
    setHeight: Setter<number>;
    isOpen: Accessor<boolean>;
    expanded: Accessor<"large" | "game" | "api" | "interactive" | null>;
    setExpanded: Setter<"large" | "game" | "api" | "interactive" | null>;
};
export function Navbar(props: Props) {
    return <nav>
        <Transition
            onEnter={(el, done) => {
                const factor = props.expanded() ? 1 : -1
                const dir = factor * 100
                const a = el.animate([{ transform: `translateX(${dir}%)` }, { transform: `translateX(0%)` }], {
                    duration: 250
                });
                props.setHeight(el.clientHeight);
                a.finished.then(done);
            }}
            onExit={(el, done) => {
                const factor = props.expanded() ? -1 : 1
                const dir = factor * 100
                const a = el.animate([{ transform: `translateX(0%)` }, { transform: `translateX(${dir}%)` }], {
                    duration: 250
                });
                a.finished.then(done);
            }}
        >
            <Switch>
                <Match when={props.isOpen() && !!props.expanded()}>
                    <ul>
                        <header onclick={() => props.setExpanded(null)}>
                            <LeftArrowSvg />{" "}
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
                        <Category setExpanded={props.setExpanded} type="large" />
                        <Category setExpanded={props.setExpanded} type="game" />
                        <Category setExpanded={props.setExpanded} type="api" />
                        <Category setExpanded={props.setExpanded} type="interactive" />
                    </ul>
                </Match>
            </Switch>
        </Transition>
    </nav>;
}
