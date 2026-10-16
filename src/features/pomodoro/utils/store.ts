import { StoreSetter } from "solid-js";
import { convert } from "./convert";
import type { ClickEvent } from "~/lib/solidTypes";

export const initialState = {
    breakMin: 5,
    sessionMin: 25,
    seconds: 1500,
    break: 300,
    sessionLength: 1500,
    timer: null as NodeJS.Timeout | null,
    left: () => convert(initialState.seconds),
    breakTime: () => convert(initialState.break),
}

export class PomodoroWrapper {
    constructor(
        private _state: typeof initialState,
        private setState: StoreSetter<typeof initialState>,
        private endBeep: HTMLAudioElement,
        private startBeep: HTMLAudioElement
    ){
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
        if (!this._state.timer) {
            let s = Math.max(60, Math.min(3600, this._state.seconds + 60 * Number(e.currentTarget!.value)))
            let m = Math.max(1, Math.min(60, this._state.sessionMin + 1 * Number(e.currentTarget!.value)))
            this.setState(state => { 
                state.sessionMin = m, 
                state.seconds = s, 
                state.sessionLength = s })
        }
    }
    incBreak(e: ClickEvent<HTMLButtonElement>) {
        if (!this._state.timer) {
            let m = Math.max(1, Math.min(60, this._state.breakMin + 1 * Number(e.currentTarget!.value)))
            this.setState(s => { 
                s.breakMin = m, 
                s.break = m * 60 
            })
        }
    }
    start() {
        if (!this._state.timer) {
            this.startBeep.pause(); 
            this.startBeep.currentTime = 0;
            this.startBeep.play()
            this.setState(s => {
                s.timer = setInterval(this.countdown, 1000)
            })
        }
        else {
            this.clearTimer();
        }
    }    
    countdown() {
        if (this._state.seconds > 0) {
            let newSecs = this._state.seconds - 1;
            this.setState(s => { s.seconds = newSecs})
        }
        else if (this._state.timer) {
            this.clearTimer()
            this.endBeep.play();
            this.setState(s => {
                s.timer = setInterval(this.breakCountdown, 1000)
            })
        }
    }
    breakCountdown() {
        if (this._state.break > 0) {
            let newSecs = this._state.break - 1;
            this.setState(s =>{ 
                s.break = newSecs
            })
        }
        else if (this._state.timer) {
            this.clearTimer()
            this.setState(s =>{
                s.seconds = this._state.sessionLength
            })
            this.start()
        }
    
    }
    reset() {
        if (this._state.timer) {
            this.clearTimer()
        }
        this.endBeep.pause(); 
        this.endBeep.currentTime = 0;
        this.setState(s => {
            s.breakMin = 5,
            s.sessionMin = 25,
            s.seconds = 1500,
            s.break = 300,
            s.sessionLength = 1500,
            s.timer = null 
        })
    }
    
    clearTimer() {
        if (!this._state.timer) return;
        clearInterval(this._state.timer);
        this.setState(s => { s.timer = null });
    }
}