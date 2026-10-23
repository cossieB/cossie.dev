import { createContext, createEffect, createStore, ParentProps, } from "solid-js";
import { Optional } from "~/lib/utilityTypes";

export const ToastContext = createContext<ToastCtx>()

export type TToast = {
    text: string
    type: 'info' | 'error' | 'warning',
    autoFades: boolean
}

export function ToastProvider(props: ParentProps) {
    const [toasts, setToasts] = createStore<TToast[]>([])

    function addToast(toast: Optional<TToast, 'autoFades'>) {
        toast.autoFades ??= true
        setToasts(state => {
            state.push(toast as TToast)
        })
    }

    function removeToast(idx: number) {
        setToasts(state => {
            return state.filter((_, i) => i != idx)
        })
    }

    function clearToasts() {
        setToasts(() => [])
    }

    return (
        <ToastContext value={{addToast, removeToast, clearToasts, toasts}}>
            {props.children}
        </ToastContext>
    )
}

type ToastCtx = {
    addToast(toast: Optional<TToast, 'autoFades'>): void
    removeToast(i: number): void
    clearToasts(): void
    toasts: TToast[]
}