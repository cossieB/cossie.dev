import { Accessor, Setter, Show } from "solid-js";
import { CloseSvg, MenuSvg } from "~/svgs";

type Props = {
    isOpen: Accessor<boolean>;
    setIsOpen: Setter<boolean>;
    close: () => void;
};
export function MenuButton(props: Props) {
    return <button
        onclick={() => {
            if (props.isOpen())
                props.close()
            else
                props.setIsOpen(true);
        }}
    >
        <Show
            when={props.isOpen()}
            fallback={<MenuSvg />}
        >
            <CloseSvg />
        </Show>
    </button>;
}
