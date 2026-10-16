import { createStore } from "solid-js";
import { words } from "./words";

const [state, setState] = createStore({
    wordIndex: 0,
    activeRow: 0,
    currentGuess: "",
    guessList: [] as string[],
    inputDisabled: false,
    status: 'playing' as 'playing' | 'won' | 'lost',
    get word() {
        return words[state.wordIndex];
    }
});

export function addLetter(letter: string) {
    if (state.currentGuess.length < 5) {
        setState(s => {
            s.currentGuess += letter;
        });
    }
}

export function backspace() {
    if (state.currentGuess.length > 0) {
        setState(s => {
            s.currentGuess = s.currentGuess.slice(0, s.currentGuess.length - 1);
        });
    }
}

export function flipOver() {
    if (state.guessList.length < 6) {
        setState(s => {
            s.guessList.push(state.currentGuess);
            s.inputDisabled = true;
        });
    }
}

export function nextGuess() {
    setState(s => {
        s.inputDisabled = false;
        s.activeRow += 1;
        s.currentGuess = "";
    });
}

export function endGame(payload: typeof state.status) {
    setState(s => {
        s.inputDisabled = true;
        s.status = payload;
    });
}

export function nextWord() {
    setState(s => {
        s.wordIndex += 1;
        s.activeRow = 0;
        s.currentGuess = "";
        s.guessList = [];
        s.inputDisabled = false;
        s.status = 'playing';
    });
}

export { state };