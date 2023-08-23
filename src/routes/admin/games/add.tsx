import { createStore } from "solid-js/store";
import GameForm from "~/components/admin/game/GameForm";

export default function AddGamePage() {
    const [game, setGame] = createStore({
        tags: [] as string[],
        gameId: "",
        summary: "",
        title: "",
        cover: "",
        developerId: "",
        publisherId: "",
        releaseDate: "",
        images: [] as string[],
        banner: "",
        trailer: "",
    })
    return (
        <GameForm
            game={game}
            setGame={setGame}
        />
    )
}