import { unstable_clientOnly } from "solid-start";
import Page from "~/components/shared/Page";

const Main = unstable_clientOnly(() => import("~/components/Pomodoro/Pomodoro"))

export default function PomodoroPage() {
    return (
        <Page title="Pomodoro">
            <Main fallback={<p>Loading</p>} />
        </Page>
    )
}