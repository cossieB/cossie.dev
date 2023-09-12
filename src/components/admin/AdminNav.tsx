import { AdminLi, AdminNavLink } from "./AdminNavLink";
import styles from "./nav.module.scss";

export default function AdminNav() {
    return (
        <nav class={styles.nav}>
            <ul>
                <AdminLi href="/admin/games">
                    Games
                </AdminLi>
                <AdminLi href="/admin/developers">
                    Developers
                </AdminLi>
                <AdminLi href="/admin/publishers">
                    Publishers
                </AdminLi>
                <AdminLi href="/admin/platforms">
                    Platforms
                </AdminLi>
            </ul>
        </nav>
    )
}

