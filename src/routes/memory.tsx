import { clientOnly } from "@solidjs/start"
import { CustomSiteTitle } from "~/components/CustomSiteTitle"
const Memory = clientOnly(() => import("~/features/memory/components/MemoryMain"))

export default function () {
    return (
        <>
            <Memory />
            <CustomSiteTitle title="Memory Game" />
        </>
    )
}