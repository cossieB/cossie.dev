import { createStore } from "solid-js/store";

export function useMemory() {
    const initialState = {
        activeCards: [] as { index: number, label: string }[],
        matches: new Set<string>(),
        inputDisabled: false,
        time: 0,
        flips: 0,
        finished: false,
        gameSize: 2
    }
    const [state, setState] = createStore({ name: "", ...initialState })

    function flipOver(payload: InitState['activeCards'][number]) {
        if (state.activeCards.length > 1) return;
        const updatedState: Partial<InitState> = {
            activeCards: [...state.activeCards, payload],
            flips: state.flips + 1
        }
        if (state.activeCards.length == 1)
            updatedState.inputDisabled = true;

        setState(updatedState)
    }
    function correct(payload: string) {
        setState({
            matches: state.matches.add(payload),
            activeCards: [],
            flips: state.flips + 1
        })
    }
    function clearActiveCards() {
        setState({
            activeCards: [],
            inputDisabled: false
        })
    }
    function increaseTime() {
        setState({ time: state.time + 1 })
    }
    function win() {
        setState({ finished: true })
    }
    function changeBoardSize(payload: number) {
        setState({
            gameSize: state.gameSize + payload
        })
    }
    function playAgain() {
        setState({
            ...initialState,
            gameSize: state.gameSize,
            matches: new Set()
        })
    }
    function setName(name: string) {
        setState({ name })
    }
    return { flipOver, correct, clearActiveCards, increaseTime, changeBoardSize, playAgain, win, setName, state }
}

type InitState = {
    activeCards: {
        index: number;
        label: string;
    }[];
    matches: Set<string>;
    inputDisabled: boolean;
    time: number;
    flips: number;
    finished: boolean;
    gameSize: number;
    name: string
}