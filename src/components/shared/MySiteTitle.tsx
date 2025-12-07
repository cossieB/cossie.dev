import { Title } from "@solidjs/meta"

type Props = {
    children: string
}

export default function MySiteTitle(props: Props) {
    return (
        <Title> &lt; {props.children} /&gt; :: Cossie </Title>
    )
}