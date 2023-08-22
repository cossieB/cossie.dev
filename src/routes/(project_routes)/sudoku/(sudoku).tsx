import { unstable_clientOnly } from "solid-start";
import Page from "~/components/shared/Page";

const Sudoku = unstable_clientOnly(() => import("~/components/Sudoku/Sudoku"))

export default function SudokuPage() {
    return (
        <Page title="Sudoku">
            <Sudoku />
        </Page>
    )
}