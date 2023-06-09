import { AdminNavLink } from "./AdminNavLink";
import styles from "./nav.module.scss";

export default function AdminNav() {
    return (
        <nav class={styles.nav}>
            <ul>
                <AdminNavLink href="/admin/games">
                    Games
                </AdminNavLink>
                <AdminNavLink href="/admin/developers">
                    Developers
                </AdminNavLink>
                <AdminNavLink href="/admin/publishers">
                    Publishers
                </AdminNavLink>
            </ul>
        </nav>
    )
}