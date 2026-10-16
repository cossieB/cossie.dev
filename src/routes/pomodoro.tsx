import { clientOnly } from "@solidjs/web";

const PomodoroMain = clientOnly(() => import("~/features/pomodoro/components/Pomodoro"));

export default PomodoroMain