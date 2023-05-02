import { Show, createSignal } from "solid-js";
import { stack } from "./projectArray";
import Tooltip from "../shared/Tooltip";
import { Presence } from "@motionone/solid";

type Props = {
    framework: string;
};
export function StackLogo(props: Props) {
    const logo = stack[props.framework];
    const [isHovered, setIsHovered] = createSignal(false);
    let ref!: HTMLImageElement;

    return (
        <>
            <img
                ref={ref}
                src={logo}
                alt={props.framework}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)} />
            <Presence>
                <Show when={isHovered()}>
                    <Tooltip
                        x={ref.offsetLeft + ref.offsetWidth}
                        y={ref.offsetTop + ref.offsetHeight / 4}
                        text={props.framework} />
                </Show>
            </Presence>
        </>
    );
}
