import { type SetStoreFunction } from "solid-js/store"

export type Header<T extends Object> = {
    property: keyof T & string,
    sortable?: boolean,
    canFilter?: boolean,
    isSelected: boolean,
}

export type Filter<T extends Object> = {
    property: keyof T,
    value: string
}
export type State<T extends Object> = {
    headers: Header<T>[];
    readonly columns: Header<T>[];
    colCount: () => number;
    sort: (keyof T & string) | null;
    sortDir: number;
    filters: Filter<T>[];
}
export type StoreCtx<T extends Object> = {
    state: State<T>
    setState: SetStoreFunction<State<T>>
}