import { Setter } from "solid-js";
import { projectArray } from "../Projects/projectArray";
import { ChevronRight } from "~/svgs";
import titleCase from "~/lib/titleCase";
import { map } from "./Navbar";

type Props = {
    setExpanded: Setter<"large" | "game" | "api" | "interactive" | null>;
    type: typeof projectArray[number]['type'];
    label?: string;
};
export function Category(props: Props) {
    return (
        <li onclick={() => props.setExpanded(props.type)}>
            {map[props.type]}
            <ChevronRight />
        </li>
    );
}
