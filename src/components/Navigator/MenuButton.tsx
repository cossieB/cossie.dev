import { MenuIcon, XIcon } from "lucide-solid";
import { type Accessor, type Setter, Show } from "solid-js";

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
            fallback={<MenuIcon size={"2rem"} />}
        >
            <XIcon size={"2rem"} />
        </Show>
    </button>;
}
