import { createSignal, onCleanup, onMount } from "solid-js";
import styles from "./calculator.module.scss"
import type { ClickEvent } from "~/lib/solidTypes";
import Page from "../shared/Page";

const ops = ["*", "/", "+", "-"];

function getBtn(key: string) {
    let button: HTMLButtonElement | undefined
    if (/^\d$/.test(key) || ops.includes(key))
        button = document.querySelector(`button[value="${key}"]`) as HTMLButtonElement;

    if (key === "Enter")
        button = document.getElementById(styles.equals) as HTMLButtonElement;

    if (key == "Backspace")
        button = document.getElementById("calc_del_btn") as HTMLButtonElement;

    if (key == "Escape")
        button = document.getElementById(styles.clear) as HTMLButtonElement;

    if (key == ".")
        button = document.getElementById("calc_decimal") as HTMLButtonElement
    return button;
}

export default function CalculatorMain() {
    const [display, setDisplay] = createSignal("0")
    const [calc, setCalc] = createSignal("")

    function handleKeyup(e: KeyboardEvent) {
        const button = getBtn(e.key);
        button?.classList.remove(styles.clicked)
        button?.click()
    }

    function handleKeydown(e: KeyboardEvent) {
        const button = getBtn(e.key)
        button?.classList.add(styles.clicked)
    }

    onMount(() => {
        document.addEventListener("keyup", handleKeyup)
        document.addEventListener("keydown", handleKeydown)
        onCleanup(() => {
            document.removeEventListener("keyup", handleKeyup)
            document.removeEventListener("keydown", handleKeydown)
        })
    })
    function numPress(e: ClickEvent<HTMLButtonElement>) {
        if (display() !== "0") {
            setDisplay(prev => prev + e.currentTarget.value)
        }
        else {
            setDisplay(e.currentTarget.value)
        }
    }
    function operation(e: ClickEvent<HTMLButtonElement>) {
        const currentDisplay = display()
        if (ops.includes(currentDisplay[currentDisplay.length - 1])) {
            setDisplay(currentDisplay.slice(0, -1) + e.currentTarget.value)
        }
        else {
            setDisplay(prev => prev + e.currentTarget.value)
        }
    }
    function evaluate() {
        const ans = String(eval(display()));
        setCalc(display())
        setDisplay(ans)
    }
    function decimal() {
        let dispNums = display().split(/\*|\+|\-|\//);
        let curNum = dispNums[dispNums.length - 1];
        if (!curNum.includes(".")) {
            if (curNum == "") {
                setDisplay(prev => prev + "0.")
            }
            else
                setDisplay(prev => prev + ".")
        }
    }
    function del() {
        if (display() !== "0") {
            setDisplay(prev => prev.slice(0, -1))

            if (display().length == 1) {
                setDisplay("0")
            }
        }
    }
    return (
        <Page title="Calculator">
            <main id={styles.calcContainer} class="container">
                <div id={styles.calculator}>
                    <div id={styles.calcDisp}>
                        <div>{display()}</div>
                        <div id={styles.result}>{calc()}</div>
                    </div>
                    <div id={styles.calcButtons}>
                        <button class={styles.numButtons} id={styles.clear} style={{ background: "red" }} onClick={() => {
                            setDisplay("0");
                            setCalc("")
                        }}>
                            AC
                        </button>
                        <button class={styles.numButtons} id={"calc_del_btn"} onClick={del} value="del">←</button>
                        <button class={styles.numButtons} id={styles.multiply} value="*" onClick={operation} >X</button>
                        <button class={styles.numButtons} id={styles.seven} value="7" onClick={numPress}>7</button>
                        <button class={styles.numButtons} id={styles.eight} value="8" onClick={numPress}>8</button>
                        <button class={styles.numButtons} id={styles.nine} value="9" onClick={numPress}>9</button>
                        <button class={styles.numButtons} id={styles.divide} value="/" onClick={operation} >/</button>
                        <button class={styles.numButtons} id={styles.four} value="4" onClick={numPress}>4</button>
                        <button class={styles.numButtons} id={styles.five} value="5" onClick={numPress}>5</button>
                        <button class={styles.numButtons} id={styles.six} value="6" onClick={numPress}>6</button>
                        <button class={styles.numButtons} id={styles.add} value="+" onClick={operation} >+</button>
                        <button class={styles.numButtons} id={styles.one} value="1" onClick={numPress}>1</button>
                        <button class={styles.numButtons} id={styles.two} value="2" onClick={numPress}>2</button>
                        <button class={styles.numButtons} id={styles.three} value="3" onClick={numPress}>3</button>
                        <button class={styles.numButtons} id={styles.subtract} value="-" onClick={operation} >-</button>
                        <button class={styles.numButtons} id={"calc_decimal"} onClick={decimal} >.</button>
                        <button class={styles.numButtons} id={styles.zero} value="0" onClick={numPress}>0</button>
                        <button class={styles.numButtons} id={styles.equals} style={{ background: "green" }} onClick={evaluate}>=</button>
                    </div>
                </div>
            </main>
        </Page>
    )
}

