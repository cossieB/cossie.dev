import type { Setter } from "solid-js";
import { map } from "./Navbar";
import { projectArray } from "~/features/home/utils/projectArray";
import { ChevronRightIcon } from "lucide-solid";

type Props = {
    setExpanded: Setter<"large" | "game" | "api" | "interactive" | null>;
    type: typeof projectArray[number]['type'];
    label?: string;
};
export function Category(props: Props) {
    return (
        <li onclick={() => props.setExpanded(props.type)}>
            {map[props.type]}
            <ChevronRightIcon />
        </li>
    );
}
