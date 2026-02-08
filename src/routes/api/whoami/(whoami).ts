import {json} from "@solidjs/router"
import {APIEvent} from "@solidjs/start/server"

export function GET(event: APIEvent) {
    const ipaddress = event.request.headers.get("x-forwarded-for")
    
    return json({
        ipaddress: ipaddress ?? event.clientAddress,
        language: event.request.headers.get("accept-language"),
        software: event.request.headers.get("user-agent")
    })
}