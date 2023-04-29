import { Title } from "solid-start"

type Props = {
    children: string
}

export default function MySiteTitle({children}: Props) {
    return (
        <Title> &lt; {children} /&gt; :: Cossie </Title>
    )
}