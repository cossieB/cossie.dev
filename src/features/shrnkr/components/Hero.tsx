import styles from "./Shrnkr.module.css"

export function Hero() {
    return (
        <>
            <h1 class={styles.title}>
                Shorten Links with Live Intelligence
            </h1>
            <p class={styles.description}>
                Transform long, cumbersome URLs into powerful, brandable short links with
                real-time metadata previews, QR code exports, and instant analytics tracking.
            </p>
        </>
    );
}