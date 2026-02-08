import { clientOnly } from "@solidjs/start";
import { CustomSiteTitle } from "~/components/CustomSiteTitle";

const Pomodoro = clientOnly(() => import("~/features/pomodoro/components/Pomodoro"))

export default function() {
    return (
        <>
            <Pomodoro />
            <CustomSiteTitle title="Pomodoro" />            
        </>
    )
}