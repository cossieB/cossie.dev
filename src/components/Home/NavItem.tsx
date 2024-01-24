import type { JSXElement } from "solid-js"
import styles from '~/components/Home/Home.module.scss'
import { A } from "@solidjs/router"

type Props = {
    href: string,
    label: string
    icon: JSXElement
}

export default function NavItem({href, label, icon}: Props) {
    return (
        <A class={styles.homepageLinks} href={href}>
            <div class={styles.navDiv}>
                {icon}
                <span>{label}</span>
            </div>
        </A>
    )
}