import { For, Show } from "solid-js";
import { NavLink } from "./NavLink";
import { ExternalLinkIcon } from "lucide-solid";
import { type Projs } from "~/features/home/utils/projectArray";

type P = {
    array: Projs[];
};
export function List(props: P) {
    return (
        <For each={props.array}>
            {item =>
                <li>
                    <NavLink external={item.external} href={item.path!}>
                        {item.title}
                        <Show when={item.external}>
                            <ExternalLinkIcon />
                        </Show>
                    </NavLink>
                </li>}
        </For>
    );
}