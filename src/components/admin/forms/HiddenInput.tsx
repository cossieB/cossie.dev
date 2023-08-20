type Props = {
    name: string,
    value: string[] | string
}

export default function HiddenInput(props: Props) {
    return <input type="text" hidden value={props.value} name={props.name} />
}