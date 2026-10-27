import { getRequestEvent } from "@solidjs/web";
import { GET } from "@solidjs/web/server-functions";
import { env } from "cloudflare:workers";
import { DOMParser } from "linkedom";

type PreviewData = {
    image: string;
    title: string;
    description: string;
};

export const defaults: PreviewData = {
    image: "/shrnkr.avif",
    title: "Shrnkr",
    description: "Minify your links",
};


export function validateUrl(rawUrl: string): string | null {
    try {
        const url = new URL(rawUrl);
        if (url.protocol !== "http:" && url.protocol !== "https:") {
            return null;
        }
        return url.toString();
    } catch {
        return null;
    }
}

export const fetchPreview = GET(async (rawUrl: string) => {
    'use server'
    const url = validateUrl(rawUrl);
    if (!url) return defaults;

    const cacheKey = `preview:${url}`;
    try {
        const cachedData = await env.KV.get(cacheKey, "json");
        if (cachedData) {
            return cachedData as PreviewData;
        }
    } catch (err) {
        console.error("KV read error:", err);
    }

    try {
        const response = await fetch(url, {
            headers: {
                "User-Agent": "Shrnkr-Bot/1.0",
            },
        });
        if (!response.ok) return defaults;

        const html = await response.text();
        const doc = new DOMParser().parseFromString(html, "text/html");

        const getMeta = (property: string) =>
            doc.querySelector(`meta[property="${property}"]`)?.getAttribute("content") ||
            doc.querySelector(`meta[name="${property}"]`)?.getAttribute("content");

        const title = getMeta("og:title") || doc.querySelector("title")?.textContent?.trim() || defaults.title;
        const description = getMeta("og:description") || getMeta("description") || defaults.description;
        const image = getMeta("og:image") || defaults.image;

        const result: PreviewData = { title, description, image };
        
        await env.KV.put(cacheKey, JSON.stringify(result), { expirationTtl: 86400 });
        getRequestEvent()?.response.headers.set("X-POWERED-BY", "COKE!")
        return (result);
    } 
    catch (error) {
        console.error("Failed to fetch preview data:", error);
        return defaults;
    }
})