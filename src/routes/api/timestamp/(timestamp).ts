import { RouteDefinition } from "@solidjs/router";
import { timestampResponse } from "./utils/timestampResponse";

export const route = {
    info: {
        number: 22
    },
    
} satisfies RouteDefinition

export function GET() {
    return timestampResponse(new Date())
}