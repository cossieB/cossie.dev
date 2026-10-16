import { quotes as quotesList } from "./quotelist";

export function getUniqueTags() {
    let tags: string[] = [];
    quotesList.forEach(quote => {
        tags.push(...quote.tags);
    });
    return new Set(tags);
}
export const colors = [
    '#16a085',
    '#27ae60',
    '#f39c12',
    '#e74c3c',
    '#9b59b6',
    '#FB6964',
    '#BDBB99',
    '#77B1A9',
    '#73A857',
    '#ffae11',
    '#ff5c1e',
    '#4637ed',
    '#28bb1b'
];
