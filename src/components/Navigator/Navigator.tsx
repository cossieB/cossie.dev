import { Show, createSignal } from "solid-js"
import { projectArray } from "../Projects/projectArray"
import styles from "./navigator.module.scss"
import { Transition } from "solid-transition-group"
import clickOutside from "~/lib/clickOutside"
import { Navbar } from "./Navbar"
import { MenuButton } from "./MenuButton"
false && clickOutside

export default function Navigator() {
    const [isOpen, setIsOpen] = createSignal(false)
    const [expanded, setExpanded] = createSignal<typeof projectArray[number]['type'] | null>(null)
    const [height, setHeight] = createSignal(100)
    const close = () => {
        setIsOpen(false);
        setExpanded(null);
        setHeight(0)
    }
    let ref!: HTMLDivElement
    return (
        <div ref={ref} class={styles.nav}
            style={{ '--navHeight': `${height()}px` }}
            
            use:clickOutside={close}
        >
            <MenuButton
                close={close}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />
            <Transition
                onEnter={(el, done) => {
                    setHeight(el.children[0].clientHeight);
                    done()
                }}
                onExit={(el, done) => {
                    const a = el.animate([{opacity: 1}, {opacity: 0}], {
                        duration: 250
                    })
                    setHeight(0);
                    a.finished.then(done)
                }}
            >
                <Show when={isOpen()}>
                    <Navbar
                        expanded={expanded}
                        isOpen={isOpen}
                        div={ref}
                        setHeight={setHeight}
                        setExpanded={setExpanded}
                    />
                </Show>
            </Transition>
        </div>
    )
}
