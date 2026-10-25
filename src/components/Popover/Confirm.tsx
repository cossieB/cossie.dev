import { ComponentProps, Show, omit } from "solid-js"
import styles from "./Confirm.module.css"
import clickOutside from "~/lib/clickOutside";
import { JSX } from "@solidjs/web/jsx-runtime";
false && clickOutside;

type BaseProps = {
    headline: string
    additionalText?: string
    onConfirm: () => void
    type?: HTMLInputElement['type']
    label?: string
};

type ValueProps =
    | { challengeAnswer: string; setChallengeAnswer: (val: string) => void; }
    | { challengeAnswer?: never; setChallengeAnswer?: never; };

type Props = JSX.Properties<HTMLDialogElement> & {
    
} & BaseProps & ValueProps

export function ConfirmDialog(props: Props) {
    let dialogElem!: HTMLDialogElement
    let inputRef!: HTMLInputElement
    const attributes = omit(props, "headline", "onConfirm", "type", "label", "challengeAnswer", "setChallengeAnswer", "additionalText")
    
    return (
        <dialog
            {...attributes}       
                 
            ref={[el => dialogElem = el, clickOutside(() => dialogElem?.close())]}
            class={styles.dialog}
        >
            <span class={styles.headline} >{props.headline}</span>
            <Show when={props.additionalText}>
                <p> {props.additionalText} </p>
            </Show>

            <div class={styles.btns}>
                <button 
                    autofocus
                    onClick={() => dialogElem.close()}
                >
                    Cancel
                </button>
            <button
                disabled={props.setChallengeAnswer && !props.challengeAnswer}
                onClick={() => {
                    props.onConfirm()
                    dialogElem.close()
                }}
            >
                Confirm
            </button>

            </div>
        </dialog>
    )
}