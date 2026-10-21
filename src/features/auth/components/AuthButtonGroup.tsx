import { AuthButton } from "./AuthButton";
import styles from './AuthButton.module.css';
import { authClient } from "~/utils/authClient"
import { action, affects, isPending, refresh } from "solid-js"
import { user } from "../api"

type Provider = 'google' | 'github' | 'anonymous'

const login = action(async function*(provider: Provider) {
    affects(user)
    const callback = provider === "anonymous" ? () => authClient.signIn.anonymous() : () => authClient.signIn.social({provider})
    const {error} = await callback()
    yield;
    if (error) {
        console.error(error)
        alert("Could not sign you in. Try again later")
        return;
    }
    refresh(user)
})

export interface AuthButtonsGroupProps {
    mini?: boolean;    
}

export function AuthButtonsGroup(props: AuthButtonsGroupProps) {
    return (
        <div class={props.mini ? styles.groupMini : styles.group}>
            <AuthButton provider="google" mini={props.mini} onClick={() => login('google')} />
            <AuthButton provider="github" mini={props.mini} onClick={() => login('github')} />
            <AuthButton provider="anonymous" mini={props.mini} onClick={() => login('anonymous')} />
        </div>
    );
}