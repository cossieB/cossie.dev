import { flush, StoreSetter } from "solid-js";
import { convert } from "./convert";
import type { ClickEvent } from "~/lib/solidTypes";

export const initialState = {
    seconds: 1500,
    break: 300,
    breakLength: 300,
    sessionLength: 1500,
    timer: -1,
    left: () => convert(initialState.seconds),
    breakTime: () => convert(initialState.break),
}

export class PomodoroWrapper {
    constructor(
        private _state: typeof initialState,
        private setState: StoreSetter<typeof initialState>,
        private endBeep: HTMLAudioElement,
        private startBeep: HTMLAudioElement
    ) {
        this.incSess = this.incSess.bind(this)
        this.incBreak = this.incBreak.bind(this)
        this.start = this.start.bind(this)
        this.countdown = this.countdown.bind(this)
        this.breakCountdown = this.breakCountdown.bind(this)
        this.clearTimer = this.clearTimer.bind(this)
        this.reset = this.reset.bind(this)
    }
    get state() {
        return this._state
    }
    incSess(e: ClickEvent<HTMLButtonElement>) {
        if (this._state.timer === -1) {
            let s = Math.max(60, Math.min(3600, this._state.seconds + 60 * Number(e.currentTarget!.value)))
            this.setState(state => {
                state.seconds = s
                state.sessionLength = s
            })
        }
    }
    incBreak(e: ClickEvent<HTMLButtonElement>) {
        if (this._state.timer !== -1) return

        let m = Math.max(60, Math.min(3600, this._state.breakLength + 60 * Number(e.currentTarget!.value)))
        this.setState(s => {
            s.breakLength = m 
            s.break = m 
        })
    }
    start() {
        if (this._state.timer === -1) {
            this.startBeep.pause();
            this.startBeep.currentTime = 0;
            this.startBeep.play()
            window.clearInterval(this.state.timer)
            this.setState(s => {
                s.timer = window.setInterval(this.countdown, 1000)
            })
        }
        else {
            this.clearTimer();
        }
    }
    countdown() {
        if (this._state.seconds > 0) {
            let newSecs = this._state.seconds - 1;
            this.setState(s => { s.seconds = newSecs });
            return;
        }
        this.clearTimer()
        this.endBeep.play();
        this.setState(s => {
            s.timer = window.setInterval(this.breakCountdown, 1000)
        })

    }
    breakCountdown() {
        if (this._state.break > 0) {
            this.setState(s => {
                s.break = this._state.break - 1
            })
            return;
        }
        this.clearTimer()
        this.setState(s => {
            s.seconds = this._state.sessionLength;
            s.break = this._state.breakLength
        })
        flush()
        this.start()

    }
    reset() {
        this.clearTimer()
        this.endBeep.pause();
        this.endBeep.currentTime = 0;
        this.setState(s => {
            s.seconds = 1500
            s.break = 300
            s.sessionLength = 1500
            s.timer = -1
        })
    }

    clearTimer() {
        window.clearInterval(this._state.timer);
        this.setState(s => { s.timer = -1 });
    }
}