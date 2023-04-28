import type { JSXElement } from "solid-js"
import { Link } from "@solidjs/router"
import styles from '~/components/Home/Home.module.scss'

type Props = {
    href: string,
    label: string
    icon: JSXElement
}

export default function NavItem({href, label, icon}: Props) {
    return (
        <Link class={styles.homepageLinks} href={href}>
            <div class={styles.navDiv}>
                {icon}
                <span>{label}</span>
            </div>
        </Link>
    )
}