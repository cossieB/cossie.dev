import { Accessor, JSX, Setter, createContext, createSignal } from "solid-js";

type UserCtx = {
    username: Accessor<string>
    setUsername: Setter<string>
}

export const UserContext = createContext<UserCtx>()

export function UserProvider(props: {children: JSX.Element}) {
    const [username, setUsername] = createSignal("")
    return (
        <UserContext.Provider value={{username, setUsername}} >
            {props.children}
        </UserContext.Provider>
    )
}