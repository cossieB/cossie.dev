import { APIEvent } from "@solidjs/start/server";
import { timestampResponse } from "~/utils/timestampResponse";

export function GET(event: APIEvent) {
    return timestampResponse(new Date())
}