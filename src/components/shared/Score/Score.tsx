import styles from "./Score.module.scss"

interface Props {
    item: {
        name: string,
        score: number,
        date: Date
    }
}

export default function (props: Props) {
    return (
        <div class={styles.leadership} >
            <div><strong>{props.item.name}</strong></div>
            <div>{props.item.score}</div>
            <div>{props.item.date.toLocaleString('en-za', { day: "2-digit", month: 'short', year: 'numeric' }) + " " + props.item.date.toLocaleTimeString('en-za')}</div>
        </div>
    )
}