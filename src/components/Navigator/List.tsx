import { For, Match, Switch } from "solid-js";
import type { Projs } from "../Projects/projectArray";
import ExternalLink from "../shared/ExternalLink";
import { NavLink } from "./NavLink";
import { External } from "~/svgs";
type P = {
    array: Projs[];
};
export function List(props: P) {
    return (
        <For each={props.array}>
            {item =>
                <Switch>
                    <Match when={item.external && item.path}>
                        <li>
                            <ExternalLink href={item.path!}>
                                {item.title} {" "}
                                <External />
                            </ExternalLink>
                        </li>
                    </Match>
                    <Match when={item.path}>
                        <NavLink href={item.path!}>
                            {item.title}
                        </NavLink>
                    </Match>
                </Switch>}
        </For>
    );
}