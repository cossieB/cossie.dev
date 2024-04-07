import { clientOnly } from "@solidjs/start";
import Page from "~/components/shared/Page";

const Main = clientOnly(() => import("~/components/Pomodoro/Pomodoro"))

export default function PomodoroPage() {
    return (
        <Page title="Pomodoro">
            <Main fallback={<p>Loading</p>} />
        </Page>
    )
}