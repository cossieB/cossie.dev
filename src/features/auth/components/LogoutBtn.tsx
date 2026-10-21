import { isPending } from "solid-js";
import { logout, user } from "../api";
import { Show } from 'solid-js';
import styles from './AuthButton.module.css';
import { LogoutIcon } from './icons';

export interface LogoutButtonProps {
    mini?: boolean;
    label?: string;
}

export function LogoutBtn(props: LogoutButtonProps) {

    return (
        <button
            type="button"
            class={`${styles.btn} ${styles.logout} ${props.mini ? styles.btnMini : ''}`}
            aria-label={"Sign Out"}
            title={props.mini ? "Sign Out" : undefined}
            disabled={isPending(user)}
            onClick={logout}            
        >
            <span class={styles.icon}>
                <LogoutIcon />
            </span>

            <Show when={!props.mini}>
                <span>{"Sign Out"}</span>
            </Show>

            <Show when={props.mini}>
                <span class={styles.tooltip}>{"Sign Out"}</span>
            </Show>
        </button>
    );
}