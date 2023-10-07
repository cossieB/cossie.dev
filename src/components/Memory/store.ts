import type { SetStoreFunction } from "solid-js/store";

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

}

export class MemoryWrapper {
    constructor(
        private _state: InitState,
        private setState: SetStoreFunction<InitState>,
        private readonly initialState: InitState
    ) {
        this.flipOver = this.flipOver.bind(this)
        this.correct = this.correct.bind(this)
        this.clearActiveCards = this.clearActiveCards.bind(this)
        this.increaseTime = this.increaseTime.bind(this)
        this.win = this.win.bind(this)
        this.changeBoardSize = this.changeBoardSize.bind(this)
        this.playAgain = this.playAgain.bind(this)
        this.win = this.win.bind(this)
    }
    get state() {
        return this._state
    }
    flipOver(payload: InitState['activeCards'][number]) {
        if (this._state.activeCards.length > 1) return;
        const updatedState: Partial<InitState> = {
            activeCards: [...this._state.activeCards, payload],
            flips: this._state.flips + 1
        }
        if (this._state.activeCards.length == 1)
            updatedState.inputDisabled = true;

        this.setState(updatedState)
    }
    correct(payload: string) {
        this.setState({
            matches: this._state.matches.add(payload),
            activeCards: [],
            flips: this._state.flips + 1
        })
    }
    clearActiveCards() {
        this.setState({
            activeCards: [],
            inputDisabled: false
        })
    }
    increaseTime() {
        this.setState({ time: this._state.time + 1 })
    }
    win() {
        this.setState({ finished: true })
    }
    changeBoardSize(payload: number) {
        this.setState({
            gameSize: this._state.gameSize + payload
        })
    }
    playAgain() {
        this.setState({
            ...this.initialState,
            gameSize: this._state.gameSize,
            matches: new Set()
        })
    }}

