import styles from "./home.module.css"

export function Header(props: { label: string, id: string }) {
    return (
        <div class={styles.header} id={props.id}>
            <div class={styles.line} />
            <h3 >{props.label}</h3>
            <div class={styles.line} />
        </div>
    )
}