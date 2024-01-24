type Props = {
    children: string
}

export default function MySiteTitle({children}: Props) {
    return (
        <title> &lt; {children} /&gt; :: Cossie </title>
    )
}