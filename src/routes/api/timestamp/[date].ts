import { json } from "@solidjs/router"
import { APIEvent } from "@solidjs/start/server";
import { timestampResponse } from "./utils/timestampResponse";

export function GET(event: APIEvent) {
    const { date } = event.params;

    if (!date)
        return timestampResponse(new Date())

    if (Number(date))
        return timestampResponse(new Date(Number(date)))

    if (new Date(date).toString() !== "Invalid Date")
        return timestampResponse(new Date(date))

    return json({error: "Invalid Date"}, {status: 400})
}

