import { json } from "@solidjs/router"
import { APIEvent } from "@solidjs/start/server";
import { quotes } from "~/components/Quotes/quotelist";
import shuffleArray from "~/lib/shuffleArray";

type Q = Omit<typeof quotes[number], 'tags'> & {
    tags: Array<string>
}

export function GET(event: APIEvent) {
    const shuffledQuotes = shuffleArray(quotes)
    const url = new URL(event.request.url)
    const search = new URLSearchParams(url.search)
    const author = search.get("author");
    const limit = Number(search.get("limit")) || 1;
    const tags = search.getAll("tag");
    const filtered: Q[] = [];

    for (const quote of shuffledQuotes) {
        if (filtered.length === limit)
            break
        const isAuthor = !author || quote.author.toLowerCase() === author.toLowerCase();
        
        if (!isAuthor) continue
        let hasTag: boolean;
        if (tags.length === 0) 
            hasTag = true;
        for (const tag of tags) {
            if (!quote.tags.has(tag)) {
                hasTag = false;
                break;
            }
        }
        hasTag ??= true
        
        if (isAuthor && hasTag) 
            filtered.push({...quote, tags: Array.from(quote.tags)});
    }

    return json(filtered)
}