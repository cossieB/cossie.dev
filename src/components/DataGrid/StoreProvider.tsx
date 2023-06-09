import { JSX, createContext, createMemo } from "solid-js"
import {  createStore } from "solid-js/store"
import type { StoreCtx, Filter, Header } from "./types"

type Props<T extends Object> = {
    arr: Header<T>[]
    children: JSX.Element
}
export const AdminContext = createContext<StoreCtx<any>>()

export function StoreProvider<T extends Object>(props: Props<T>) {
    const [state, setState] = createStore({
        headers: [...props.arr],
        get columns() {
            return columns()
        },
        colCount: () => state.columns.length,
        sort: null as (keyof T & string) | null,
        sortDir: 1,
        filters: [] as Filter<T>[],
    })
    const columns = createMemo(() => state.headers.filter(x => x.isSelected))
        
    return (
        <AdminContext.Provider value={{state, setState} as StoreCtx<any>}>
            {props.children}
        </AdminContext.Provider>
    )
}