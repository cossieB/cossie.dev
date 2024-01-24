import { type JSXElement, createContext, createEffect } from "solid-js";
import { createAsync } from "@solidjs/router";
import { NewType, getUser } from "../../routes/admin";

export const AdminContext = createContext<NewType | null>(null);

export function AdminContextProvider(props: { children: JSXElement; }) {
    const user = createAsync(async () => getUser());
    createEffect(() => {
        window.localStorage.setItem('test', user() ?? "");
    });
    return (
        <AdminContext.Provider
            value={{
                user: user() ?? "",
            }}>
            {props.children}
        </AdminContext.Provider>
    );
}
