import { type JSXElement, createContext, createSignal, Accessor, Setter } from "solid-js";

export const AdminContext = createContext<{user: Accessor<string>, setUser: Setter<string>}>();

export function AdminContextProvider(props: { children: JSXElement; }) {
    const [user, setUser] = createSignal("")
 
    return (
        <AdminContext.Provider value={{user, setUser}}>
            {props.children}
        </AdminContext.Provider>
    );
}
