import { createAsync } from "@solidjs/router";
import GameForm from "~/components/admin/game/GameForm";
import Page from "~/components/shared/Page";
import { db } from "~/db";
import { getPublishers, getDevelopers, getPlatforms } from "~/routes/admin";

export default function AddGamePage() {
    const publishers = createAsync(getPublishers)
    const developers = createAsync(getDevelopers)
    const platforms = createAsync(getPlatforms)
    return (
        <Page title="Add Game">
            <GameForm
                parentData={{
                    publishers: publishers() ?? [],
                    developers: developers() ?? [],
                    platforms: platforms() ?? [],
                }}
            />
        </Page>
    )
}