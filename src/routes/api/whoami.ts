import { getRequestEvent } from "solid-js/web";
import {json} from "@solidjs/router"

export function GET() {
    const event = getRequestEvent();
    if (!event)
        return json
    return json({
        ipaddress: event.clientAddress,
        language: event.request.headers.get("accept-language"),
        software: event.request.headers.get("user-agent")
    })
}