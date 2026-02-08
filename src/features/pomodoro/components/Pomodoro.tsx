import { useContext } from "solid-js";
import styles from "./pomodoro.module.css"
import PomodoroProvider, { PomodoroContext } from "./PomodoroProvider";
import { TimerIcon, TimerResetIcon } from "lucide-solid";

export default function PomodoroMain() {
    return (
        <PomodoroProvider>
            <Main />
        </PomodoroProvider>
    )
}

function Main() {
    const state = useContext(PomodoroContext)!
    return (
        <main id={styles.pomodoro} class="container">
            <div id={styles.outer}>
                <div id={styles.controls}>
                    <section >
                        <h2 id={styles["break-label"]}>Break Length</h2>
                        <div class={styles.buttonDiv}>
                            <button id={styles["break-increment"]} class={styles.pomoBtn} onClick={state.incBreak} value={"1"}>↑</button>
                            <h3 id={styles["break-length"]}>{state.state.breakMin}</h3>
                            <button id={styles["break-decrement"]} class={styles.pomoBtn} onClick={state.incBreak} value={"-1"}>↓</button>
                        </div>
                    </section>
                    <section >
                        <h2 id={styles["session-label"]}>Session Length</h2>
                        <div class={styles.buttonDiv}>
                            <button id={styles["session-increment"]} class={styles.pomoBtn} value={"1"} onClick={state.incSess}>↑</button>
                            <h3 id={styles["session-length"]}> {state.state.sessionMin}</h3>
                            <button id={styles["session-decrement"]} class={styles.pomoBtn} value={"-1"} onClick={state.incSess}>↓</button>
                        </div>
                    </section>
                </div>
                <div id={styles["timer-div"]}>
                    {state.state.seconds > 0 ? <h2 id={styles["timer-label"]}>Session</h2> : <h2 id={styles["timer-label"]}> Break </h2>}
                    <section id={styles["time-left"]}>{state.state.seconds > 0 ? state.state.left() : state.state.breakTime()}</section>
                </div>
                <div id={styles.buttons}>
                    <button id={styles.reset} class={styles.pomoBtn} onClick={state.reset}>
                        <TimerResetIcon size={"2.5rem"} />
                    </button>
                    <button id={styles["start_stop"]} class={styles.pomoBtn} onClick={state.start} classList={{[styles.waiting]: !state.state.timer}}>
                        <TimerIcon  size={"2.5rem"} />
                    </button>
                </div>
            </div>
        </main>
    )
}