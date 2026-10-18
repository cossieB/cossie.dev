import { APIEvent } from "filesystem-routing/api";
//api/whoami.ts
export function GET(event: APIEvent) {
    return Response.json({
        ip: event.request.headers.get("CF-Connecting-IP") ?? event.request.headers.get("X-Forwarded-For")?.split(",")[0].trim(),
        city: event.request.cf?.city,
        region: event.request.cf?.region,
        continent: event.request.cf?.continent,
        software: event.request.headers.get("user-agent"),
    }, {
        headers: {
            "Cache-Control": "private, max-age=600"
        }
    })
}