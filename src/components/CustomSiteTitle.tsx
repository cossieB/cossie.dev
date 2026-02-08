import { Title } from "@solidjs/meta";

export function CustomSiteTitle(props: {title: string}) {
    return <Title> {props.title} :: Cossie </Title>
}