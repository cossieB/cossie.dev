import { json } from "@solidjs/router"
import { APIEvent } from "@solidjs/start/server";
import Converter from "~/utils/converter";

export function GET(event: APIEvent) {
    const url = new URL(event.request.url)
    const search = url.searchParams
    const input = search.get("input")
    if (!input) return json("Input required", { status: 400 })
    try {
        const converter = new Converter(input)
        const { initNum, initUnit, returnUnit } = converter
        const returnNum = converter.convert()
        const string = converter.getString()

        return json({ initNum, initUnit, returnNum, returnUnit, string })
    } catch (error: any) {
        return new Response(error.message, {status: 400})
    }
}