import { createAsync, useParams } from "@solidjs/router";
import { ErrorBoundary } from "solid-js";
import GameForm from "~/components/admin/game/GameForm";
import Page from "~/components/shared/Page";
import { getGame } from "~/data/admin/game";
import NotFound from "~/routes/[...404]";

export default function AdminGameId() {
    const params = useParams()
    const data = createAsync(() => getGame(params.gameId));
    return (
        <Page title={data()?.title ?? "Game"}>
            <GameForm data={data()} />
        </Page>

    )
}
