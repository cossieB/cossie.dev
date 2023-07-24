import { Form } from "solid-start/data/Form";
import { FormInput } from "~/components/admin/forms/FormInput";
import type { Developer, Game, Publisher } from "~/drizzle/types";
import styles from "~/components/admin/forms/forms.module.scss"
import { createStore } from "solid-js/store";
import { createSignal } from "solid-js";
import { formatDateForInputElement } from "~/lib/formatDate";

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
    const [cover, setCover] = createSignal(props.obj?.Game.cover)
    const [banner, setBanner] = createSignal(props.obj?.Game.banner)
    return (
        <Form id="gameForm" class={styles.form}>
            <FormInput
                name="title"
                value={props.obj?.Game.title}
                required
            />
            <FormInput
                name="cover"
                value={cover()}
                onchange={e => setCover(e.target.value)}
            />
            <FormInput
                name="banner"
                value={banner()}
                onchange={e => setBanner(e.target.value)}
            />
            <FormInput
                name="summary"
                value={props.obj?.Game.summary}
                required
            />
            <FormInput
                name="trailer"
                value={props.obj?.Game.trailer}
                required
            />
            <FormInput
                name="releaseDate"
                value={formatDateForInputElement(new Date(props.obj?.Game.releaseDate ?? ""))}
                required
                type="date"
            />
            <FormInput
                name="title"
                value={props.obj?.Game.title}
                required
            />
            <img src={cover()} alt={`${props.obj?.Game.title} cover`} />
            <img src={banner()} alt={`${props.obj?.Game.title} banner`} />
        </Form>
    )
}