import { Form } from "solid-start/data/Form";
import { FormInput } from "~/components/admin/forms/FormInput";
import type { Developer, Game, Publisher } from "~/drizzle/types";
import styles from "~/components/admin/forms/forms.module.scss"
import { createStore } from "solid-js/store";

type Obj = {
    t: {
        gameId: string;
        tags: string[];
    };
    Game: Game
    Developer: Developer
    Publisher: Publisher
}
type Props = {
    obj?: Obj
}
export default function GameForm(props: Props) {
    const [store, setStore] = createStore(props.obj)
    return (
        <Form id="gameForm" class={styles.form}>
            <FormInput
                name="title"
                value={store?.Game.title}
                required
            />
            <FormInput
                name="cover"
                value={store?.Game.cover}
            />
            <FormInput
                name="banner"
                value={store?.Game.banner}
            />
            <img src={store?.Game.cover} alt={`${store?.Game.title} cover`} />
            <img src={store?.Game.banner} alt={`${store?.Game.title} banner`} />
        </Form>
    )
}