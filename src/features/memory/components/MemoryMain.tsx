import GameStart from "./GameStart"
import styles from './memory.module.css';
import Board from "./Board"
import { createSignal, Match, Switch, useContext } from "solid-js";
import Instructions from "./Instructions";
import MemoryProvider, { MemoryContext } from "./MemoryProvider";
import { Form } from "~/components/Form/Form";
import { createStore } from "solid-js/store";
import Finished from "./Finished";
import { useSearchParams } from "@solidjs/router";

export default function MemoryMain() {
    return (
        <MemoryProvider>
            <Main />
        </MemoryProvider>
    )
}

function Main() {
    const [store, setStore] = createStore({name: ""})
    const [searchParams, setSearchParams] = useSearchParams()
    const {state} = useContext(MemoryContext)!
    const [readInstructions, setReadInstructions] = createSignal(false);
    return (
        <div class="container" id={styles.memory}>
            <Switch fallback={<GameStart />} >
                <Match when={!searchParams.name} >
                    <Form 
                        handleSubmit={() => setSearchParams({name: store.name})}
                        disabled={!store.name}
                    >
                        <Form.FormInput
                            setter={setStore}
                            field="name"
                            value={store.name}
                        />
                    </Form>
                </Match>
                <Match when={!readInstructions()}>
                    <Instructions setReadInstructions={setReadInstructions} />
                    <Board />
                </Match>
                <Match when={state.finished} >
                    <Finished
                        setReadInstructions={setReadInstructions}
                    />
                </Match>
            </Switch>
        </div>
    )
}
