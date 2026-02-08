import { APIEvent } from "@solidjs/start/server"
import { json } from "@solidjs/router"
import {URL as WhatwgURL} from 'whatwg-url'
import dns from 'dns/promises';
import { getMongo } from "~/utils/getMongo";

export type IURL = {
    original: string,
    short: string
}

export async function POST(event: APIEvent) {
    let original: unknown
    const contentType = event.request.headers.get("content-type")
    if (!contentType)
        return json({ error: "Unsupported content type" }, { status: 400 })
    if (contentType.includes("application/json")) {
        original = (await event.request.json()).original
    }
    else if (contentType.includes("application/x-www-form-urlencoded")) {
        original = (await event.request.formData()).get("original")
    }
    else
        return json({ error: "Unsupported content type" }, { status: 400 })

    if (!original)
        return json({ error: "URL is required" })
    if (typeof original !== "string")
        return json({ error: "Invalid URL" }, { status: 400 })

    const {collection} = getMongo<IURL>("urls")
    const doc = await collection.findOne({ original })

    if (doc) {
        const { original, short } = doc
        return json({ original, short })
    }

    let q: WhatwgURL;
    // Check if given URL is valid. If not throw exception
    try {
        q = new WhatwgURL(original)
        await dns.lookup(q.hostname)
    }
    catch (e: any) {
        console.log(e)
        return json({ error: "Invalid URL" }, { status: 400 })
    }
    const allUrls = await collection.countDocuments();
    let short = `/api/url/${allUrls}`
    await collection.insertOne({ original, short })

    return json({ original, short }, { status: 201 })

}
