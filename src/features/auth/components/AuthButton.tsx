import { createMemo, isPending, Show } from 'solid-js';
import styles from './AuthButton.module.css';
import { GoogleIcon, GithubIcon, AnonIcon } from './icons';
import { user } from '../api';

export type AuthProvider = 'google' | 'github' | 'anonymous';

export interface AuthButtonProps {
    provider: AuthProvider;
    mini?: boolean;
    onClick?: () => void;
}


export function AuthButton(props: AuthButtonProps) {
    const config = createMemo(() => {
        switch (props.provider) {
            case 'google':
                return { label: 'Sign in with Google', shortLabel: 'Google', className: styles.google, Icon: GoogleIcon };
            case 'github':
                return { label: 'Sign in with GitHub', shortLabel: 'GitHub', className: styles.github, Icon: GithubIcon };
            case 'anonymous':
                return { label: 'Continue as Guest', shortLabel: 'Anonymous', className: styles.anon, Icon: AnonIcon };
            default:
                throw new Error("Unhandled Auth provider: " + props.provider)
        }
    });

    return (
        <button
            type="button"
            onClick={() => props.onClick?.()}
            class={[styles.btn, config().className, {[styles.btnMini]: props.mini}]}            
            aria-label={config().label}
            disabled={isPending(user)}
        >
            <span class={styles.icon}>{config().Icon()}</span>

            <Show when={!props.mini}>
                <span>{config().label}</span>
            </Show>

            <Show when={props.mini}>
                <span class={styles.tooltip}>{config().shortLabel}</span>
            </Show>
        </button>
    );
}

