import { Title } from "@solidjs/meta"

type Props = {
    children: string
}

export default function MySiteTitle({children}: Props) {
    return (
        <Title> &lt; {children} /&gt; :: Cossie </Title>
    )
}