import { JSXElement } from "solid-js"
import MySiteTitle from "./MySiteTitle"

type Props = {
    title: string
    children: JSXElement
}

export default function Page(props: Props) {
    return (
        <>
            <MySiteTitle>{props.title}</MySiteTitle>
            {props.children}
        </>
    )
}