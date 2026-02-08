import { clientOnly } from "@solidjs/start";
import { CustomSiteTitle } from "~/components/CustomSiteTitle";

const Sudoku = clientOnly(() => import("~/features/sudoku/components/Sudoku"))

export default function() {
    return (
        <>
            <Sudoku />
            <CustomSiteTitle title="Sudoku" />            
        </>
    )
}