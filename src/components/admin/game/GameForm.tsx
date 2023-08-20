import { Form } from "solid-start/data/Form";
import { FormInput, FormTextarea, SelectInput } from "~/components/admin/forms/FormInput";
import type { Developer, Game, Publisher } from "~/drizzle/types";
import styles from "~/components/admin/forms/forms.module.scss"
import { useContext, type Setter } from "solid-js";
import { formatDateForInputElement } from "~/lib/formatDate";
import { DropZoneWithPreview, DropZone } from "../forms/DropZone";
import { AdminContext } from "~/routes/admin";


type Props = {
    data?: Game & { tags: string[] };
    game: NonNullable<Props['data']>
    setGame: Setter<Props['game']>
    developers?: Developer[]
    publishers?: Publisher[]
}

export default function GameForm(props: Props) {
    
    return (
        <Form id="gameForm" class={styles.form}>
            <FormInput
                name="title"
                value={props.game.title}
                required
            />
            <div class={styles.heroImgs}>
                <DropZoneWithPreview
                    text="Cover"
                    onAdd={() => { }}
                    img={props.game.cover}
                />
                <DropZoneWithPreview
                    text="Banner"
                    onAdd={() => { }}
                    img={props.game.banner}
                />
            </div>
            <DropZone
                onAdd={() => { }}
                text="Drop Screenshots Here"
            />
            <FormTextarea
                name="summary"
                innerHTML={props.game.summary}
                required
            />
            <FormInput
                name="releaseDate"
                value={formatDateForInputElement(new Date(props.game.releaseDate ?? ""))}
                required
                type="date"
            />
            <SelectInput
                arr={props.developers.map(dev => ({ label: dev.name, value: dev.developerId })) ?? []}
                name="developer"
                label="Developer"
                default={props.developers.find(x => x.developerId === props.game.developerId)?.developerId}
            />
            <SelectInput
                arr={props.publishers.latest?.map(pub => ({ label: pub.name, value: pub.publisherId })) ?? []}
                name="developer"
                label="Developer"
                default={props.publishers.latest?.find(x => x.publisherId === props.game.publisherId)?.publisherId}
            />
            <FormInput
                name="trailer"
                value={props.game.trailer}
                required
            />
            <div innerHTML={props.game.trailer} />
        </Form>
    )
}

