import { createStore } from "solid-js";

type Card = { index: number; label: string };

type GameState = {
    name: string;
    activeCards: Card[];
    matches: Set<string>;
    inputDisabled: boolean;
    time: number;
    flips: number;
    finished: boolean;
    gameSize: number;
};

// factory, so each reset gets fresh array/Set instances rather than shared references
const createInitialState = (): GameState => ({
    name: "",
    activeCards: [],
    matches: new Set<string>(),
    inputDisabled: false,
    time: 0,
    flips: 0,
    finished: false,
    gameSize: 2,
});

export function useMemory() {
    const [state, setState] = createStore<GameState>(createInitialState());

    function flipOver(payload: Card) {
        setState(s => {
            if (s.activeCards.length > 1) return;
            s.activeCards.push(payload);
            s.flips++;
            if (s.activeCards.length === 2) s.inputDisabled = true;
        });
    }

    function correct(payload: string) {
        setState(s => {
            // new Set so the `matches` property actually changes (see note below)
            s.matches = new Set([...s.matches, payload]);
            s.activeCards = [];
            s.flips++;
        });
    }

    function clearActiveCards() {
        setState(s => {
            s.activeCards = [];
            s.inputDisabled = false;
        });
    }

    function increaseTime() {
        setState(s => {
            s.time++;
        });
    }

    function win() {
        setState(s => {
            s.finished = true;
        });
    }

    function changeBoardSize(payload: number) {
        setState(s => {
            s.gameSize += payload;
        });
    }

    function playAgain() {
        setState(s => {
            Object.assign(s, createInitialState(), { gameSize: s.gameSize });
        });
    }

    function setName(name: string) {
        setState(s => {
            s.name = name;
        });
    }

    return {
        flipOver,
        correct,
        clearActiveCards,
        increaseTime,
        changeBoardSize,
        playAgain,
        win,
        setName,
        state,
    };
}