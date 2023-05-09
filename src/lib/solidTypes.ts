export type ClickEvent<T extends Element = Element> = {
    currentTarget: T,
    target: Element
}