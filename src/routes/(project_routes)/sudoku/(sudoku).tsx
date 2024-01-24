import { clientOnly } from "@solidjs/start";
import Page from "~/components/shared/Page";

const Sudoku = clientOnly(() => import("~/components/Sudoku/Sudoku"))

export default function SudokuPage() {
    return (
        <Page title="Sudoku">
            <Sudoku />
        </Page>
    )
}