import Game2048 from "~/components/2048/2048";
import Page from "~/components/shared/Page";

export default function G2048Page() {
    return (
        <Page title="2048">
            <Game2048 />
        </Page>
    )
}