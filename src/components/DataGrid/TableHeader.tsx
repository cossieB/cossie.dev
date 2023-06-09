import { Setter, Show, createSignal, mergeProps, onMount, useContext } from "solid-js";
import styles from "./DataGrid.module.scss";
import { AdminContext } from "./StoreProvider";
import { StoreCtx, Header } from "./types";

type Props<T extends Object> = {
    item: Header<T>;
};
export function TableHeader<T extends Object>(props: Props<T>) {
    const merged = mergeProps({ sortable: false, canFilter: false }, props.item);
    const [showFilterInput, setShowFilterInput] = createSignal(false)
    const { state, setState } = useContext<StoreCtx<T> | undefined>(AdminContext)!

    const isSortedASC = () => state.sort == props.item.property && state.sortDir == 1

    function handleSort() {
        if (state.sort == merged.property) {
            setState('sortDir', p => p * -1)
        }
        else {
            setState({
                sort: props.item.property,
                sortDir: 1
            })
        }
    }

    return (
        <th class={`${styles.th} ${styles.tc}`}>
            <Show when={merged.canFilter}>
                <i class="bi bi-funnel-fill"
                    onclick={() => setShowFilterInput(true)}
                />
            </Show>
            {" "}{merged.property}{" "}
            <Show when={merged.sortable}>
                <i
                    class="bi"
                    classList={{
                        "bi-sort-up": isSortedASC(),
                        "bi-sort-down": !isSortedASC()
                    }}
                    onclick={handleSort}
                />
            </Show>
            <Show when={showFilterInput()}>
                <FilterInput setShowFilterInput={setShowFilterInput} {...props} />
            </Show>
        </th>
    );
}
type P = {
    setShowFilterInput: Setter<boolean>
}
function FilterInput<T extends Object>(props: P & Props<T>) {
    const { state, setState } = useContext<StoreCtx<T> | undefined>(AdminContext)!
    let ref!: HTMLInputElement
    onMount(() => {
        if (!ref) return;
        ref.focus()
        const item = state.filters.find(filt => filt.property == props.item.property)
        ref.value = item?.value ?? ""
    })
    function submit(e: SubmitEvent) {
        e.preventDefault()
        const exists = state.filters.some(x => x.property == props.item.property)
        if (exists)
            setState('filters', f => f.property == props.item.property, { value: ref.value })
        else
            setState('filters', p => [
                ...p, {
                    property: props.item.property,
                    value: ref.value
                }])
    }
    return (
        <form
            onsubmit={submit}
        >
            <input
                ref={ref}
                onblur={() => props.setShowFilterInput(false)}
                type="text"
            />
        </form>
    )
}