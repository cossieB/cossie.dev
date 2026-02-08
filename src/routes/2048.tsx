import {clientOnly} from "@solidjs/start"
import { CustomSiteTitle } from "~/components/CustomSiteTitle"

const Game2048 = clientOnly(() => import("~/features/2048/components/2048"))

export default function() {
    return (
        <>
            <Game2048 />
            <CustomSiteTitle title="2048" />
        </>
    )
}